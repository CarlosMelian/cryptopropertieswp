"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.6,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState("0");

  const target = parseFloat(value.replace(/,/g, ""));
  const hasDecimal = value.includes(".");

  useEffect(() => {
    if (!isInView) return;
    let start: number | null = null;
    const totalMs = duration * 1000;

    function tick(timestamp: number) {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / totalMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      setDisplay(
        hasDecimal
          ? current.toFixed(1)
          : Math.round(current).toLocaleString("en-US")
      );

      if (progress < 1) requestAnimationFrame(tick);
    }

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target, duration, hasDecimal]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
