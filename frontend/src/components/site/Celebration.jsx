import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X, PartyPopper } from "lucide-react";
import { INTRO_S } from "./Intro";

const COLORS = ["#ABCC37", "#4A6130", "#F5C542", "#FFFFFF", "#2B3A1E"];

const burst = () => {
  const end = Date.now() + 1800;
  const frame = () => {
    confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors: COLORS, zIndex: 120 });
    confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors: COLORS, zIndex: 120 });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  confetti({ particleCount: 140, spread: 100, startVelocity: 45, origin: { y: 0.45 }, colors: COLORS, zIndex: 120 });
  frame();
};

export const Celebration = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const openIt = () => { setOpen(true); burst(); };
    window.addEventListener("lc21-open", openIt);
    return () => window.removeEventListener("lc21-open", openIt);
  }, []);
  useEffect(() => {
    const t = setTimeout(() => { setOpen(true); burst(); }, (INTRO_S + 2) * 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div data-testid="birthday-popup" className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.div onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.6, y: 60, rotate: -4, opacity: 0 }} animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }} exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-gradient-to-br from-moss via-ink to-ink p-8 text-center text-white shadow-2xl md:p-12">
            <div className="birthday-glow pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-lime/40 blur-3xl" />
            <button data-testid="birthday-close-btn" aria-label="Close" onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-[background-color,transform] duration-300 hover:rotate-90 hover:bg-white/10">
              <X className="h-4 w-4" />
            </button>
            <motion.div initial={{ rotate: -20, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ delay: 0.25, type: "spring" }}
              className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime text-ink">
              <PartyPopper className="h-6 w-6" />
            </motion.div>
            <p className="eyebrow relative mt-6 text-lime">2005 — 2026</p>
            <motion.div className="birthday-number relative mt-2 font-display text-[7.5rem] leading-none tracking-[-0.06em] md:text-[10rem]"
              initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.35, type: "spring", stiffness: 160, damping: 12 }}>
              21
            </motion.div>
            <h2 className="relative font-display text-2xl md:text-3xl">Life Choices turns 21!</h2>
            <p className="relative mx-auto mt-4 max-w-sm text-base text-white/80">Celebrating 21 years of healing, uplifting and empowering young people across Cape Town. Thank you for being part of the story.</p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/get-involved" onClick={() => setOpen(false)} data-testid="birthday-celebrate-btn" className="btn-lime">Celebrate with us</Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
