import { useMemo, useState } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Lock, ShieldCheck } from "lucide-react";
import { PageBanner } from "../components/site/PageBanner";
import { Reveal } from "../components/site/Motion";
import { CardPreview } from "../components/donate/CardPreview";

const API = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api` : null;
const AMOUNTS = [100, 250, 500, 1000, 2000];
const PROGRAMMES = ["Where needed most", "Family Affairs", "Health4Life", "Leaders’ Quest", "Life Choices Academy"];
const IMPACT = [
  [100, "could help provide learning materials for a young person."],
  [250, "could help fund a life-skills workshop session."],
  [500, "could help support a family through a parenting support circle."],
  [1000, "could help a learner through a term of leadership coaching."],
  [2000, "could help open the door to coding and digital skills training."],
];
const fmt = (n) => `R${Number(n || 0).toLocaleString("en-ZA")}`;
const impactFor = (a) => [...IMPACT].reverse().find(([v]) => a >= v)?.[1] ?? "every rand helps a young person move forward.";

const STORY = [
  ["At home", "Parents and caregivers gain tools to build safe, nurturing families."],
  ["In school", "Learners build confidence, leadership and the life skills to dream bigger."],
  ["Into work", "Young people learn coding, digital and work-readiness skills for real careers."],
];

const Story = () => (
  <div data-testid="donate-story" className="divide-y divide-ink/10 border-y border-ink/10">
    {STORY.map(([t, d], k) => (
      <Reveal key={t} delay={0.08 + k * 0.06}>
        <div className="group flex items-start gap-5 py-5">
          <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-lime transition-transform duration-500 group-hover:scale-150" />
          <div><p className="font-display text-xl">{t}</p><p className="mt-1 text-base text-ink/70">{d}</p></div>
        </div>
      </Reveal>
    ))}
  </div>
);

const Steps = ({ step }) => (
  <div className="flex items-center gap-2" data-testid="donate-steps">
    {["Amount", "Details", "Payment"].map((s, k) => (
      <div key={s} className="flex items-center gap-2">
        <span className={`flex h-8 items-center gap-2 rounded-full px-3 text-xs font-semibold transition-colors duration-500 ${k <= step ? "bg-ink text-white" : "bg-ink/5 text-ink/50"}`}>
          {k < step ? <Check className="h-3.5 w-3.5 text-lime" /> : null}{s}
        </span>
        {k < 2 && <span className={`h-px w-5 transition-colors duration-500 md:w-8 ${k < step ? "bg-ink" : "bg-ink/15"}`} />}
      </div>
    ))}
  </div>
);

const Field = ({ label, testId, ...p }) => (
  <label className="block">
    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-ink/60">{label}</span>
    <input data-testid={testId} {...p} className="lc-input" />
  </label>
);

const AmountStep = ({ f, set }) => (
  <div className="space-y-8">
    <div className="inline-flex rounded-full bg-ink/5 p-1" data-testid="frequency-toggle">
      {[["once", "One-off"], ["monthly", "Monthly"]].map(([v, l]) => (
        <button key={v} type="button" data-testid={`frequency-${v}`} onClick={() => set({ frequency: v })} className="relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
          {f.frequency === v && <motion.span layoutId="freq" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
          <span className={`relative ${f.frequency === v ? "text-white" : "text-ink/70"}`}>{l}</span>
        </button>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {AMOUNTS.map((a) => (
        <motion.button key={a} type="button" whileTap={{ scale: 0.94 }} data-testid={`amount-${a}`} onClick={() => set({ amount: a, custom: "" })}
          className={`amount-chip ${f.amount === a && !f.custom ? "is-active" : ""}`}>
          <span className="font-display text-2xl">{fmt(a)}</span>
        </motion.button>
      ))}
      <label className={`amount-chip cursor-text ${f.custom ? "is-active" : ""}`}>
        <span className="text-xs font-semibold uppercase tracking-widest opacity-70">Other</span>
        <span className="flex items-center font-display text-2xl">R<input data-testid="amount-custom" inputMode="numeric" value={f.custom} placeholder="0"
          onChange={(e) => { const v = e.target.value.replace(/\D/g, "").slice(0, 7); set({ custom: v, amount: Number(v) }); }}
          className="w-full bg-transparent outline-none placeholder:text-current placeholder:opacity-40" /></span>
      </label>
    </div>
    <AnimatePresence initial={false}>
      <motion.p key={impactFor(f.amount)} data-testid="impact-message" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
        className="rounded-2xl bg-lime/15 px-5 py-4 text-base text-ink/80">
        <strong className="text-ink">{fmt(f.amount)}{f.frequency === "monthly" ? "/month" : ""}</strong> {impactFor(f.amount)}
      </motion.p>
    </AnimatePresence>
    <div>
      <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.16em] text-ink/60">Direct my gift to</span>
      <div className="flex flex-wrap gap-2">
        {PROGRAMMES.map((p) => (
          <button key={p} type="button" data-testid={`programme-${p.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} onClick={() => set({ programme: p })}
            className={`rounded-full border px-4 py-2 text-sm transition-[background-color,color,border-color] duration-300 ${f.programme === p ? "border-ink bg-ink text-white" : "border-ink/15 text-ink/75 hover:border-ink/40"}`}>{p}</button>
        ))}
      </div>
    </div>
  </div>
);

const DetailsStep = ({ f, set }) => (
  <div className="grid gap-5">
    <Field label="Full name" testId="donor-name" value={f.name} onChange={(e) => set({ name: e.target.value })} placeholder="Your name" />
    <Field label="Email" testId="donor-email" type="email" value={f.email} onChange={(e) => set({ email: e.target.value })} placeholder="you@example.com" />
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-ink/60">Message (optional)</span>
      <textarea data-testid="donor-message" rows={3} maxLength={300} value={f.message} onChange={(e) => set({ message: e.target.value })} placeholder="Leave a note for the Life Choices team" className="lc-input resize-none" />
    </label>
  </div>
);

const PaymentStep = ({ f, set, onFocusCvc }) => (
  <div className="grid gap-5">
    <Field label="Card number" testId="card-number" inputMode="numeric" value={f.card} placeholder="4242 4242 4242 4242"
      onChange={(e) => set({ card: e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim() })} />
    <Field label="Name on card" testId="card-name" value={f.cardName} onChange={(e) => set({ cardName: e.target.value })} placeholder="As shown on card" />
    <div className="grid grid-cols-2 gap-4">
      <Field label="Expiry" testId="card-expiry" inputMode="numeric" value={f.exp} placeholder="MM/YY"
        onChange={(e) => { const d = e.target.value.replace(/\D/g, "").slice(0, 4); set({ exp: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d }); }} />
      <Field label="CVC" testId="card-cvc" inputMode="numeric" value={f.cvc} placeholder="123"
        onFocus={() => onFocusCvc(true)} onBlur={() => onFocusCvc(false)} onChange={(e) => set({ cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })} />
    </div>
    <p className="flex items-start gap-2 rounded-2xl border border-dashed border-olive/40 bg-lime/10 px-4 py-3 text-sm text-ink/75" data-testid="checkout-notice">
      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
      This is a prototype checkout, so no real money is charged. Use any card number; one ending in 0002 shows a declined payment.
    </p>
  </div>
);

const Success = ({ res, onReset }) => (
  <motion.div data-testid="donation-success" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="py-6 text-center">
    <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.15, type: "spring" }} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lime">
      <Check className="h-10 w-10 text-ink" strokeWidth={3} />
    </motion.div>
    <h3 className="font-display mt-6 text-3xl md:text-4xl">Thank you, {res.name.split(" ")[0]}!</h3>
    <p className="mx-auto mt-3 max-w-md text-ink/70">Your {res.frequency === "monthly" ? "monthly " : ""}gift of <strong className="text-ink">{fmt(res.amount)}</strong> to {res.programme} helps young people shape a future full of possibility.</p>
    <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-ink/10 bg-white p-5 text-left text-sm">
      <div className="flex justify-between py-1.5"><span className="text-ink/60">Reference</span><span data-testid="donation-reference" className="font-semibold">{res.reference}</span></div>
      <div className="flex justify-between py-1.5"><span className="text-ink/60">Card</span><span>•••• {res.card_last4}</span></div>
      <div className="flex justify-between py-1.5"><span className="text-ink/60">Status</span><span className="font-semibold text-olive">Paid</span></div>
    </div>
    <button data-testid="donate-again-btn" onClick={onReset} className="btn-ghost btn-ghost-dark mt-8">Make another gift</button>
  </motion.div>
);

const INIT = { amount: 250, custom: "", frequency: "once", programme: PROGRAMMES[0], name: "", email: "", message: "", card: "", cardName: "", exp: "", cvc: "" };

export default function DonatePage() {
  const [f, setF] = useState(INIT);
  const [step, setStep] = useState(0);
  const [flip, setFlip] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [res, setRes] = useState(null);
  const set = (p) => { setErr(""); setF((s) => ({ ...s, ...p })); };

  const valid = useMemo(() => [
    f.amount >= 10,
    f.name.trim().length > 1 && /\S+@\S+\.\S+/.test(f.email),
    f.card.replace(/\s/g, "").length >= 12 && f.cardName.trim() && /^\d{2}\/\d{2}$/.test(f.exp) && f.cvc.length >= 3,
  ], [f]);

  const pay = async () => {
    if (!API) { setErr("Payments are unavailable right now."); return; }
    setBusy(true);
    try {
      const { data } = await axios.post(`${API}/donations`, {
        amount: f.amount, frequency: f.frequency, programme: f.programme, name: f.name.trim(), email: f.email.trim(),
        card_last4: f.card.replace(/\s/g, "").slice(-4), message: f.message || null,
      });
      await new Promise((r) => setTimeout(r, 900));
      setRes(data);
      confetti({ particleCount: 160, spread: 110, origin: { y: 0.6 }, colors: ["#ABCC37", "#4A6130", "#F5C542", "#FFFFFF"], zIndex: 120 });
    } catch (e) {
      setErr(e?.response?.data?.detail?.toString?.() || "Payment failed. Please try again.");
    } finally { setBusy(false); }
  };

  const next = () => (step < 2 ? setStep(step + 1) : pay());
  const reset = () => { setF(INIT); setStep(0); setRes(null); };

  return (
    <main data-testid="donate-page">
      <PageBanner testId="donate-banner" img="/hero/donate-banner.webp" pos="center 30%" eyebrow="Donate"
        lines={["Give a young person", "a reason to smile."]}
        text="Your gift creates pathways for young people to discover their potential, develop practical skills and shape a future full of possibility." />

      <section className="py-14 md:py-20">
        <div className="container-lc grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="space-y-8 lg:sticky lg:top-28">
              <Reveal><h2 className="font-display text-3xl tracking-tight md:text-5xl">Every gift <em className="italic text-olive">changes a story.</em></h2></Reveal>
              <Reveal delay={0.04}><p className="text-base text-ink/70 md:text-lg">Your gift reaches young people where they are, helping them heal, grow and move confidently towards the future they choose.</p></Reveal>
              <Story />
              <Reveal delay={0.12}><CardPreview f={f} flip={flip} /></Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[32px] border border-ink/10 bg-white/80 p-6 shadow-[0_30px_80px_-40px_rgba(18,22,15,0.35)] backdrop-blur md:p-10">
              {res ? <Success res={res} onReset={reset} /> : (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <Steps step={step} />
                    <span className="flex items-center gap-1.5 text-xs text-ink/60"><Lock className="h-3.5 w-3.5" /> Secure checkout</span>
                  </div>
                  <div className="relative mt-8 min-h-[380px]">
                    <AnimatePresence initial={false}>
                      <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40, position: "absolute", inset: 0, pointerEvents: "none" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                        {step === 0 && <AmountStep f={f} set={set} />}
                        {step === 1 && <DetailsStep f={f} set={set} />}
                        {step === 2 && <PaymentStep f={f} set={set} onFocusCvc={setFlip} />}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  {err && <p data-testid="donate-error" className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{err}</p>}
                  <div className="mt-8 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
                    <button type="button" data-testid="donate-back-btn" onClick={() => setStep(step - 1)} className={`flex items-center gap-2 text-sm font-semibold text-ink/70 hover:text-ink ${step === 0 ? "invisible" : ""}`}>
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                    <button type="button" data-testid="donate-next-btn" disabled={!valid[step] || busy} onClick={next} className="btn-lime group disabled:cursor-not-allowed disabled:opacity-40">
                      {busy ? <><span className="spinner" /> Processing…</> : step < 2 ? <>Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></> : <>Donate {fmt(f.amount)}{f.frequency === "monthly" ? "/mo" : ""}</>}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
