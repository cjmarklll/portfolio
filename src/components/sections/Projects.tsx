"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import Badge from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n/context";
import { ProjectMeta } from "@/lib/types";

interface ProjectsProps {
  projects: ProjectMeta[];
}

export default function Projects({ projects }: ProjectsProps) {
  const { t, locale } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="projects" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            {t.projects.title.split(" ").map((word, i) =>
              i === 0 ? (
                <span key={i}>{word} </span>
              ) : (
                <span key={i} className="gradient-text">
                  {word}{" "}
                </span>
              )
            )}
          </h2>
          <p className="text-text-muted text-center max-w-2xl mx-auto mb-16">
            {t.projects.subtitle}
          </p>
        </ScrollReveal>

        {/* Horizontal scroll container */}
        <div ref={containerRef} className="relative">
          <div className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
            <div className="flex gap-6 w-max">
              {projects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="w-[340px] md:w-[380px] flex-shrink-0 group"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <a
                    href={project.liveUrl || project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {/* Card with animated border */}
                    <div className="relative rounded-xl border border-border bg-surface overflow-hidden transition-all duration-500 group-hover:border-accent/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                      {/* Image / Preview area */}
                      <div className="relative w-full h-48 overflow-hidden">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="380px"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMxMjEyMWEiLz48L3N2Zz4="
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-surface-bright">
                            <svg
                              width="48"
                              height="48"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              className="text-border transition-all duration-700 group-hover:scale-110 group-hover:rotate-3"
                            >
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <path d="M9 3v18M3 9h18" />
                            </svg>
                          </div>
                        )}

                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-bright transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-text-muted text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                          ))}
                        </div>

                        <div className="flex gap-4 text-sm">
                          {project.githubUrl && (
                            <span className="text-accent-bright hover:underline">
                              {t.projects.github} →
                            </span>
                          )}
                          {project.liveUrl && (
                            <span className="text-cyan hover:underline">
                              {t.projects.liveDemo} →
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll hint gradient */}
          <div className="absolute right-0 top-0 bottom-6 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>

        {/* Scroll hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-text-muted mt-4 tracking-wider"
        >
          ← {locale === "zh" ? "横向滚动浏览" : "Scroll horizontally to explore"} →
        </motion.p>
      </div>
    </section>
  );
}
