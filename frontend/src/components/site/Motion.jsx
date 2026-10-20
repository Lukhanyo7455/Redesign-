import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.9, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const MaskLines = ({ lines, delay = 0, className = "", lineClass = "" }) => (
  <span className={className}>
    {lines.map((l, i) => (
      <span key={i} className="block overflow-hidden pb-[0.08em]">
        <motion.span
          className={`block ${lineClass}`}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.1, delay: delay + i * 0.12, ease: EASE }}
        >
          {l}
        </motion.span>
      </span>
    ))}
  </span>
);

export const CountUp = ({ value, suffix = "", className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [n, setN] = useState(value);
  useEffect(() => {
    if (!inView) return undefined;
    const c = animate(0, value, { duration: 2, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return (
    <span ref={ref} className={className}>
      {n.toLocaleString("en-US")}
      <span className="text-lime">{suffix}</span>
    </span>
  );
};

export const Placeholder = ({ label, className = "", testId }) => (
  <div data-testid={testId} className={`ph ${className}`}>
    <span className="ph-label">{label}</span>
  </div>
);
