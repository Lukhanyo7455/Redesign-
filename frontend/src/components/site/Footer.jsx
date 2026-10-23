import { Link } from "react-router-dom";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import { FOOTER_ORG, INTERVENTIONS } from "../../data/site";
import { Logo } from "./Logo";

const Col = ({ title, items }) => (
  <div>
    <p className="eyebrow mb-5 text-bone/60">{title}</p>
    <ul className="space-y-2.5">
      {items.map(([l, h]) => <li key={h}><Link to={h} className="text-sm text-bone/85 transition-colors hover:text-lime">{l}</Link></li>)}
    </ul>
  </div>
);

export const Footer = () => (
  <footer className="bg-ink text-bone" data-testid="site-footer">
    <div className="container-lc grid grid-cols-2 gap-x-6 gap-y-12 pb-14 pt-16 md:gap-x-10 md:pt-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
      <div className="col-span-2 lg:col-span-1">
        <Logo className="h-12" />
        <p className="mt-5 max-w-xs text-sm text-bone/70">An innovative youth development organisation based in Cape Town, investing in young people so they can reach their potential.</p>
        <div className="mt-6 flex gap-2">
          {[Linkedin, Facebook, Instagram].map((I, k) => (
            <a key={k} href="#" aria-label="social" className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 transition-colors hover:bg-lime hover:text-ink"><I className="h-4 w-4" /></a>
          ))}
        </div>
      </div>
      <div><Col title="Organisation" items={FOOTER_ORG} /></div>
      <div><Col title="Our Work" items={INTERVENTIONS.map((i) => [i.name, `/interventions/${i.slug}`])} /></div>
      <div className="col-span-2 space-y-5 text-sm lg:col-span-1">
        <p className="eyebrow !mb-5 text-bone/60">Visit / Contact</p>
        <div><p className="text-xs uppercase tracking-widest text-lime">Visit</p><p className="mt-1 text-bone/85">314 Imam Haron Road, Lansdowne, Cape Town, South Africa</p></div>
        <div><p className="text-xs uppercase tracking-widest text-lime">Email</p><a href="mailto:info@lifechoices.co.za" className="mt-1 block text-bone/85">info@lifechoices.co.za</a></div>
        <div><p className="text-xs uppercase tracking-widest text-lime">Call</p><a href="tel:+27217614640" className="mt-1 block text-bone/85">+27 21 761 4640</a></div>
      </div>
    </div>
    <div className="container-lc overflow-hidden border-t border-bone/15 py-10" data-testid="footer-wordmark">
      <svg viewBox="-12 -12 1586 523" className="footer-logo-mark mx-auto block w-full max-w-[680px]" role="img" aria-label="Life Choices">
        <defs>
          <filter id="lc-outline" x="-3%" y="-5%" width="106%" height="112%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="3.5" result="d" />
            <feComposite in="d" in2="SourceAlpha" operator="out" result="o" />
            <feFlood floodColor="#ABCC37" />
            <feComposite in2="o" operator="in" />
          </filter>
          <clipPath id="lc-fill"><rect className="footer-logo-fill" x="0" y="0" width="1562" height="499" /></clipPath>
        </defs>
        <image href="/brand/logo-light.png" width="1562" height="499" filter="url(#lc-outline)" />
        <image href="/brand/logo-light.png" width="1562" height="499" clipPath="url(#lc-fill)" />
      </svg>
    </div>
    <div className="container-lc">
      <div className="flex flex-col justify-between gap-2 border-t border-bone/15 py-6 text-xs text-bone/60 md:flex-row md:items-center">
        <span>© 2026 Life Choices. Redesigned prototype by Lukhanyo Mdunyelwa. This is not the official Life Choices website.</span>
        <span>Registered NPO · PBO · Cape Town, South Africa</span>
      </div>
    </div>
  </footer>
);
