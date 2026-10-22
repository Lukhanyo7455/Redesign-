import { motion } from "framer-motion";
import { MaskLines, Reveal } from "./Motion";

export const PageBanner = ({ img, eyebrow, lines, text, testId, ratio = 1.5, children }) => (
  <section data-testid={testId} className="relative overflow-hidden bg-ink">
    <div className="banner-frame relative" style={{ "--r": ratio }}>
      <img src={img} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-3xl" />
      <motion.img
        src={img} alt="" className="absolute inset-0 h-full w-full object-contain"
        initial={{ scale: 1.08, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2.2, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/85 via-ink/45 to-transparent md:block" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent md:h-32 md:from-ink/60" />
    </div>
    <div className="container-lc relative pb-12 pt-2 md:absolute md:inset-0 md:flex md:items-center md:pb-0 md:pt-24">
      <div className="max-w-3xl text-white">
        <Reveal delay={2.2}><p className="eyebrow mb-5 text-lime">{eyebrow}</p></Reveal>
        <h1 className="font-display text-4xl tracking-tight md:text-6xl lg:text-[4.2rem]">
          <MaskLines delay={2.3} lines={lines} />
        </h1>
        {text && <Reveal delay={2.7}><p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">{text}</p></Reveal>}
        {children}
      </div>
    </div>
  </section>
);
