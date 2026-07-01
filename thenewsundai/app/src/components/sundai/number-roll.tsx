import { useRef, useState, useEffect } from "react";
import NumberFlow from "@number-flow/react";
import { useInView, useReducedMotion } from "motion/react";

/** Figures-panel numeral: rolls from 0 to its value once when it enters view. */
export function NumberRoll({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? value : 0);

  useEffect(() => {
    if (inView) setShown(value);
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      <NumberFlow value={reduce ? value : shown} animated={!reduce} />
    </span>
  );
}
