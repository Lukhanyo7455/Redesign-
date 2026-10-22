from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import random
import string
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import Literal, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

client = AsyncIOMotorClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

DEMO_GOAL = 210000


class DonationIn(BaseModel):
    amount: int = Field(ge=10, le=1000000)
    frequency: Literal["once", "monthly"]
    programme: str = Field(min_length=1, max_length=60)
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    card_last4: str = Field(pattern=r"^\d{4}$")
    message: Optional[str] = Field(default=None, max_length=300)


class Donation(DonationIn):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    reference: str
    status: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ContactIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=30)
    subject: str = Field(min_length=1, max_length=120)
    message: str = Field(min_length=1, max_length=3000)


class ContactMessage(ContactIn):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


@api_router.get("/")
async def root():
    return {"message": "Life Choices API"}


@api_router.post("/donations", response_model=Donation)
async def create_donation(body: DonationIn):
    # Demo gateway: card ending 0002 simulates a decline
    if body.card_last4 == "0002":
        raise HTTPException(status_code=402, detail="Card declined (demo). Try another card number.")
    ref = "LC21-" + "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
    donation = Donation(**body.model_dump(), reference=ref, status="succeeded")
    await db.donations.insert_one(donation.model_dump())
    return donation


@api_router.get("/donations/stats")
async def donation_stats():
    rows = await db.donations.aggregate([
        {"$match": {"status": "succeeded"}},
        {"$group": {"_id": None, "total": {"$sum": "$amount"}, "count": {"$sum": 1}}},
    ]).to_list(1)
    total = rows[0]["total"] if rows else 0
    count = rows[0]["count"] if rows else 0
    return {"total": total, "count": count, "goal": DEMO_GOAL}


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(body: ContactIn):
    msg = ContactMessage(**body.model_dump())
    await db.contact_messages.insert_one(msg.model_dump())
    return msg


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
