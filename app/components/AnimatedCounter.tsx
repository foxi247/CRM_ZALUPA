"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;      // e.g. "+300%", "124", "15.4М", "24/7"
  duration?: number;
  style?: React.CSSProperties;
}

function parseNumber(v: string): { prefix: string; num: number; suffix: string } | null {
  const m = v.match(/^([+\-]?)(\d+(?:\.\d+)?)(.*)/);
  if (!m) return null;
  return { prefix: m[1], num: parseFloat(m[2]), suffix: m[3] };
}

export default function AnimatedCounter({ value, duration = 1800, style }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState("0");
  const [started, setStarted] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const parsed = parseNumber(value);
    if (!parsed) { setDisplayed(value); return; }

    const { prefix, num, suffix } = parsed;
    const isDecimal = value.includes(".");
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;
      const formatted = isDecimal ? current.toFixed(1) : Math.round(current).toString();
      setDisplayed(`${prefix}${formatted}${suffix}`);
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    }

    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [started, value, duration]);

  return <span ref={ref} style={style}>{started ? displayed : "0"}</span>;
}
