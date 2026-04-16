"use client";
import { useEffect, useRef, useState, CSSProperties } from "react";

interface Props {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "scale" | "fade";
  style?: CSSProperties;
  className?: string;
  threshold?: number;
}

export default function FadeIn({ children, delay = 0, direction = "up", style, className, threshold = 0.1 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const transforms: Record<string, string> = {
    up:    "translateY(28px)",
    left:  "translateX(28px)",
    scale: "scale(0.93)",
    fade:  "none",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
