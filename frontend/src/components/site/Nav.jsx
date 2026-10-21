import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, Menu, X, PartyPopper } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV } from "../../data/site";
import { Logo } from "./Logo";

const Dropdown = ({ items, open }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3"
        initial={{ opacity: 0, y: 12, scale: 0.96, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 8, scale: 0.98, filter: "blur(4px)" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "top center" }}
      >
        <motion.div
          className="overflow-hidden rounded-2xl border border-ink/10 bg-white p-2 shadow-[0_24px_60px_-20px_rgba(18,22,15,0.35)]"
          initial="hidden" animate="show"
          variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
        >
          {items.map(([l, h]) => (
            <motion.div key={h} variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}>
              <Link to={h} data-testid={`nav-dropdown-${h.replace(/\//g, "-")}`} className="dd-item group/item relative flex items-center justify-between overflow-hidden rounded-xl px-4 py-3 text-sm text-ink/80">
                <span className="relative z-10 transition-[transform,color] duration-300 group-hover/item:translate-x-1 group-hover/item:text-ink">{l}</span>
                <ArrowRight className="relative z-10 h-3.5 w-3.5 -translate-x-2 text-olive opacity-0 transition-[opacity,transform] duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const NavItem = ({ n }) => {
  const [hover, setHover] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Link to={n.href} data-testid={`nav-${n.label.toLowerCase()}`} className="relative flex items-center gap-1 rounded-full px-4 py-2 text-sm text-ink/75 transition-colors hover:text-ink">
        {hover && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-lime/30" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
        {n.label}
        {n.children && <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${hover ? "rotate-180" : ""}`} />}
      </Link>
      {n.children && <Dropdown items={n.children} open={hover} />}
    </div>
  );
};

export const Nav = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between rounded-full border border-ink/10 bg-bone/75 py-2 pl-3 pr-2 backdrop-blur-xl">
        <Link to="/" data-testid="nav-logo" className="rounded-full bg-ink px-4 py-2"><Logo className="h-6 md:h-7" /></Link>
        <nav className="isolate hidden items-center gap-1 lg:flex">
          {NAV.map((n) => <NavItem key={n.label} n={n} />)}
        </nav>
        <div className="flex items-center gap-2">
          <button data-testid="nav-birthday-badge" aria-label="Celebrating 21 years" onClick={() => window.dispatchEvent(new Event("lc21-open"))}
            className="birthday-badge group flex items-center gap-1.5 whitespace-nowrap rounded-full border border-olive/30 px-3 py-2 text-xs font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5">
            <PartyPopper className="h-3.5 w-3.5 text-olive transition-transform duration-500 group-hover:rotate-12" />
            <span className="hidden xl:inline">Celebrating 21 years</span>
            <span className="whitespace-nowrap xl:hidden">21</span>
          </button>
          <Link to="/get-involved" className="hidden px-3 text-sm text-ink/75 hover:text-ink 2xl:block" data-testid="nav-get-involved">Get Involved</Link>
          <Link to="/get-involved" data-testid="nav-donate-btn" className="group flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5">
            Donate <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <button data-testid="nav-menu-toggle" aria-label="Menu" onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-bone lg:hidden">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div data-testid="mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mx-auto mt-2 max-w-[1320px] rounded-3xl bg-ink p-6 text-bone lg:hidden">
            {NAV.map((n) => (
              <Link key={n.label} to={n.href} onClick={() => setOpen(false)} className="block border-b border-bone/10 py-3 font-display text-2xl">{n.label}</Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
