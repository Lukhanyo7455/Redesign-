import { motion } from "framer-motion";

const brand = (n) => (n.startsWith("4") ? "VISA" : /^5[1-5]/.test(n) ? "MASTERCARD" : n.startsWith("3") ? "AMEX" : "CARD");

export const CardPreview = ({ f, flip }) => {
  const n = f.card.replace(/\s/g, "");
  const shown = (n + "•".repeat(16 - n.length)).replace(/(.{4})/g, "$1 ").trim();
  return (
    <div className="card-scene mx-auto w-full max-w-[420px]" data-testid="card-preview">
      <motion.div className="card-3d relative aspect-[1.586] w-full" animate={{ rotateY: flip ? 180 : 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
        <div className="card-face grain absolute inset-0 overflow-hidden rounded-[24px] bg-gradient-to-br from-moss via-ink to-ink p-6 text-white">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-lime/30 blur-3xl" />
          <div className="relative flex items-start justify-between">
            <img src="/brand/logo.png" alt="" className="h-7" />
            <span className="text-xs font-bold tracking-[0.2em] text-lime">{brand(n)}</span>
          </div>
          <div className="card-chip relative mt-6 h-9 w-12 rounded-md" />
          <p className="relative mt-5 font-display text-lg tracking-[0.12em] md:text-xl" data-testid="card-preview-number">{shown}</p>
          <div className="relative mt-4 flex justify-between text-xs uppercase tracking-widest text-white/70">
            <span className="truncate pr-4">{f.cardName || "Your name"}</span>
            <span>{f.exp || "MM/YY"}</span>
          </div>
        </div>
        <div className="card-face card-back absolute inset-0 overflow-hidden rounded-[24px] bg-gradient-to-br from-ink to-moss text-white">
          <div className="mt-8 h-11 w-full bg-black/70" />
          <div className="mx-6 mt-6 flex items-center justify-end rounded-md bg-white/90 px-4 py-2 font-display text-ink">{f.cvc || "•••"}</div>
          <p className="mx-6 mt-6 text-xs text-white/60">Life Choices supporter card.</p>
        </div>
      </motion.div>
    </div>
  );
};
