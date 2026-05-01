"use client";

import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let time = 0;
    let scrollY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    const blobs = [
      { x: 0.2, y: 0.3, r: 300, color: [99, 102, 241], speed: 0.0003, phase: 0 },
      { x: 0.7, y: 0.5, r: 250, color: [34, 211, 238], speed: 0.0004, phase: 2 },
      { x: 0.5, y: 0.8, r: 200, color: [167, 139, 250], speed: 0.00035, phase: 4 },
      { x: 0.8, y: 0.2, r: 180, color: [99, 102, 241], speed: 0.0005, phase: 1 },
    ];

    const draw = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollOffset = scrollY * 0.0002;

      for (const blob of blobs) {
        const cx =
          canvas.width *
          (blob.x + Math.sin(time * blob.speed + blob.phase) * 0.15);
        const cy =
          canvas.height *
          (blob.y +
            Math.cos(time * blob.speed * 0.7 + blob.phase) * 0.1 -
            scrollOffset);

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, blob.r);
        gradient.addColorStop(0, `rgba(${blob.color.join(",")}, 0.08)`);
        gradient.addColorStop(0.5, `rgba(${blob.color.join(",")}, 0.03)`);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.7 }}
    />
  );
}
