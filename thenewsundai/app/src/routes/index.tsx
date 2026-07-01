import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "../content/articles";
import { SiteNav } from "../components/sundai/site-nav";
import { MastheadInk } from "../components/sundai/masthead-ink";
import { LightTableReveal } from "../components/sundai/light-table-reveal";
import { Archive } from "../components/sundai/archive";
import { FiguresPanel } from "../components/sundai/figures-panel";
import { PublisherDesk } from "../components/sundai/publisher-desk";
import { SubscriptionSlip } from "../components/sundai/subscription-slip";
import { Colophon } from "../components/sundai/colophon";
import { SmoothScroll } from "../components/sundai/smooth-scroll";

export const Route = createFileRoute("/")({
  component: FrontPage,
});

const latest = articles[articles.length - 1];

// One-sentence dek for the current lead briefing, under 20 words.
const HERO_DEK =
  "Why every person in your company now manages a team of AI agents, and what that asks of you.";

function FrontPage() {
  return (
    <div className="sundai min-h-dvh">
      <SmoothScroll />
      <SiteNav />

      {/* Masthead plate */}
      <header className="border-b border-hairline">
        <div className="mx-auto max-w-[1200px] px-6 pb-8 pt-10 text-center">
          <p className="slug text-ink">The New</p>
          <h1 className="font-display text-[clamp(4rem,10vw,9rem)] font-[560] leading-[0.95] tracking-tight text-ink">
            <MastheadInk text="SUNDAI" />
          </h1>
          <p className="mt-4 font-figures text-sm text-inkmuted">
            Sunday, {latest.displayDate} · Issue No. {String(latest.week).padStart(2, "0")}
          </p>
        </div>
      </header>

      <main>
        {/* Front-page lead */}
        <section className="mx-auto max-w-[1200px] px-6 pb-20 pt-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-8 md:border-r md:border-hairline md:pr-12">
              <p className="slug text-rubric">
                <span className="mr-3 inline-block h-0.5 w-6 bg-rubric align-middle" aria-hidden="true" />
                This week's briefing
              </p>
              <h2 className="mt-6 max-w-2xl font-display text-4xl font-[550] leading-[1.1] tracking-tight text-ink md:text-5xl">
                {latest.title}
              </h2>
              <p className="mt-5 max-w-xl font-ui text-lg leading-relaxed text-inkmuted">{HERO_DEK}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 border-t border-hairline pt-4 font-ui text-sm text-inkmuted">
                <span>By {latest.author}</span>
                <span className="border-l border-hairline pl-4">{latest.displayDate}</span>
                <span className="border-l border-hairline pl-4">{latest.readTime} read</span>
              </div>
              <Link
                to="/articles/$slug"
                params={{ slug: latest.slug }}
                className="mt-8 inline-block bg-ink px-8 py-3.5 font-ui text-sm font-semibold text-paper transition-colors hover:bg-rubric active:scale-[0.98]"
              >
                Read the briefing
              </Link>
            </div>
            <div className="md:col-span-4">
              <LightTableReveal
                photoSrc="/assets/hero.jpg"
                plateSrc="/assets/hero-plate.jpg"
                alt="Rem the owl perched on a stack of Sunday newspapers in a dawn-lit office"
              />
              <p className="mt-3 font-ui text-xs text-inkmuted">
                Rem, publisher. Move your pointer across the photograph to see the printing
                plate beneath.
              </p>
            </div>
          </div>
        </section>

        <Archive />
        <FiguresPanel />
        <PublisherDesk />
        <SubscriptionSlip />
      </main>

      <Colophon />
    </div>
  );
}
