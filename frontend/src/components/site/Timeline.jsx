import { TIMELINE } from "../../data/site";
import { Reveal } from "./Motion";
import { Eyebrow } from "./Sections";

const Slide = ({ m, k }) => (
  <article data-testid={`timeline-slide-${k}`} className="group relative w-[280px] shrink-0 px-3 md:w-[380px] md:px-4">
    <div className="relative mb-8 flex items-center">
      <span className="relative z-10 h-4 w-4 rounded-full border-4 border-white bg-olive shadow transition-transform duration-500 group-hover:scale-150 group-hover:bg-lime" />
    </div>
    <div className="relative h-52 overflow-hidden rounded-[22px] md:h-64">
      {m.img ? (
        <img src={m.img} alt={`${m.year} — ${m.title}`} loading="lazy" style={{ objectPosition: m.pos || "center" }} className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
      ) : (
        <div className="ph h-full border-2 border-dashed border-olive/30"><span className="ph-label">{m.year} photo coming soon</span></div>
      )}
    </div>
    <p className="font-display mt-6 text-4xl tracking-tight text-olive md:text-5xl">{m.year}</p>
    <h3 className="font-display mt-3 text-xl tracking-tight md:text-2xl">{m.title}</h3>
    <p className="mt-2 text-sm text-ink/70 md:text-base">{m.text}</p>
  </article>
);

export const Timeline = () => {
  const loop = [...TIMELINE, ...TIMELINE];
  return (
    <section className="relative overflow-hidden py-24 md:py-36" data-testid="timeline-section">
      <div className="container-lc flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <Reveal><Eyebrow>21 Years · 2005 to 2026</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 className="font-display text-3xl tracking-tight md:text-5xl">Our story, <em className="italic text-olive">one milestone at a time.</em></h2></Reveal>
        </div>
        <Reveal delay={0.1}><p className="max-w-sm text-base text-ink/70">Hover to pause the journey and take a closer look at each chapter.</p></Reveal>
      </div>
      <div className="relative mt-16">
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
