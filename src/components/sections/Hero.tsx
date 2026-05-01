"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import MagneticButton from "@/components/effects/MagneticButton";
import Typewriter from "@/components/effects/Typewriter";
import TextScramble from "@/components/effects/TextScramble";
import { useI18n } from "@/lib/i18n/context";

const ParticleField = dynamic(
  () => import("@/components/effects/ParticleField"),
  { ssr: false }
);

export default function Hero() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms - different speeds for depth
  const particleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle layer - slowest parallax */}
      <motion.div style={{ y: particleY }} className="absolute inset-0">
        <ParticleField />
      </motion.div>

      {/* Radial gradient overlay */}
      <div className="hero-overlay absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />

      {/* Ambient orbs - medium parallax, different speeds */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="hero-orb absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10"
        style={{
          y: orb1Y,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.4), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        animate={{
          x: [0, -40, 30, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="hero-orb absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-10"
        style={{
          y: orb2Y,
          background:
            "radial-gradient(circle, rgba(34,211,238,0.4), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Text content - fastest parallax */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-accent-bright tracking-wider uppercase">
            {t.hero.welcome}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-heading mb-6 leading-[1.1] tracking-tight"
        >
          {t.hero.name.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 2 + i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={char === " " ? "inline" : "inline-block"}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
          <span className="block mt-2 gradient-text-animated text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
            <Typewriter texts={t.hero.titles} />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.6 }}
          className="text-text-muted max-w-xl mx-auto mb-10 leading-relaxed text-lg"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <MagneticButton
            href="/#projects"
            className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-sm font-medium text-heading overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_var(--color-glow)]"
          >
            <span className="relative z-10">{t.hero.viewWork}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-accent to-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </MagneticButton>
          <MagneticButton
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-8 py-3.5 text-sm font-medium text-text hover:border-accent/50 hover:text-accent-bright hover:bg-accent/5 transition-all duration-300"
          >
            {t.hero.getInTouch}
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] text-text-muted tracking-[0.3em] uppercase">
              Scroll
            </span>
            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              className="text-text-muted"
            >
              <rect
                x="1"
                y="1"
                width="14"
                height="22"
                rx="7"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <motion.circle
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                cx="8"
                cy="8"
                r="2"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
