"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";
import TiltCard from "@/components/effects/TiltCard";
import AnimatedCounter from "@/components/effects/AnimatedCounter";
import Timeline from "@/components/effects/Timeline";
import SectionDivider from "@/components/effects/SectionDivider";
import Badge from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n/context";
import { skills } from "@/lib/constants";
import { motion } from "motion/react";

const stats = [
  { value: 3, suffix: "+", label: { en: "Years Experience", zh: "年开发经验" } },
  { value: 10, suffix: "+", label: { en: "Projects Completed", zh: "完成项目" } },
  { value: 500, suffix: "+", label: { en: "Commits", zh: "代码提交" } },
];

const timelineItems = [
  {
    year: "2024 - Present",
    title: { en: "Full Stack Developer", zh: "全栈开发者" },
    description: {
      en: "Building modern web applications with Next.js and cloud technologies.",
      zh: "使用 Next.js 和云技术构建现代 Web 应用。",
    },
  },
  {
    year: "2023 - 2024",
    title: { en: "Frontend Developer", zh: "前端开发者" },
    description: {
      en: "Focused on React ecosystems and UI/UX design implementation.",
      zh: "专注于 React 生态和 UI/UX 设计实现。",
    },
  },
  {
    year: "2022 - 2023",
    title: { en: "Started Open Source", zh: "开始参与开源" },
    description: {
      en: "Contributed to various open source projects and built developer tools.",
      zh: "参与多个开源项目，构建开发者工具。",
    },
  },
];

export default function About() {
  const { t, locale } = useI18n();

  return (
    <section id="about" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            {t.about.title.split(" ").map((word, i) =>
              i === 1 ? (
                <span key={i} className="gradient-text">
                  {" "}
                  {word}{" "}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="text-text-muted text-center max-w-2xl mx-auto mb-16">
            {t.about.subtitle}
          </p>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal>
          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto mb-20">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs md:text-sm text-text-muted">
                  {stat.label[locale]}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <SectionDivider className="mb-16" />

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

        <SectionDivider className="my-16" />

        {/* Timeline */}
        <ScrollReveal>
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            {locale === "zh" ? "我的经历" : "My Journey"}
          </h3>
        </ScrollReveal>
        <Timeline
          items={timelineItems.map((item) => ({
            year: item.year,
            title: item.title[locale],
            description: item.description[locale],
          }))}
        />
      </div>
    </section>
  );
}
