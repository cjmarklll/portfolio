"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const visibleRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Start off-screen
    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const animate = () => {
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const selectors = "a, button, [role='button'], input, textarea, select, .magnetic-btn";
    const addListeners = () => {
      document.querySelectorAll(selectors).forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    addListeners();

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      observer.disconnect();
    };
  }, []); // No dependency on visible

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--color-cyan)",
          opacity: visible ? 1 : 0,
          boxShadow: "0 0 6px var(--color-glow)",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998]"
        style={{
          top: 0,
          left: 0,
          width: clicking ? 24 : hovering ? 48 : 32,
          height: clicking ? 24 : hovering ? 48 : 32,
          borderRadius: "50%",
          opacity: visible ? 1 : 0,
          transition: "width 0.3s, height 0.3s, border-color 0.3s, opacity 0.15s",
          border: `1.5px solid ${hovering ? "var(--color-cyan)" : "var(--color-accent)"}`,
          background: hovering
            ? "color-mix(in srgb, var(--color-accent) 8%, transparent)"
            : "transparent",
          marginLeft: clicking ? 4 : hovering ? -8 : 0,
          marginTop: clicking ? 4 : hovering ? -8 : 0,
          willChange: "transform",
        }}
      />
    </>
  );
}
