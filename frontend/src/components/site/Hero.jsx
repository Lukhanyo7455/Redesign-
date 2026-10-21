import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import { HERO_IMAGES } from "../../data/site";
import { MaskLines } from "./Motion";

const D = 0.2;

export const Hero = () => {
  const [i, setI] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, -6]);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} data-testid="hero-section" className="relative bg-transparent pt-20 text-ink md:pt-28">
      <div className="container-lc grid grid-cols-1 gap-10 pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <div className="relative z-10 lg:col-span-7 lg:pt-12">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: D }} className="eyebrow text-olive">
            Youth development · Cape Town · Since 2005
          </motion.p>
          <h1 data-testid="hero-heading" className="font-display mt-6 text-[2.5rem] tracking-[-0.03em] sm:text-6xl lg:text-[4.6rem]">
            <MaskLines delay={D + 0.1} lines={[
              <>Youth is <span className="text-olive">37%</span></>,
              <>of South Africa,</>,
              <>yet <em className="font-serif font-normal italic">100%</em> of</>,
              <>its future.</>,
            ]} />
          </h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 0.7, duration: 0.9 }}>
            <p className="mt-8 max-w-xl text-base text-ink/70 md:text-lg">
              Life Choices is an innovative and impactful youth development organisation based in Cape Town. We work in schools, communities and from our Campus in Lansdowne, investing in young people so they can reach their potential.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/get-involved" data-testid="hero-support-btn" className="btn-lime group">Support our work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
              <Link to="/interventions" data-testid="hero-programmes-btn" className="btn-ghost btn-ghost-dark">Explore our programmes</Link>
            </div>
          </motion.div>
        </div>

        <div className="relative lg:col-span-5" style={{ perspective: 1200 }}>
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0 round 28px)" }}
            animate={{ clipPath: "inset(0% 0 0 0 round 28px)" }}
            transition={{ duration: 1.4, delay: D - 0.2, ease: [0.76, 0, 0.24, 1] }}
            style={{ rotateY: rot }}
            className="relative h-[440px] overflow-hidden rounded-[28px] sm:h-[540px] lg:h-[640px]"
          >
            <motion.div style={{ scale, y }} className="absolute inset-0">
              {HERO_IMAGES.map((src, k) => (
                <img key={src} src={src} alt="Young people at Life Choices" data-testid={`hero-slide-${k}`}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms]"
                  style={{ opacity: i === k ? 1 : 0 }} />
              ))}
            </motion.div>
            <div className="spotlight absolute inset-0" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <span className="rounded-full bg-bone/90 px-4 py-2 font-serif text-lg italic text-ink">Healing, uplifting &amp; empowering.</span>
              <div className="flex gap-1.5">
                {HERO_IMAGES.map((_, k) => (
                  <button key={k} aria-label={`Go to slide ${k + 1}`} data-testid={`hero-dot-${k}`} onClick={() => setI(k)}
                    className={`h-2 rounded-full transition-[width,background-color] duration-500 ${i === k ? "w-8 bg-lime" : "w-2 bg-bone/60"}`} />
                ))}
              </div>
            </div>
          </motion.div>
          <div className="spin-badge absolute -left-6 -top-6 hidden h-28 w-28 md:block" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <defs><path id="c" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
              <circle cx="50" cy="50" r="50" fill="#ABCC37" />
              <text fontSize="10.5" letterSpacing="2.6" fill="#12160F" fontWeight="700"><textPath href="#c">INVEST · IN · YOUNG · PEOPLE · </textPath></text>
            </svg>
            <ArrowDownRight className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-ink" />
          </div>
        </div>
      </div>
    </section>
  );
};
