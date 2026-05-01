"use client";

import Image from "next/image";
import ScrollReveal from "@/components/effects/ScrollReveal";
import GradientBorderCard from "@/components/effects/GradientBorderCard";
import Badge from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n/context";
import { ProjectMeta } from "@/lib/types";

interface ProjectsProps {
  projects: ProjectMeta[];
}

export default function Projects({ projects }: ProjectsProps) {
  const { t } = useI18n();

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.1}>
              <GradientBorderCard className="h-full">
                <a
                  href={project.liveUrl || project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col h-full"
                >
                  <div className="relative w-full h-40 rounded-lg bg-surface-bright mb-4 overflow-hidden group">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMxMjEyMWEiLz48L3N2Zz4="
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
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
                    <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-bright transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-sm mb-4 flex-1">
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
                </a>
              </GradientBorderCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
