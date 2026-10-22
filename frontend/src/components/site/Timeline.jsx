import { TIMELINE } from "../../data/site";
import { Reveal } from "./Motion";
import { Eyebrow } from "./Sections";

const Slide = ({ m, k }) => (
  <article data-testid={`timeline-slide-${k}`} className="group relative w-[250px] shrink-0 px-3 md:w-[320px] md:px-4">
    <div className="relative mb-8 flex items-center">
      <span className="relative z-10 h-4 w-4 rounded-full border-4 border-white bg-olive shadow transition-transform duration-500 group-hover:scale-150 group-hover:bg-lime" />
    </div>
    <div className="relative overflow-hidden rounded-[22px] transition-transform duration-700 group-hover:-translate-y-2">
      <img src={m.img} alt={`${m.year} — ${m.title}`} loading="lazy" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-2xl" aria-hidden="true" />
      <img src={m.img} alt={`${m.year} — ${m.title}`} loading="lazy" className="relative aspect-[4/3] w-full object-contain" />
    </div>
    <p className="font-display mt-5 text-3xl tracking-tight text-olive md:text-4xl">{m.year}</p>
    <h3 className="font-display mt-2 text-lg tracking-tight md:text-xl">{m.title}</h3>
    <p className="mt-2 text-sm text-ink/70">{m.text}</p>
  </article>
);

export const Timeline = () => {
  const loop = [...TIMELINE, ...TIMELINE];
  return (
    <section className="relative overflow-hidden py-20 md:py-28" data-testid="timeline-section">
      <div className="container-lc flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Reveal><Eyebrow>21 Years · 2005 to 2026</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 className="font-display text-3xl tracking-tight md:text-5xl">Our story, <em className="italic text-olive">one milestone at a time.</em></h2></Reveal>
        </div>
      </div>
      <div className="relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f8faf3] to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f8faf3] to-transparent md:w-32" />
        <div className="timeline-track flex w-max">
          <div className="absolute left-0 right-0 top-2 h-px bg-ink/15" />
          {loop.map((m, k) => <Slide key={k} m={m} k={k} />)}
        </div>
      </div>
    </section>
  );
};
