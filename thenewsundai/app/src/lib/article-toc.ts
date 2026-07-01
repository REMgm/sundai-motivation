/**
 * Server-safe transform for migrated article HTML: injects anchor ids into
 * h3/h4 headings and returns the h4 run-in slugs as the margin-rail TOC.
 */
export interface TocItem {
  id: string;
  label: string;
}

function slugify(text: string, used: Set<string>): string {
  const base =
    text
      .toLowerCase()
      .replace(/&[a-z]+;/g, " ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "section";
  let id = base;
  let n = 2;
  while (used.has(id)) id = `${base}-${n++}`;
  used.add(id);
  return id;
}

export function withAnchors(html: string): { html: string; toc: TocItem[] } {
  const used = new Set<string>();
  const toc: TocItem[] = [];
  const out = html.replace(/<(h[34])>([\s\S]*?)<\/\1>/g, (_m, tag: string, inner: string) => {
    const label = inner.replace(/<[^>]+>/g, "").trim();
    const id = slugify(label, used);
    if (tag === "h4" && toc.length < 6) toc.push({ id, label });
    return `<${tag} id="${id}">${inner}</${tag}>`;
  });
  return { html: out, toc };
}
