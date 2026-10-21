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
  return (
    <div ref={ref} data-testid={`intervention-${it.slug}`} className="grid grid-cols-1 items-center gap-8 border-t border-ink/10 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
      <Reveal className="lg:order-2 lg:col-span-6">
        <div className="relative h-[300px] overflow-hidden rounded-[28px] md:h-[440px]">
          <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
            <Placeholder label={`${it.name} programme photo`} src={it.img} pos={it.slug === "leaders-quest" ? "center top" : "center"} className="h-full" />
          </motion.div>
          <span className="absolute left-5 top-5 rounded-full bg-lime px-3.5 py-1.5 text-xs font-semibold text-ink">{it.pillar}</span>
        </div>
      </Reveal>
      <div className="text-left lg:order-1 lg:col-span-6">
        <Reveal delay={0.06}>
          <Link to={`/interventions/${it.slug}`} className="group block" data-testid={`intervention-link-${it.slug}`}>
            <h3 className="programme-name text-[2.6rem] sm:text-6xl lg:text-7xl">
              {it.name}
              <ArrowUpRight className="ml-3 inline h-9 w-9 align-top text-olive transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:h-12 md:w-12" />
            </h3>
          </Link>
        </Reveal>
        <Reveal delay={0.12}><p className="mt-7 max-w-md text-base text-ink/70 md:text-lg">{it.text}</p></Reveal>
        <Reveal delay={0.18}>
          <ul className="mt-7 flex flex-wrap gap-2">
            {it.tags.map((t) => <li key={t} className="rounded-full border border-ink/15 px-3.5 py-1.5 text-xs text-ink/75">{t}</li>)}
          </ul>
        </Reveal>
      </div>
    </div>
  );
};

export const Interventions = () => (
  <section className="relative bg-transparent py-24 text-ink md:py-36" data-testid="interventions-section">
    <div className="container-lc relative z-10">
      <div className="flex flex-col gap-6 pb-10 md:flex-row md:items-end md:justify-between md:pb-14">
        <div className="max-w-2xl">
          <Reveal><Eyebrow>Our Interventions</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 className="font-display text-3xl leading-[1.05] tracking-tight md:text-5xl">Programmes that meet young people <em className="font-serif font-normal italic text-olive">where they are.</em></h2></Reveal>
        </div>
        <Reveal delay={0.1}><Link to="/interventions" data-testid="interventions-all-link" className="link-arrow group text-ink">View all programmes <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></Reveal>
      </div>
      {INTERVENTIONS.map((it, k) => <Row key={it.slug} it={it} k={k} />)}
    </div>
  </section>
);
