import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { articles, type ArticleMeta } from "../../content/articles";
import { Reveal } from "./reveal";

interface Part {
  numeral: string;
  title: string;
  dek: string;
  frontSlug: string;
  rowSlugs: string[];
}

const PARTS: Part[] = [
  {
    numeral: "Part I",
    title: "The Wake-Up Call",
    dek: "Why the pace of AI is the point, and what it exposes inside your company.",
    frontSlug: "week01-speed-of-ai",
    rowSlugs: [
      "opening-welcome",
      "week02-ambition-execution-gap",
      "week03-shadow-ai",
      "week04-ceo-fear",
      "week05-winners-losers",
      "week06-team-resistance",
    ],
  },
  {
    numeral: "Part II",
    title: "Getting Started",
    dek: "First steps, smart starting points, and proving the value to your board.",
    frontSlug: "week07-first-steps",
    rowSlugs: [
      "week08-smart-starting-point",
      "week09-proving-roi",
      "week10-human-plus-ai",
      "week11-culture-transformation",
      "week12-perfect-timing",
    ],
  },
  {
    numeral: "Part III",
    title: "The Agentic Shift",
    dek: "Agents hiring humans, executives at the keyboard, and managing a team you cannot see.",
    frontSlug: "week13-agents-hiring-humans",
    rowSlugs: [
      "week14-design-systems",
      "week16-ceo-tiny-desk",
      "week17-effort-control",
      "week18-fable-brief-bottleneck",
      "week18-manager-of-agents",
    ],
  },
];

const bySlug = new Map(articles.map((a) => [a.slug, a]));

function weekNumeral(a: ArticleMeta) {
  return String(a.week).padStart(2, "0");
}

function IndexRow({ a, onHover }: { a: ArticleMeta; onHover: (slug: string | null) => void }) {
  return (
    <li className="border-b border-hairline last:border-b-0">
      <Link
        to="/articles/$slug"
        params={{ slug: a.slug }}
        className="group flex items-baseline gap-5 py-5"
        onMouseEnter={() => onHover(a.slug)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(a.slug)}
        onBlur={() => onHover(null)}
      >
        <span className="w-[2.2ch] flex-none font-display text-3xl font-[550] leading-none text-inkmuted transition-colors group-hover:text-rubric">
          {weekNumeral(a)}
        </span>
        <span className="min-w-0">
          <span className="block font-display text-xl font-[550] leading-snug text-ink group-hover:underline group-hover:decoration-hairline group-hover:underline-offset-4">
            {a.title}
          </span>
          <span className="mt-1 line-clamp-1 block font-ui text-sm text-inkmuted">{a.lead}</span>
          <span className="mt-1.5 block font-figures text-xs text-inkmuted">
            {a.displayDate} · {a.readTime} read
          </span>
        </span>
      </Link>
    </li>
  );
}

function PartBlock({ part }: { part: Part }) {
  const front = bySlug.get(part.frontSlug)!;
  const rows = part.rowSlugs.map((s) => bySlug.get(s)!);
  const [hovered, setHovered] = useState<string | null>(null);
  const preview = hovered ? bySlug.get(hovered)! : null;

  return (
    <div className="border-t border-hairline pt-10">
      <Reveal>
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
          <span className="slug text-rubric">{part.numeral}</span>
          <h3 className="font-display text-3xl font-[550] tracking-tight text-ink">{part.title}</h3>
          <p className="font-ui text-sm text-inkmuted">{part.dek}</p>
        </div>
      </Reveal>

      {/* Section front: the part's lead issue set large */}
      <Reveal className="mt-8">
        <Link
          to="/articles/$slug"
          params={{ slug: front.slug }}
          className="group grid grid-cols-1 gap-8 md:grid-cols-12"
        >
          <div className="md:col-span-5">
            <img
              src={front.headerImage}
              alt=""
              width={900}
              height={600}
              loading="lazy"
              className="duotone aspect-[3/2] w-full border border-hairline object-cover"
            />
          </div>
          <div className="md:col-span-7">
            <span className="font-display text-5xl font-[550] leading-none text-inkmuted transition-colors group-hover:text-rubric">
              {weekNumeral(front)}
            </span>
            <h4 className="mt-3 max-w-xl font-display text-3xl font-[550] leading-tight tracking-tight text-ink">
              {front.title}
            </h4>
            <p className="mt-3 line-clamp-2 max-w-xl font-ui text-base leading-relaxed text-inkmuted">
              {front.lead}
            </p>
            <p className="mt-3 font-figures text-xs text-inkmuted">
              {front.displayDate} · {front.readTime} read
            </p>
          </div>
        </Link>
      </Reveal>

      {/* Newspaper index with a fixed preview slot at the right margin */}
      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px]">
        <Reveal>
          <ul>
            {rows.map((a) => (
              <IndexRow key={a.slug} a={a} onHover={setHovered} />
            ))}
          </ul>
        </Reveal>
        <div aria-hidden="true" className="hidden lg:block">
          <div className="sticky top-24 aspect-[3/2] w-full overflow-hidden border border-hairline bg-panel">
            {preview ? (
              <motion.img
                key={preview.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                src={preview.headerImage}
                alt=""
                className="duotone h-full w-full object-cover"
              />
            ) : (
              <img
                src={front.headerImage}
                alt=""
                loading="lazy"
                className="duotone h-full w-full object-cover opacity-60"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** The Archive: one season, nineteen briefings, as a contents spread. */
export function Archive() {
  return (
    <section id="archive" className="mx-auto max-w-[1200px] px-6 py-20">
      <h2 className="font-display text-4xl font-[550] tracking-tight text-ink">
        One season. Nineteen briefings.
      </h2>
      <p className="mt-3 max-w-xl font-ui text-base text-inkmuted">
        The complete series, from the first wake-up call to the agentic shift.
      </p>
      <div className="mt-12 space-y-16">
        {PARTS.map((p) => (
          <PartBlock key={p.numeral} part={p} />
        ))}
      </div>
    </section>
  );
}
