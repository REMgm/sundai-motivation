import { Link } from "@tanstack/react-router";
import type { ArticleMeta } from "../../content/articles";

function Cell({ a, direction }: { a: ArticleMeta; direction: "Previous" | "Next" }) {
  return (
    <Link
      to="/articles/$slug"
      params={{ slug: a.slug }}
      className="group flex items-start gap-5 border border-hairline p-6 transition-colors hover:border-ink"
    >
      <span className="font-display text-6xl font-[550] leading-none text-inkmuted transition-colors group-hover:text-rubric">
        {String(a.week).padStart(2, "0")}
      </span>
      <span className="min-w-0">
        <span className="slug text-inkmuted">{direction} issue</span>
        <span className="mt-2 line-clamp-2 block font-display text-lg font-[550] leading-snug text-ink">
          {a.title}
        </span>
        <span className="mt-2 block font-figures text-xs text-inkmuted">{a.displayDate}</span>
      </span>
    </Link>
  );
}

/** "Continued next Sunday": whole-cell-clickable adjacent issues. */
export function PrevNext({ prev, next }: { prev: ArticleMeta | null; next: ArticleMeta | null }) {
  if (!prev && !next) return null;
  return (
    <div>
      <p className="slug mb-5 text-inkmuted">Continued next Sunday</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {prev ? <Cell a={prev} direction="Previous" /> : <div aria-hidden="true" />}
        {next ? <Cell a={next} direction="Next" /> : <div aria-hidden="true" />}
      </div>
    </div>
  );
}
