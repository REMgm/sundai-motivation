import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

/** The SUNDAI masthead ink-fades in once per load, letter by letter. */
export function MastheadInk({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const split = new SplitType(el, { types: "chars" });
      if (!split.chars || split.chars.length === 0) return;
      gsap.fromTo(
        split.chars,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, stagger: 0.02, ease: "power1.out" },
      );
      return () => split.revert();
    },
    { scope: ref },
  );

  return <span ref={ref}>{text}</span>;
}
