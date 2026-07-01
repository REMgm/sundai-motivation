import { Link } from "@tanstack/react-router";
import { motion, useScroll, useReducedMotion } from "motion/react";

/**
 * Sticky article folio bar with the rubric-red reading-progress rule
 * along its bottom edge. Static rule under reduced motion.
 */
export function FolioBar({ week, displayDate }: { week: number; displayDate: string }) {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3" aria-label="Back to the front page">
          <img
            src="/assets/owl-glyph.jpg"
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 border border-hairline object-cover"
          />
          <span className="slug text-ink">The New Sundai</span>
        </Link>
        <span className="font-figures text-xs text-inkmuted">
          Issue No. {String(week).padStart(2, "0")} · {displayDate}
        </span>
      </div>
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-rubric"
          style={{ scaleX: scrollYProgress }}
        />
      )}
    </header>
  );
}
