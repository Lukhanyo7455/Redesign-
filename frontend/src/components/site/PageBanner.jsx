import { motion } from "framer-motion";
import { MaskLines, Reveal } from "./Motion";

export const PageBanner = ({ img, eyebrow, lines, text, testId, pos = "center 35%" }) => (
  <section data-testid={testId} className="relative overflow-hidden">
    <div className="relative h-[78svh] min-h-[540px] max-h-[820px]">
      <motion.img
        src={img} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: pos }}
        initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.4, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/60 to-transparent" />
      <div className="container-lc relative flex h-full items-end pb-16 pt-28 md:items-center md:pb-0">
        <div className="max-w-3xl text-white">
          <Reveal delay={2.2}><p className="eyebrow mb-6 text-lime">{eyebrow}</p></Reveal>
          <h1 className="font-display text-4xl tracking-tight md:text-6xl lg:text-[4.2rem]">
            <MaskLines delay={2.3} lines={lines} />
          </h1>
          <Reveal delay={2.7}><p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">{text}</p></Reveal>
        </div>
      </div>
    </div>
  </section>
);
