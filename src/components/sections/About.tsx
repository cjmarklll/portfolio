"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";
import TiltCard from "@/components/effects/TiltCard";
import Badge from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n/context";
import { skills } from "@/lib/constants";
import { motion } from "motion/react";

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            {t.about.title.split(" ").map((word, i) =>
              i === 1 ? (
                <span key={i} className="gradient-text"> {word} </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="text-text-muted text-center max-w-2xl mx-auto mb-16">
            {t.about.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-4">
              {t.about.bio.map((paragraph, i) => (
                <p key={i} className="text-text leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>

          {/* Skills with TiltCard */}
          <ScrollReveal delay={0.2}>
            <TiltCard className="p-6" glowColor="rgba(99, 102, 241, 0.08)">
              <h3 className="text-lg font-semibold text-white mb-4">
                {t.about.skillsTitle}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                  >
                    <Badge>{skill}</Badge>
                  </motion.div>
                ))}
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
