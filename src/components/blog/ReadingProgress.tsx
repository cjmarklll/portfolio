"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-16 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-cyan to-accent-bright origin-left z-[55]"
    />
  );
}
