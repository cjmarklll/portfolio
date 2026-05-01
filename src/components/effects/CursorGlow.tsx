"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x = 0, y = 0, cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const animate = () => {
      cx += (x - cx) * 0.08;
      cy += (y - cy) * 0.08;
      el.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    animate();

    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-[400px] h-[400px] pointer-events-none z-[5] opacity-30"
      style={{
        background:
          "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(34,211,238,0.05) 40%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />
  );
}
