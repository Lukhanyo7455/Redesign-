import { motion } from "framer-motion";
import { MaskLines, Reveal } from "./Motion";

const SplitBanner = ({ img, eyebrow, lines, text, testId, ratio, children }) => (
  <section data-testid={testId} className="relative overflow-hidden bg-ink pt-24 md:pt-28">
    <div className="container-lc grid grid-cols-1 items-center gap-10 pb-12 lg:grid-cols-12 lg:gap-14 lg:pb-16">
      <div className="order-2 text-white lg:order-1 lg:col-span-5">
        <Reveal delay={1.3}><p className="eyebrow mb-5 text-lime">{eyebrow}</p></Reveal>
        <h1 className="font-display text-4xl tracking-tight md:text-5xl lg:text-[3.4rem]">
          <MaskLines delay={1.4} lines={lines} />
        </h1>
        {text && <Reveal delay={1.7}><p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">{text}</p></Reveal>}
        {children}
      </div>
      <motion.div className="order-1 overflow-hidden rounded-[28px] lg:order-2 lg:col-span-7" style={{ aspectRatio: ratio }}
        initial={{ clipPath: "inset(100% 0 0 0 round 28px)" }} animate={{ clipPath: "inset(0% 0 0 0 round 28px)" }} transition={{ duration: 1.3, delay: 1.0, ease: [0.76, 0, 0.24, 1] }}>
        <img src={img} alt="" data-testid={`${testId}-image`} className="h-full w-full object-cover" />
      </motion.div>
    </div>
  </section>
);

export const PageBanner = ({ split, ...p }) => (split ? <SplitBanner {...p} /> : <FullBanner {...p} />);

const FullBanner = ({ img, eyebrow, lines, text, testId, ratio = 1.5, short, pos = "center 30%", children }) => (
  <section data-testid={testId} className="relative overflow-hidden bg-ink">
    <div className={`${short ? "banner-frame-short" : "banner-frame"} relative`} style={{ "--r": ratio }}>
      <motion.img
        src={img} alt="" data-testid={`${testId}-image`} className="absolute inset-0 h-full w-full object-cover"
        style={short ? { objectPosition: pos } : undefined}
        initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 1.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/85 via-ink/45 to-transparent md:block" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent md:h-32 md:from-ink/60" />
    </div>
    <div className="container-lc relative pb-12 pt-2 md:absolute md:inset-0 md:flex md:items-center md:pb-0 md:pt-24">
      <div className="max-w-3xl text-white">
        <Reveal delay={0.9}><p className="eyebrow mb-5 text-lime">{eyebrow}</p></Reveal>
        <h1 className="font-display text-4xl tracking-tight md:text-6xl lg:text-[4.2rem]">
          <MaskLines delay={0.95} lines={lines} />
        </h1>
        {text && <Reveal delay={1.15}><p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">{text}</p></Reveal>}
        {children}
      </div>
    </div>
  </section>
);
