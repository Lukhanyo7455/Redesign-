import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { INTERVENTIONS } from "../../data/site";
import { Reveal, Placeholder } from "./Motion";
import { Eyebrow } from "./Sections";

const Row = ({ it, k }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const flip = k % 2 === 1;
  return (
    <div ref={ref} data-testid={`intervention-${it.slug}`} className="grid grid-cols-1 items-center gap-8 border-t border-bone/15 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
      <Reveal className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
        <div className="relative h-[300px] overflow-hidden rounded-[28px] md:h-[440px]">
          <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
            <Placeholder label={`${it.pillar} imagery`} className="ph-dark h-full" />
          </motion.div>
          <span className="absolute left-5 top-5 rounded-full bg-lime px-3.5 py-1.5 text-xs font-semibold text-ink">{it.pillar}</span>
        </div>
      </Reveal>
      <div className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`}>
        <Reveal><span className="font-mono text-xs tracking-[0.3em] text-lime">PROGRAMME — 0{k + 1} / 04</span></Reveal>
        <Reveal delay={0.06}>
          <Link to={`/interventions/${it.slug}`} className="group mt-5 block" data-testid={`intervention-link-${it.slug}`}>
            <h3 className="programme-name text-[3.25rem] leading-[0.92] sm:text-7xl lg:text-[6.2rem]">
              {it.name}
              <ArrowUpRight className="ml-3 inline h-9 w-9 align-top text-lime transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:h-12 md:w-12" />
            </h3>
          </Link>
        </Reveal>
        <Reveal delay={0.12}><p className="mt-7 max-w-md text-base text-bone/75 md:text-lg">{it.text}</p></Reveal>
        <Reveal delay={0.18}>
          <ul className="mt-7 flex flex-wrap gap-2">
            {it.tags.map((t) => <li key={t} className="rounded-full border border-bone/25 px-3.5 py-1.5 text-xs text-bone/80">{t}</li>)}
          </ul>
        </Reveal>
      </div>
    </div>
  );
};

export const Interventions = () => (
  <section className="grain relative bg-ink py-24 text-bone md:py-36" data-testid="interventions-section">
    <div className="container-lc relative z-10">
      <div className="flex flex-col gap-6 pb-10 md:flex-row md:items-end md:justify-between md:pb-14">
        <div className="max-w-2xl">
          <Reveal><Eyebrow light>Our Interventions</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 className="font-display text-3xl leading-[1.05] tracking-tight md:text-5xl">Programmes that meet young people <em className="font-serif font-normal italic text-lime">where they are.</em></h2></Reveal>
        </div>
        <Reveal delay={0.1}><Link to="/interventions" data-testid="interventions-all-link" className="link-arrow group text-bone">View all programmes <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></Reveal>
      </div>
      {INTERVENTIONS.map((it, k) => <Row key={it.slug} it={it} k={k} />)}
    </div>
  </section>
);
