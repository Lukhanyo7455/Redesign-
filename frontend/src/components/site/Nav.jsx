import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV } from "../../data/site";
import { Logo } from "./Logo";

const Dropdown = ({ items }) => (
  <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 opacity-0 transition-[opacity,transform] duration-300 group-hover:visible group-hover:opacity-100">
    <div className="rounded-2xl border border-ink/10 bg-bone p-2 shadow-xl">
      {items.map(([l, h]) => (
        <Link key={h} to={h} className="block rounded-xl px-4 py-2.5 text-sm text-ink/80 transition-colors hover:bg-ink hover:text-bone">{l}</Link>
      ))}
    </div>
  </div>
);

export const Nav = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between rounded-full border border-ink/10 bg-bone/75 py-2 pl-3 pr-2 backdrop-blur-xl">
        <Link to="/" data-testid="nav-logo" className="rounded-full bg-ink px-4 py-2"><Logo className="h-6 md:h-7" /></Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <div key={n.label} className="group relative">
              <Link to={n.href} data-testid={`nav-${n.label.toLowerCase()}`} className="flex items-center gap-1 rounded-full px-4 py-2 text-sm text-ink/75 transition-colors hover:text-ink">
                {n.label}{n.children && <ChevronDown className="h-3.5 w-3.5" />}
              </Link>
              {n.children && <Dropdown items={n.children} />}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/get-involved" className="hidden px-3 text-sm text-ink/75 hover:text-ink md:block" data-testid="nav-get-involved">Get Involved</Link>
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
