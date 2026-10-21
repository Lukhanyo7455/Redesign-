import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { STATS, APPROACH, IMPACT, STORIES, PARTNERS, INVOLVED } from "../../data/site";
import { Reveal, CountUp, Placeholder, MaskLines } from "./Motion";

export const Eyebrow = ({ children, light }) => (
  <p className={`eyebrow mb-6 ${light ? "text-lime" : "text-olive"}`}>{children}</p>
);

export const Stats = () => (
  <section className="bg-transparent text-ink" data-testid="stats-strip">
    <div className="container-lc grid grid-cols-2 border-y border-ink/10 md:grid-cols-4">
      {STATS.map((s, k) => (
        <Reveal key={s.label} delay={k * 0.07} className={`py-8 md:py-10 ${k % 2 ? "pl-6" : ""} ${k > 0 ? "md:border-l md:border-ink/10 md:pl-8" : ""}`}>
          <CountUp value={s.value} suffix={s.suffix} className="font-display text-3xl md:text-5xl" />
          <p className="mt-2 text-sm text-ink/60">{s.label}</p>
        </Reveal>
      ))}
    </div>
  </section>
);

export const Vision = () => (
  <section className="relative bg-transparent py-24 md:py-36" data-testid="vision-section">
    <div className="container-lc grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
      <Reveal className="lg:col-span-5"><Placeholder label="Young people at Life Choices" src="/hero/hero1.webp" className="h-[360px] rounded-[28px] md:h-[520px]" /></Reveal>
      <div className="lg:col-span-7">
        <Reveal><Eyebrow>Our Vision</Eyebrow></Reveal>
        <Reveal delay={0.06}><p className="text-lg text-ink/60">Life Choices is working towards a world where…</p></Reveal>
        <Reveal delay={0.12}>
          <h2 className="font-display mt-4 text-3xl leading-[1.05] tracking-tight md:text-[3.4rem]">
            Every young person feels <em className="font-serif font-normal italic text-olive">safe and valued.</em> Every young person is free to thrive.
          </h2>
        </Reveal>
        <Reveal delay={0.18}><p className="mt-8 max-w-2xl text-base text-ink/70 md:text-lg">We’re doing this through programmes that ignite the potential of young people by healing, uplifting and empowering lives.</p></Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-8 border-t border-ink/10 pt-8">
            <div><div className="font-display text-3xl">Lansdowne</div><div className="text-sm text-ink/60">Our Cape Town campus</div></div>
            <div className="h-10 w-px bg-ink/15" />
            <div><div className="font-display text-3xl">Cape Flats</div><div className="text-sm text-ink/60">The communities we serve</div></div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export const Approach = () => (
  <section className="relative bg-lime/10 py-24 md:py-36" data-testid="approach-section">
    <div className="container-lc grid grid-cols-1 gap-14 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <Reveal><Eyebrow>Our Approach</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 className="font-display text-3xl leading-[1.05] tracking-tight md:text-5xl">Five building blocks that help young people <em className="font-serif font-normal italic">thrive.</em></h2></Reveal>
          <Reveal delay={0.12}><p className="mt-6 max-w-md text-base text-ink/70 md:text-lg">Our programmes operate across all these blocks so that young people can know themselves, access caring youth-friendly support, gain vital life skills, and get ready for their future.</p></Reveal>
          <Reveal delay={0.18}><Placeholder label="Learners in a wellness session" src="/photos/wellness-spes-bona.webp" className="mt-10 h-[240px] rounded-[24px] md:h-[300px]" /></Reveal>
        </div>
      </div>
      <ol className="lg:col-span-7">
        {APPROACH.map((a, k) => (
          <Reveal key={a.title} delay={k * 0.05}>
            <li data-testid={`approach-item-${k}`} className="group border-t border-ink/10 py-8 md:py-10">
              <div>
                <h3 className="font-display text-2xl tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">{a.title}</h3>
                <p className="mt-3 max-w-lg text-base text-ink/65">{a.text}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

export const Impact = () => (
  <section className="relative overflow-hidden border-t border-ink/10 bg-transparent py-24 text-ink md:py-36" data-testid="impact-section">
    <div className="container-lc relative z-10 grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Reveal><Eyebrow>Measured Impact</Eyebrow></Reveal>
        <Reveal delay={0.06}><h2 className="font-display text-3xl leading-[1.05] tracking-tight md:text-5xl">Two decades of change on the <em className="font-serif font-normal italic text-olive">Cape Flats.</em></h2></Reveal>
        <Reveal delay={0.12}><p className="mt-6 max-w-lg text-base text-ink/70 md:text-lg">Since 2005 we have worked in schools, homes and communities to invest in young people, tracking our outcomes openly through annual programme reports.</p></Reveal>
        <Reveal delay={0.18}><Link to="/impact" data-testid="impact-reports-btn" className="btn-lime group mt-9">See our impact &amp; reports <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></Reveal>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:col-span-7 lg:border-l lg:border-ink/10 lg:pl-12">
        {IMPACT.map((s, k) => (
          <Reveal key={s.label} delay={k * 0.08}>
            <CountUp value={s.value} suffix={s.suffix} className="font-display text-4xl md:text-6xl" />
            <p className="mt-2 text-sm text-ink/60">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const Stories = () => (
  <section className="bg-transparent py-24 md:py-36" data-testid="stories-section">
    <div className="container-lc">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Reveal><Eyebrow>Stories from the Field</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 className="font-display text-3xl leading-[1.05] tracking-tight md:text-5xl">Every person we meet has a story <em className="font-serif font-normal italic">worth sharing.</em></h2></Reveal>
        </div>
        <Reveal delay={0.1}><Link to="/stories" data-testid="stories-more-link" className="link-arrow group">Read more stories <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></Reveal>
      </div>
      <div className="mt-14">
        {STORIES.map((s, k) => (
          <Reveal key={s.slug} delay={k * 0.06}>
            <Link to={`/stories/${s.slug}`} data-testid={`story-row-${k}`} className="group grid grid-cols-1 items-center gap-6 border-t border-ink/10 py-8 md:grid-cols-12 md:gap-10">
              <div className="overflow-hidden rounded-[20px] md:col-span-4">
                <Placeholder label={s.title} src={s.img} className="h-56 transition-transform duration-700 group-hover:scale-105 md:h-52" />
              </div>
              <div className="md:col-span-7">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink/60"><span className="font-semibold text-olive">{s.tag}</span><span className="h-1 w-1 rounded-full bg-ink/40" />{s.date}</div>
                <h3 className="font-display mt-3 text-2xl tracking-tight md:text-4xl">{s.title}</h3>
                <p className="mt-3 max-w-xl text-base text-ink/65">{s.text}</p>
              </div>
              <ArrowUpRight className="hidden h-8 w-8 text-ink/40 transition-[transform,color] duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink md:col-span-1 md:block" />
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const Partners = () => {
  const row = [...PARTNERS, ...PARTNERS];
  return (
    <section className="border-y border-ink/10 bg-lime/10 py-14 md:py-20" data-testid="partners-marquee">
      <Reveal><p className="text-center text-xs uppercase tracking-[0.22em] text-ink/60">Working alongside partners across government, business &amp; philanthropy</p></Reveal>
      <div className="relative mt-10 overflow-hidden">
        <div className="marquee flex w-max items-center">
          {row.map((p, k) => (
            <span key={k} className="flex items-center whitespace-nowrap px-8 font-serif text-3xl italic text-ink/75 md:text-5xl">
              {p}<span className="ml-16 inline-block h-3 w-3 rotate-45 bg-lime" />
            </span>
          ))}
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-ink/55">Partner names shown are placeholders for this prototype.</p>
    </section>
  );
};

export const Banner = () => (
  <section data-testid="image-banner" className="relative overflow-hidden">
    <div className="relative h-[100svh] min-h-[640px] max-h-[960px]">
      <motion.img
        src="/hero/banner.webp" alt="Learners from a Life Choices programme"
        className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        initial={{ scale: 1.15 }} animate={{ scale: 1 }}
        transition={{ duration: 2.4, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/50 to-ink/10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/60 to-transparent" />
      <div className="container-lc relative flex h-full items-end pb-16 pt-28 md:items-center md:pb-0">
        <div className="max-w-2xl text-white">
          <Reveal delay={2.4}><p className="eyebrow mb-6 text-lime">Healing · Uplifting · Empowering</p></Reveal>
          <h2 className="font-display text-4xl tracking-tight md:text-6xl lg:text-7xl">
            <MaskLines delay={2.5} lines={["Ignite the potential", "of every young person."]} />
          </h2>
          <Reveal delay={2.9}><p className="mt-6 max-w-lg text-base text-white/85 md:text-lg">We work in schools, communities and from our Campus in Lansdowne, investing in young people so they can reach their potential.</p></Reveal>
          <Reveal delay={3.0}><Link to="/interventions" data-testid="banner-programmes-btn" className="btn-lime group mt-9">Explore our programmes <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></Reveal>
        </div>
      </div>
    </div>
  </section>
);

export const Involved = () => (
  <section className="bg-transparent py-24 md:py-36" data-testid="involved-section">
    <div className="container-lc grid grid-cols-1 gap-14 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Reveal><Eyebrow>Get Involved</Eyebrow></Reveal>
        <Reveal delay={0.06}><h2 className="font-display text-3xl leading-[1.05] tracking-tight md:text-5xl">There are many ways to <em className="font-serif font-normal italic">change the story.</em></h2></Reveal>
        <Reveal delay={0.12}><Placeholder label="YouthCode Project graduates" src="/photos/academy-certificates.jpg" className="mt-10 h-[260px] rounded-[24px] md:h-[340px]" /></Reveal>
      </div>
      <div className="lg:col-span-7">
        {INVOLVED.map((g, k) => (
          <Reveal key={g.title} delay={k * 0.07}>
            <Link to={g.href} data-testid={`involved-${g.title.toLowerCase()}`} className="group flex items-start gap-6 border-t border-ink/10 py-9 md:gap-10">
              <div className="flex-1">
                <h3 className="font-display text-3xl tracking-tight md:text-5xl">{g.title}</h3>
                <p className="mt-3 text-base text-ink/65">{g.text}</p>
              </div>
              <span className="mt-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-[background-color,transform] duration-500 group-hover:rotate-45 group-hover:bg-lime">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
