"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export default function GlowCard({ children, className, href }: GlowCardProps) {
  const Wrapper = href ? "a" : "div";

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Wrapper
        href={href}
        className={cn(
          "block rounded-xl border border-border bg-surface p-6",
          "transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_20px_var(--color-glow)]",
          className
        )}
      >
        {children}
      </Wrapper>
    </motion.div>
  );
}
