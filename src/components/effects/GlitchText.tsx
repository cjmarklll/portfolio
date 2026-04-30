"use client";

import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <span className={cn("glitch-wrapper", className)} data-text={text}>
      <span className="glitch-text">{text}</span>
    </span>
  );
}
