import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * The Light-Table Reveal. A halftone press photo sits over its registered
 * "printing plate" engraving; pointer movement opens a soft circular window
 * in the photo mask, as if holding the front page up to the light.
 * SSR renders the static photo only; the effect activates after hydration.
 * Coarse pointers get one slow autonomous sweep; reduced motion gets nothing.
 */
export function LightTableReveal({
  photoSrc,
  plateSrc,
  alt,
}: {
  photoSrc: string;
  plateSrc: string;
  alt: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = wrap.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      el.classList.add("lt-active");
      // Seed the vars with a % unit so gsap keeps tweening in percent.
      el.style.setProperty("--mx", "120%");
      el.style.setProperty("--my", "120%");
      const toX = gsap.quickTo(el, "--mx", { duration: 0.4, ease: "power3", unit: "%" });
      const toY = gsap.quickTo(el, "--my", { duration: 0.4, ease: "power3", unit: "%" });

      const fine = window.matchMedia("(pointer: fine)").matches;
      if (fine) {
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          toX(((e.clientX - r.left) / r.width) * 100);
          toY(((e.clientY - r.top) / r.height) * 100);
        };
        const onLeave = () => {
          toX(120);
          toY(120);
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        };
      }

      // Coarse pointer: one slow diagonal sweep when first in view, then settle away.
      const sweep = gsap.timeline({ paused: true });
      sweep
        .fromTo(el, { "--mx": "15%", "--my": "20%" }, { "--mx": "80%", "--my": "70%", duration: 2.4, ease: "power2.inOut" })
        .to(el, { "--mx": "130%", "--my": "130%", duration: 1.2, ease: "power2.in" });
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            sweep.play();
            io.disconnect();
          }
        },
        { threshold: 0.5 },
      );
      io.observe(el);
      return () => io.disconnect();
    },
    { scope: wrap },
  );

  return (
    <div ref={wrap} className="light-table border border-hairline">
      <img
        src={plateSrc}
        alt=""
        aria-hidden="true"
        loading="eager"
        className="lt-plate"
      />
      <img
        src={photoSrc}
        alt={alt}
        width={1080}
        height={1350}
        fetchPriority="high"
        className="lt-photo h-auto w-full"
      />
    </div>
  );
}
