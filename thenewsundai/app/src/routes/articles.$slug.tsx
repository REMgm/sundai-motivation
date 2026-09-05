import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { articles, articleBySlug } from "../content/articles";
import { withAnchors, type TocItem } from "../lib/article-toc";
import { FolioBar } from "../components/sundai/folio-bar";
import { MarginRail } from "../components/sundai/margin-rail";
import { ShareRow } from "../components/sundai/share-row";
import { PrevNext } from "../components/sundai/prev-next";
import { Colophon } from "../components/sundai/colophon";
import { SmoothScroll } from "../components/sundai/smooth-scroll";
import { LinkedinLogoIcon } from "@phosphor-icons/react";

const bodies = import.meta.glob<string>("../content/bodies/*.ts", { import: "default" });

export const Route = createFileRoute("/articles/$slug")({
  loader: async ({ params }) => {
    let slug = params.slug;
    // Legacy URLs from the old static site end in .html; keep them working.
    if (slug.endsWith(".html")) {
      throw redirect({ to: "/articles/$slug", params: { slug: slug.slice(0, -5) }, statusCode: 301 });
    }
    const meta = articleBySlug.get(slug);
    const load = bodies[`../content/bodies/${slug}.ts`];
    if (!meta || !load) throw notFound();
    const { html, toc } = withAnchors(await load());
    const i = articles.findIndex((a) => a.slug === slug);
    return {
      meta,
      html,
      toc,
      prev: i > 0 ? articles[i - 1] : null,
      next: i < articles.length - 1 ? articles[i + 1] : null,
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.meta.title} | The New Sundai` },
          { name: "description", content: loaderData.meta.description },
          { property: "og:title", content: loaderData.meta.title },
          { property: "og:description", content: loaderData.meta.description },
          { property: "og:type", content: "article" },
          { property: "og:image", content: loaderData.meta.headerImage },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:image", content: loaderData.meta.headerImage },
        ]
      : [],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { meta, html, toc, prev, next } = Route.useLoaderData() as {
    meta: (typeof articles)[number];
    html: string;
    toc: TocItem[];
    prev: (typeof articles)[number] | null;
    next: (typeof articles)[number] | null;
  };

  return (
    <div className="sundai min-h-dvh">
      <SmoothScroll />
      <FolioBar week={meta.week} displayDate={meta.displayDate} />

      <main className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 justify-center gap-16 xl:grid-cols-[200px_minmax(0,760px)]">
          <aside className="hidden xl:block">
            <MarginRail items={toc} />
          </aside>

          <article className="w-full max-w-[760px] pb-24 pt-14">
            {/* Print-first header: type on paper, image after */}
            <header>
              <h1 className="font-display text-[clamp(2.125rem,4vw,3.25rem)] font-[550] leading-[1.12] tracking-tight text-ink">
                {meta.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 border-y border-hairline py-3 font-ui text-sm text-inkmuted">
                <span>By {meta.author}</span>
                <span className="border-l border-hairline pl-4">{meta.displayDate}</span>
                <span className="border-l border-hairline pl-4">{meta.readTime} read</span>
              </div>
              <figure className="mt-8 sm:-mx-[5%]">
                <img
                  src={meta.headerImage}
                  alt=""
                  width={1200}
                  height={800}
                  fetchPriority="high"
                  className="w-full border border-hairline"
                />
                <figcaption className="mt-2 px-1 font-ui text-xs text-inkmuted sm:mx-[5%] sm:px-0">
                  Feature plate for Issue No. {String(meta.week).padStart(2, "0")}.
                </figcaption>
              </figure>
            </header>

            {/* Migrated body */}
            <div className="prose-sundai mt-10" dangerouslySetInnerHTML={{ __html: html }} />

            {/* End matter */}
            <div className="mt-14 space-y-10 border-t border-hairline pt-8">
              {meta.hashtags.length > 0 && (
                <p className="font-ui text-sm text-inkmuted">
                  <span className="slug mr-3 text-ink">Filed under</span>
                  {meta.hashtags.join(", ")}
                </p>
              )}

              <ShareRow title={meta.title} />

              <div className="flex items-center gap-5 border border-hairline p-6">
                <img
                  src="/assets/owl-glyph.jpg"
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                  className="h-14 w-14 border border-hairline object-cover"
                />
                <div className="min-w-0">
                  <p className="font-display text-lg font-[550] text-ink">{meta.author}</p>
                  <p className="font-ui text-sm text-inkmuted">
                    Global EVP MarTech AI Transformation, Monks. The New Sundai lands every
                    Sunday morning.
                  </p>
                </div>
                <a
                  href="https://www.linkedin.com/in/remcovroom/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Remco Vroom on LinkedIn"
                  className="ml-auto text-inkmuted transition-colors hover:text-rubric"
                >
                  <LinkedinLogoIcon size={22} />
                </a>
              </div>

              <PrevNext prev={prev} next={next} />
            </div>
          </article>
        </div>
      </main>

      <Colophon />
    </div>
  );
}
