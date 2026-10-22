import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { INTERVENTIONS } from "../../data/site";
import { Reveal, Placeholder } from "./Motion";

const Row = ({ it }) => (
  <div data-testid={`intervention-${it.slug}`} className="grid grid-cols-1 items-stretch gap-8 border-t border-ink/10 py-14 md:py-20 lg:grid-cols-12 lg:gap-14">
    <Reveal className="lg:order-2 lg:col-span-6">
      <div className="relative h-full overflow-hidden rounded-[28px]">
        <Placeholder label={`${it.name} programme photo`} src={it.img} className="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[380px]" />
        <span className="absolute left-5 top-5 rounded-full bg-lime px-3.5 py-1.5 text-xs font-semibold text-ink">{it.pillar}</span>
      </div>
    </Reveal>
    <div className="flex flex-col justify-center text-left lg:order-1 lg:col-span-6">
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

export const Interventions = () => (
  <section className="relative bg-transparent py-20 text-ink md:py-28" data-testid="interventions-section">
    <div className="container-lc relative z-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center pb-14 text-center md:pb-20" data-testid="interventions-intro">
        <Reveal><p className="eyebrow mb-6 text-olive">Our Interventions</p></Reveal>
        <Reveal delay={0.06}><h2 className="font-display text-3xl tracking-tight md:text-5xl lg:text-6xl">Programmes that meet young people <em className="font-serif font-normal italic text-olive">where they are.</em></h2></Reveal>
        <motion.span aria-hidden="true" className="mt-8 block h-[3px] w-28 origin-center rounded-full bg-lime"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} />
        <Reveal delay={0.14}><p className="mt-8 max-w-xl text-base text-ink/70 md:text-lg">Four connected programmes support young people at home, in school, in their health and on the road to work.</p></Reveal>
        <Reveal delay={0.2}><Link to="/interventions" data-testid="interventions-all-link" className="link-arrow group mt-8 text-ink">View all programmes <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></Reveal>
      </div>
      {INTERVENTIONS.map((it) => <Row key={it.slug} it={it} />)}
    </div>
  </section>
);
