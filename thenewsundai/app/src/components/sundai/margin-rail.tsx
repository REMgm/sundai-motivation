import { useEffect, useState } from "react";
import type { TocItem } from "../../lib/article-toc";

/**
 * Sticky left margin rail: the Deep Dive's run-in slugs as an edge index.
 * Visible at xl and up only. Active section tracked with IntersectionObserver.
 */
export function MarginRail({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="In this briefing" className="sticky top-28">
      <p className="slug mb-4 text-inkmuted">In this briefing</p>
      <ul className="space-y-2.5 border-l border-hairline pl-4">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={`font-ui text-[0.8125rem] font-semibold uppercase tracking-[0.1em] transition-colors ${
                active === i.id ? "text-rubric" : "text-inkmuted hover:text-ink"
              }`}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
