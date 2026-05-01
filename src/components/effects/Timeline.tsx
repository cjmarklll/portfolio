"use client";

import ScrollReveal from "./ScrollReveal";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent" />

      {items.map((item, i) => (
        <ScrollReveal key={i} delay={i * 0.15}>
          <div
            className={`relative flex items-start gap-8 mb-12 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Dot */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(99,102,241,0.6)] z-10" />

            {/* Content */}
            <div
              className={`ml-12 md:ml-0 md:w-1/2 ${
                i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
              }`}
            >
              <span className="text-xs font-mono text-accent-bright tracking-wider">
                {item.year}
              </span>
              <h4 className="text-white font-semibold mt-1">{item.title}</h4>
              <p className="text-text-muted text-sm mt-1">
                {item.description}
              </p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
