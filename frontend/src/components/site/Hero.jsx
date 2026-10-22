import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MaskLines } from "./Motion";

const D = 0.2;
const IMG = "/hero/hero1.webp";

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rot = useTransform(scrollYProgress, [0, 1], [0, -6]);

  return (
    <section ref={ref} data-testid="hero-section" className="relative bg-transparent pt-20 text-ink md:pt-28">
      <div className="container-lc grid grid-cols-1 items-stretch gap-10 pb-20 lg:grid-cols-12 lg:gap-12 lg:pb-28">
        <div className="relative z-10 flex flex-col justify-center lg:col-span-5">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: D }} className="eyebrow text-olive">
            Youth development · Cape Town · Since 2005
          </motion.p>
          <h1 data-testid="hero-heading" className="font-display mt-6 text-[2.4rem] tracking-[-0.03em] sm:text-5xl lg:text-[3.7rem]">
            <MaskLines delay={D + 0.1} lines={[
              <>The future starts</>,
              <>with what young</>,
              <>people can <em className="font-serif italic text-olive">become.</em></>,
            ]} />
          </h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 0.7, duration: 0.9 }}>
            <p data-testid="hero-description" className="mt-8 max-w-xl text-base text-ink/70 md:text-lg">
              We create pathways for young people to discover their potential, develop practical skills and shape a future full of possibility.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/get-involved" data-testid="hero-support-btn" className="btn-lime group justify-center">Support our work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
              <Link to="/interventions" data-testid="hero-programmes-btn" className="btn-ghost btn-ghost-dark justify-center">Explore our programmes</Link>
            </div>
          </motion.div>
        </div>

        <div className="relative lg:col-span-7" style={{ perspective: 1200 }}>
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0 round 28px)" }}
            animate={{ clipPath: "inset(0% 0 0 0 round 28px)" }}
            transition={{ duration: 1.4, delay: D - 0.2, ease: [0.76, 0, 0.24, 1] }}
            style={{ rotateY: rot }}
            className="relative aspect-[3/2] w-full overflow-hidden rounded-[28px] bg-lime/10 lg:aspect-auto lg:h-full lg:min-h-[460px]"
          >
            <img src={IMG} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-70 blur-2xl" />
            <img src={IMG} alt="Young people at Life Choices" data-testid="hero-image" className="absolute inset-0 h-full w-full object-contain" />
            <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5">
              <span className="whitespace-nowrap rounded-full bg-white/90 px-3 py-1.5 font-serif text-sm italic text-ink md:px-4 md:py-2 md:text-lg">Healing, uplifting &amp; empowering.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
