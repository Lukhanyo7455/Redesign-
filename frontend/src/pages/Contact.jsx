import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone, Send, Check } from "lucide-react";
import { PageBanner } from "../components/site/PageBanner";
import { Reveal } from "../components/site/Motion";

const API = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api` : null;
const ADDRESS = "314 Imam Haron Road, Lansdowne, Cape Town, South Africa";
const SUBJECTS = ["General enquiry", "Partnerships", "Donations", "Programmes", "Volunteering"];
const INIT = { name: "", email: "", phone: "", subject: SUBJECTS[0], message: "" };

const DETAILS = [
  { icon: MapPin, label: "Visit", value: ADDRESS, href: `https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}` },
  { icon: Mail, label: "Email", value: "info@lifechoices.co.za", href: "mailto:info@lifechoices.co.za" },
  { icon: Phone, label: "Call", value: "+27 21 761 4640", href: "tel:+27217614640" },
];

const Input = ({ label, testId, area, ...p }) => (
  <label className="block">
    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-ink/60">{label}</span>
    {area ? <textarea data-testid={testId} rows={5} {...p} className="lc-input resize-none" /> : <input data-testid={testId} {...p} className="lc-input" />}
  </label>
);

export default function ContactPage() {
  const [f, setF] = useState(INIT);
  const [state, setState] = useState("idle");
  const set = (p) => setF((s) => ({ ...s, ...p }));
  const valid = f.name.trim() && /\S+@\S+\.\S+/.test(f.email) && f.message.trim().length > 4;

  const submit = async (e) => {
    e.preventDefault();
    if (!API || !valid) return;
    setState("sending");
    try {
      await axios.post(`${API}/contact`, { ...f, phone: f.phone || null });
      setState("sent");
      setF(INIT);
    } catch { setState("error"); }
  };

  return (
    <main data-testid="contact-page">
      <PageBanner short pos="center 22%" testId="contact-banner" img="/photos/contact-banner.webp" ratio={1194 / 880} eyebrow="Contact us"
        lines={["Let’s shape the future", "together."]}
        text="Whether you want to partner, volunteer, donate or learn more about our programmes, our team would love to hear from you." />

      <section className="py-20 md:py-28">
        <div className="container-lc grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal><p className="eyebrow mb-5 text-olive">Get in touch</p></Reveal>
            <Reveal delay={0.06}><h2 className="font-display text-3xl tracking-tight md:text-5xl">We’re here in <em className="italic text-olive">Lansdowne.</em></h2></Reveal>
            <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {DETAILS.map(({ icon: I, label, value, href }, k) => (
                <Reveal key={label} delay={0.08 + k * 0.06}>
                  <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" data-testid={`contact-detail-${label.toLowerCase().replace(/\s/g, "-")}`} className="group flex items-start gap-5 py-6">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lime/20 transition-[background-color,transform] duration-500 group-hover:rotate-12 group-hover:bg-lime"><I className="h-5 w-5 text-ink" /></span>
                    <span><span className="block text-xs font-semibold uppercase tracking-[0.16em] text-ink/60">{label}</span><span className="mt-1 block text-base text-ink md:text-lg">{value}</span></span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <form onSubmit={submit} data-testid="contact-form" className="relative overflow-hidden rounded-[32px] border border-ink/10 bg-white/80 p-6 shadow-[0_30px_80px_-40px_rgba(18,22,15,0.35)] backdrop-blur md:p-10">
                <AnimatePresence>
                  {state === "sent" && (
                    <motion.div data-testid="contact-success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 p-8 text-center">
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="flex h-16 w-16 items-center justify-center rounded-full bg-lime"><Check className="h-8 w-8" strokeWidth={3} /></motion.span>
                      <h3 className="font-display mt-5 text-3xl">Message sent!</h3>
                      <p className="mt-2 max-w-sm text-ink/70">Thank you for reaching out. Our team will get back to you soon.</p>
                      <button type="button" data-testid="contact-send-another" onClick={() => setState("idle")} className="btn-ghost btn-ghost-dark mt-6">Send another message</button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Full name" testId="contact-name" value={f.name} onChange={(e) => set({ name: e.target.value })} placeholder="Your name" />
                  <Input label="Email" testId="contact-email" type="email" value={f.email} onChange={(e) => set({ email: e.target.value })} placeholder="you@example.com" />
                  <Input label="Phone (optional)" testId="contact-phone" value={f.phone} onChange={(e) => set({ phone: e.target.value })} placeholder="+27" />
                  <div>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-ink/60">Subject</span>
                    <div className="flex flex-wrap gap-2">
                      {SUBJECTS.slice(0, 3).map((s) => (
                        <button type="button" key={s} data-testid={`contact-subject-${s.toLowerCase().replace(/\s/g, "-")}`} onClick={() => set({ subject: s })}
                          className={`rounded-full border px-3 py-2 text-xs transition-colors duration-300 ${f.subject === s ? "border-ink bg-ink text-white" : "border-ink/15 text-ink/70"}`}>{s}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-5"><Input area label="Message" testId="contact-message" value={f.message} onChange={(e) => set({ message: e.target.value })} placeholder="How can we help?" /></div>
                {state === "error" && <p data-testid="contact-error" className="mt-4 text-sm text-red-700">Something went wrong. Please try again.</p>}
                <button type="submit" data-testid="contact-submit-btn" disabled={!valid || state === "sending"} className="btn-lime group mt-7 disabled:cursor-not-allowed disabled:opacity-40">
                  {state === "sending" ? <><span className="spinner" /> Sending…</> : <>Send message <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" /></>}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28" data-testid="contact-map">
        <div className="container-lc">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] border border-ink/10">
              <iframe title="Life Choices location map" className="map-frame h-[380px] w-full md:h-[480px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=15&output=embed`} />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
