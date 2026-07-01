import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

/**
 * The Subscription Slip: a ruled coupon over the printing-press ambient loop
 * at low opacity. The video mounts only once the section approaches the
 * viewport, and never under reduced motion or data saver; the poster tone
 * carries the fallback.
 */
export function SubscriptionSlip() {
  const [showVideo, setShowVideo] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const near = useInView(sectionRef, { once: true, margin: "400px" });

  useEffect(() => {
    if (!near) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as { connection?: { saveData?: boolean } }).connection;
    if (!reduce && !conn?.saveData) setShowVideo(true);
  }, [near]);

  return (
    <section
      ref={sectionRef}
      id="subscribe"
      className="relative overflow-hidden border-t border-hairline"
    >
      {showVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
          src="/assets/press-loop.mp4"
          poster="/assets/press-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[url(/assets/press-poster.jpg)] bg-cover bg-center opacity-[0.08]"
        />
      )}
      <div className="relative mx-auto max-w-[1200px] px-6 py-24">
        <div className="mx-auto max-w-xl border border-ink bg-paper px-8 py-12 text-center sm:px-14">
          <p className="slug text-rubric">No charge, no spam</p>
          <h2 className="mt-4 font-display text-4xl font-[550] tracking-tight text-ink">
            Delivered every Sunday morning.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-ui text-base leading-relaxed text-inkmuted">
            One briefing a week on what AI actually means for your business. Read it
            before Monday starts.
          </p>
          <a
            href="https://www.linkedin.com/in/remcovroom/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block bg-ink px-8 py-3.5 font-ui text-sm font-semibold text-paper transition-colors hover:bg-rubric active:scale-[0.98]"
          >
            Subscribe on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
