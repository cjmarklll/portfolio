"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import MagneticButton from "@/components/effects/MagneticButton";
import GlitchText from "@/components/effects/GlitchText";
import Typewriter from "@/components/effects/Typewriter";
import { useI18n } from "@/lib/i18n/context";

const ParticleField = dynamic(
  () => import("@/components/effects/ParticleField"),
  { ssr: false }
);

export default function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleField />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="text-sm md:text-base text-accent-bright mb-4 tracking-widest uppercase"
        >
          {t.hero.welcome}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Hi, I&apos;m{" "}
          <GlitchText text={t.hero.name} className="gradient-text" />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="text-lg md:text-2xl text-text-muted mb-8 h-8"
        >
          <Typewriter texts={t.hero.titles} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.6 }}
          className="text-text-muted max-w-xl mx-auto mb-10 leading-relaxed"
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
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-bright hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-200"
          >
            {t.hero.viewWork}
          </MagneticButton>
          <MagneticButton
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-6 py-3 text-sm font-medium text-text hover:border-accent/50 hover:text-accent-bright transition-all duration-200"
          >
            {t.hero.getInTouch}
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-text-muted"
            >
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
