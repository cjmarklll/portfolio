"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GradientBorderCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientBorderCard({
  children,
  className,
}: GradientBorderCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setAngle((Math.atan2(y, x) * 180) / Math.PI + 90);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.01 }}
      className={cn("relative rounded-xl p-[1px] overflow-hidden", className)}
      style={{
        background: `conic-gradient(from ${angle}deg, var(--color-accent), var(--color-cyan), var(--color-accent), var(--color-cyan), var(--color-accent))`,
      }}
    >
      <div className="rounded-xl bg-surface p-6 h-full">{children}</div>
    </motion.div>
  );
}
