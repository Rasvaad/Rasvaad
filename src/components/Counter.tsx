"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
  value: string;
  className?: string;
}

export function Counter({ value, className }: CounterProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  // Extract number and suffix (e.g., "500+" -> 500, "+")
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  const isInView = useInView(wrapperRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -10% 0px",
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, motionValue, numericValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (numberRef.current) {
        numberRef.current.textContent = Math.floor(latest).toString();
      }
    });

    return unsubscribe;
  }, [springValue]);

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      if (!isInView && numberRef.current) {
        numberRef.current.textContent = numericValue.toString();
      }
    }, 1200);

    return () => window.clearTimeout(fallback);
  }, [isInView, numericValue]);

  return (
    <span ref={wrapperRef} className={className}>
      <span ref={numberRef}>0</span>
      {suffix}
    </span>
  );
}
