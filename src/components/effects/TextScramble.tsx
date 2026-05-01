"use client";

import { useEffect, useState, useRef } from "react";

const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/`~01";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function TextScramble({
  text,
  className = "",
  delay = 0,
  speed = 30,
}: TextScrambleProps) {
  const [display, setDisplay] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let frame: number;
    let iteration = 0;
    const totalFrames = text.length * 3;

    const timeout = setTimeout(() => {
      const animate = () => {
        const progress = iteration / totalFrames;
        const revealed = Math.floor(progress * text.length);

        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (i < revealed) {
            result += text[i];
          } else if (text[i] === " ") {
            result += " ";
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }

        setDisplay(result);
        iteration++;

        if (iteration <= totalFrames) {
          frame = requestAnimationFrame(animate);
        } else {
          setDisplay(text);
        }
      };

      frame = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [text, delay, speed]);

  return <span className={className}>{display || text}</span>;
}
