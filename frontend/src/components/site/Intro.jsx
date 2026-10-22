import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MaskLines } from "./Motion";

export const Intro = () => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1000);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-testid="welcome-overlay"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-bone"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img
            src="/brand/logo.png" alt="Life Choices" className="h-12 md:h-16"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          />
          <h1 className="font-display mt-8 px-6 text-center text-4xl sm:text-6xl lg:text-7xl tracking-tight">
            <MaskLines lines={[<>Welcome to <em className="font-serif italic font-normal text-lime">Life Choices</em></>]} delay={0.3} />
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
