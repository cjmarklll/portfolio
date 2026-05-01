"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) setVisible(true);
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

    // Track hover on interactive elements
    const selectors = "a, button, [role='button'], input, textarea, select, .magnetic-btn";
    document.querySelectorAll(selectors).forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Re-observe DOM for new interactive elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll(selectors).forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      observer.disconnect();
    };
  }, [visible]);

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
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#22d3ee",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s, transform 0.1s",
          boxShadow: "0 0 6px rgba(34,211,238,0.6)",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: clicking ? 24 : hovering ? 48 : 32,
          height: clicking ? 24 : hovering ? 48 : 32,
          borderRadius: "50%",
          border: "1.5px solid rgba(99,102,241,0.5)",
          opacity: visible ? 1 : 0,
          transition: "width 0.3s, height 0.3s, border-color 0.3s, opacity 0.3s, transform 0.15s",
          borderColor: hovering ? "rgba(34,211,238,0.7)" : "rgba(99,102,241,0.5)",
          background: hovering
            ? "rgba(99,102,241,0.05)"
            : "transparent",
          marginLeft: clicking ? 4 : hovering ? -8 : 0,
          marginTop: clicking ? 4 : hovering ? -8 : 0,
        }}
      />
    </>
  );
}
