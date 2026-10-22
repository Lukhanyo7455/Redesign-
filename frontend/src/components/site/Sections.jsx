import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { STATS, APPROACH, IMPACT, STORIES, PARTNERS, INVOLVED } from "../../data/site";
import { Reveal, CountUp, Placeholder } from "./Motion";
import { PageBanner } from "./PageBanner";

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
  <section className="relative bg-transparent py-20 md:py-28" data-testid="vision-section">
    <div className="container-lc grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
      <Reveal className="lg:col-span-7"><Placeholder label="Young people at Life Choices" src="/photos/lq-2022-cover.jpg" className="aspect-[1280/792] w-full rounded-[28px] lg:aspect-auto lg:h-full lg:min-h-[420px]" /></Reveal>
      <div className="flex flex-col justify-center lg:col-span-5">
        <Reveal><Eyebrow>Our Vision</Eyebrow></Reveal>
        <Reveal delay={0.06}><p className="text-lg text-ink/60">Life Choices is working towards a world where…</p></Reveal>
        <Reveal delay={0.12}>
          <h2 className="font-display mt-4 text-3xl tracking-tight md:text-4xl lg:text-[2.6rem]">
            Every young person feels <em className="font-serif font-normal italic text-olive">safe and valued.</em> Every young person is free to thrive.
          </h2>
        </Reveal>
        <Reveal delay={0.18}><p className="mt-6 max-w-2xl text-base text-ink/70 md:text-lg">We’re doing this through programmes that ignite the potential of young people by healing, uplifting and empowering lives.</p></Reveal>
        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-wrap items-center gap-8 border-t border-ink/10 pt-6">
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
  <section className="relative bg-lime/10 py-20 md:py-28" data-testid="approach-section">
    <div className="container-lc grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="flex flex-col lg:col-span-5">
          <Reveal><Eyebrow>Our Approach</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 className="font-display text-3xl tracking-tight md:text-5xl">Five building blocks that help young people <em className="font-serif font-normal italic text-olive">thrive.</em></h2></Reveal>
          <Reveal delay={0.12}><p className="mt-6 max-w-md text-base text-ink/70 md:text-lg">Our programmes operate across all these blocks so that young people can know themselves, access caring youth-friendly support, gain vital life skills, and get ready for their future.</p></Reveal>
          <Reveal delay={0.18} className="mt-8 flex-1"><Placeholder label="Learners in a wellness session" src="/photos/wellness-spes-bona.webp" className="aspect-[3/2] w-full rounded-[24px] lg:aspect-auto lg:h-full lg:min-h-[260px]" /></Reveal>
      </div>
      <ol className="lg:col-span-7">
        {APPROACH.map((a, k) => (
          <Reveal key={a.title} delay={k * 0.05}>
            <li data-testid={`approach-item-${k}`} className="group border-t border-ink/10 py-6 md:py-7">
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

const DOTS = Array.from({ length: 200 });

export const Impact = () => (
  <section className="relative py-16 md:py-24" data-testid="impact-section">
    <div className="container-lc">
      <div className="grain relative overflow-hidden rounded-[36px] bg-ink px-6 py-14 text-white md:rounded-[48px] md:px-14 md:py-20">
        <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal><Eyebrow light>Measured Impact</Eyebrow></Reveal>
            <Reveal delay={0.06}>
              <CountUp value={200000} suffix="+" className="impact-figure block font-display text-[3.4rem] tracking-[-0.04em] sm:text-7xl lg:text-[6.5rem]" />
            </Reveal>
            <Reveal delay={0.12}><h2 className="font-display mt-4 text-2xl tracking-tight md:text-3xl">lives touched since 2005.</h2></Reveal>
            <Reveal delay={0.18}><p className="mt-5 max-w-md text-base text-white/70">Every dot represents a thousand people reached across Cape Town’s schools and communities.</p></Reveal>
            <Reveal delay={0.24}><Link to="/impact" data-testid="impact-reports-btn" className="btn-lime group mt-8">See our impact &amp; reports <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></Reveal>
          </div>
          <div className="lg:col-span-7">
            <motion.div
              data-testid="impact-dots"
              className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1.5 md:gap-2.5"
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
              variants={{ show: { transition: { staggerChildren: 0.008 } } }}
            >
              {DOTS.map((_, k) => (
                <motion.span key={k} className={`aspect-square rounded-full ${k % 37 === 0 ? "bg-white" : "bg-lime"}`}
                  variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 18 }} />
              ))}
            </motion.div>
            <div className="mt-10 flex flex-wrap gap-3">
              {IMPACT.slice(1).map((s, k) => (
                <Reveal key={s.label} delay={0.3 + k * 0.08}>
                  <div className="flex items-center gap-3 rounded-full border border-white/15 py-2 pl-2 pr-5">
                    <span className="flex h-11 min-w-11 items-center justify-center rounded-full bg-lime px-3 font-display text-base text-ink"><CountUp value={s.value} suffix={s.suffix} /></span>
                    <span className="text-sm text-white/80">{s.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const Stories = () => (
  <section className="bg-transparent py-20 md:py-28" data-testid="stories-section">
    <div className="container-lc">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Reveal><Eyebrow>Stories from the Field</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 className="font-display text-3xl tracking-tight md:text-5xl">Every person we meet has a story <em className="font-serif font-normal italic text-olive">worth sharing.</em></h2></Reveal>
        </div>
        <Reveal delay={0.1}><Link to="/stories" data-testid="stories-more-link" className="link-arrow group">Read more stories <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></Reveal>
      </div>
      <div className="mt-14">
        {STORIES.map((s, k) => (
          <Reveal key={s.slug} delay={k * 0.06}>
            <Link to={`/stories/${s.slug}`} data-testid={`story-row-${k}`} className="group grid grid-cols-1 items-stretch gap-6 border-t border-ink/10 py-8 md:grid-cols-12 md:gap-10">
              <div className="overflow-hidden rounded-[20px] md:col-span-4">
                <Placeholder label={s.title} src={s.img} className="aspect-[3/2] w-full md:aspect-auto md:h-full md:min-h-[200px]" />
              </div>
              <div className="flex flex-col justify-center md:col-span-7">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink/60"><span className="font-semibold text-olive">{s.tag}</span><span className="h-1 w-1 rounded-full bg-ink/40" />{s.date}</div>
                <h3 className="font-display mt-3 text-2xl tracking-tight md:text-4xl">{s.title}</h3>
                <p className="mt-3 max-w-xl text-base text-ink/65">{s.text}</p>
              </div>
              <ArrowUpRight className="hidden h-8 w-8 self-center text-ink/40 transition-[transform,color] duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink md:col-span-1 md:block" />
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const Partners = () => {
  const row = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];
  return (
    <section className="border-y border-ink/10 bg-lime/10 py-12 md:py-16" data-testid="partners-marquee">
      <Reveal><p className="text-center text-xs uppercase tracking-[0.22em] text-ink/60">Proudly supported by our partners</p></Reveal>
      <div className="relative mt-10 overflow-hidden">
        <div className="marquee flex w-max items-center">
          {row.map((p, k) => (
            <div key={k} data-testid={`partner-logo-${k}`} className="mx-4 flex h-28 w-52 shrink-0 items-center justify-center rounded-2xl bg-white px-6 py-4 shadow-sm md:mx-6 md:h-32 md:w-64">
              <img src={p.logo} alt={p.name} className={`max-h-full max-w-full object-contain ${p.logo.endsWith(".png") ? "scale-150" : ""}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Banner = () => (
  <PageBanner testId="image-banner" img="/hero/banner.webp" ratio={2000 / 1335} eyebrow="Healing · Uplifting · Empowering" lines={["Ignite the potential", "of every young person."]}>
    <Reveal delay={2.8}><p data-testid="banner-description" className="mt-6 max-w-xl text-lg font-semibold text-lime md:text-2xl">21 years of investing in South Africa’s youth, from the Cape Flats to the world of work.</p></Reveal>
    <Reveal delay={2.9}><p className="mt-5 max-w-lg text-base text-white/85 md:text-lg">We work in schools, communities and from our Campus in Lansdowne, investing in young people so they can reach their potential.</p></Reveal>
    <Reveal delay={3.0}><Link to="/interventions" data-testid="banner-programmes-btn" className="btn-lime group mt-8">Explore our programmes <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></Reveal>
  </PageBanner>
);

export const Involved = () => (
  <section className="bg-transparent py-20 md:py-28" data-testid="involved-section">
    <div className="container-lc grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="flex flex-col lg:col-span-5">
        <Reveal><Eyebrow>Get Involved</Eyebrow></Reveal>
        <Reveal delay={0.06}><h2 className="font-display text-3xl tracking-tight md:text-5xl">There are many ways to <em className="font-serif font-normal italic text-olive">change the story.</em></h2></Reveal>
        <Reveal delay={0.12} className="mt-8 flex-1"><Placeholder label="Learners in a Life Choices session" src="/photos/get-involved.webp" className="aspect-[3/2] w-full rounded-[24px] lg:aspect-auto lg:h-full lg:min-h-[260px]" /></Reveal>
      </div>
      <div className="lg:col-span-7">
        {INVOLVED.map((g, k) => (
          <Reveal key={g.title} delay={k * 0.07}>
            <Link to={g.href} data-testid={`involved-${g.title.toLowerCase()}`} className="group flex items-start gap-6 border-t border-ink/10 py-7 md:gap-10">
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
