"use client";

import { useEffect, useRef, useCallback } from "react";

interface Node {
  label: string;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
}

interface SkillsConstellationProps {
  skills: string[];
}

export default function SkillsConstellation({ skills }: SkillsConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const hoveredRef = useRef<string | null>(null);

  const initNodes = useCallback((width: number, height: number) => {
    const padding = 70;
    nodesRef.current = skills.map((skill, i) => {
      const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
      const ringRadius = Math.min(width, height) * 0.32;
      const x = width / 2 + Math.cos(angle) * ringRadius;
      const y = height / 2 + Math.sin(angle) * ringRadius;
      return {
        label: skill,
        x: Math.max(padding, Math.min(width - padding, x)),
        y: Math.max(padding, Math.min(height - padding, y)),
        baseX: x,
        baseY: y,
        radius: 4,
      };
    });
  }, [skills]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      if (nodesRef.current.length === 0) {
        initNodes(rect.width, rect.height);
      }
    };

    resize();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
      hoveredRef.current = null;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const time = Date.now();

      // Gentle drift
      for (const node of nodes) {
        node.x = node.baseX + Math.sin(time * 0.0005 + node.baseX * 0.01) * 6;
        node.y = node.baseY + Math.cos(time * 0.0004 + node.baseY * 0.01) * 6;
      }

      // Find hovered node
      let hovered: string | null = null;
      for (const node of nodes) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        if (Math.sqrt(dx * dx + dy * dy) < 35) {
          hovered = node.label;
          break;
        }
      }
      hoveredRef.current = hovered;

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          const maxDist = 180;

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.12;
            const isHoveredLine =
              hovered && (a.label === hovered || b.label === hovered);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = isHoveredLine
              ? `rgba(34, 211, 238, ${opacity * 4})`
              : `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = isHoveredLine ? 1.5 : 0.5;
            ctx.stroke();
          }
        }
      }

      // Extended connections for hovered node
      if (hovered) {
        const hNode = nodes.find((n) => n.label === hovered);
        if (hNode) {
          for (const node of nodes) {
            if (node === hNode) continue;
            const dist = Math.sqrt(
              (hNode.x - node.x) ** 2 + (hNode.y - node.y) ** 2
            );
            if (dist < 260) {
              ctx.beginPath();
              ctx.moveTo(hNode.x, hNode.y);
              ctx.lineTo(node.x, node.y);
              ctx.strokeStyle = `rgba(34, 211, 238, ${0.25 * (1 - dist / 260)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      // Draw nodes and labels
      for (const node of nodes) {
        const isHovered = node.label === hovered;
        const nodeRadius = isHovered ? 6 : node.radius;
        const glowRadius = isHovered ? 24 : 10;

        // Glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowRadius
        );
        gradient.addColorStop(0, isHovered ? "rgba(34,211,238,0.5)" : "rgba(99,102,241,0.3)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? "#22d3ee" : "#6366f1";
        ctx.fill();

        // Label
        ctx.font = `${isHovered ? "bold 12px" : "11px"} Inter, system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = isHovered ? "#22d3ee" : "#8b8b9e";
        ctx.fillText(node.label, node.x, node.y + 14);
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, [initNodes]);

  return (
    <div ref={containerRef} className="relative w-full h-[300px] md:h-[380px]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: "none" }}
      />
    </div>
  );
}
