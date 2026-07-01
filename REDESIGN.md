# THE NEW SUNDAI — Analysis & Redesign

## Part 1 — Analysis of the current SUNDAI project

### What it is
**SundAI Motivation** (`remgm/sundai-motivation`) is a hand-rolled static site served on GitHub Pages: a weekly Sunday AI briefing for business leaders by **Remco Vroom** (Global EVP MarTech AI Transformation, Monks), fronted by "Rem," an owl mascot. Content: an opening welcome plus 18 weekly articles (Weeks 1–19, week 15 skipped; two week-18 issues), each 1,500–2,500 words.

### Architecture (before)
- **Stack:** zero-build vanilla HTML/CSS/JS. One `index.html` landing page + 19 article pages duplicated in both the repo root and `/articles/` (only `/articles/` is linked).
- **Content model:** article metadata (title, publish date, read time, header image, slug) is hard-coded in an array inside `app.js`; cards are injected client-side, with a client-side "publish on/after date" gate — articles are invisible to crawlers and RSS, and the whole index breaks with JS disabled.
- **CSS:** four stylesheets (`base`, `style`, `components`, `article`) with a decent token system (fluid type scale, 4px spacing, dark/light themes) — but the design language is a recognizable 2024 template: near-black `#0A0A0F`, teal `#00C2CC` accent, Sora + Inter, glassmorphism nav, card grid, count-up stats.
- **Images:** header JPGs in `assets/headers/`, but also ~170KB of dead base64 image-data across 13 orphaned `img-*.js` "patch" files loaded on every page — legacy of a previous image-injection approach that the plain `<img>` tags have since replaced.
- **Article anatomy (consistent across all 19):** lead paragraph → "This Week in AI" placeholder callout → Deep Dive (Simple Version / Context / Analogy / What This Means / One Action) → Monks case-study block (`monks-story`) → action callout → series footer + hashtags → share row (LinkedIn / X / copy). Inline `<script>` per article duplicates nav/theme/progress/share logic 19 times.

### What was worth keeping
- The content itself — consistent, well-structured, executive-focused long-form.
- The weekly-issue cadence (week numbers are a brand asset — a publication, not a blog).
- The owl mascot and the author's authority framing.
- The article anatomy (lead / deep-dive / case study / one action) — it deserved first-class components instead of shared CSS classes.

### What had to go
- No build system, no SSR, no per-article SEO control, JS-injected index, dead code weight, duplicated page scripts, template-era visual language, and a design that renders identically for a CFO and a random SaaS landing page.

## Part 2 — The redesign (THE NEW SUNDAI)

Three competing art directions were developed independently (an editorial broadsheet, a cinematic "night observatory," and a bold Swiss-manual system) and scored by a design-director pass on distinctiveness, C-suite fit, feasibility, and anti-AI-tell compliance. The winner, with grafts from the runners-up:

### Design direction: "Sunday Ink" — the broadsheet
The site relaunches as a **Sunday newspaper for the AI age** — the opposite of the old dark-tech template, and native to what the content actually is: a weekly issue-numbered publication.

- **Theme:** light, print-emulating, locked sitewide. Paper `#F7F7F4`, panel `#EFEFEA`, ink `#1A1B1E`, hairlines `#D9D9D3`, and a single accent: **Rubric Red `#B0321F`** (the 150-year-old newspaper red). No gradients, no glassmorphism, radius 0 everywhere — rules and boxes, never rounded cards.
- **Typography:** **Newsreader** (variable optical sizing: display cuts for the masthead and headlines, text cut for 19px/1.7 article prose), **Libre Franklin** for all UI/labels (the Franklin Gothic newspaper lineage), **Spline Sans Mono** strictly for figures — issue numbers, dates, stat captions. Self-hosted via Fontsource.
- **Structure:** masthead plate ("THE NEW" over a giant "SUNDAI" with a real folio line), an asymmetric 8/4 front-page lead, **the archive as a contents spread** — the 19 issues grouped into the series' three narrative parts (The Wake-Up Call / Getting Started / The Agentic Shift), each with a section front and a newspaper index with oversized week numerals and a fixed hover-preview slot. A ruled "State of Play" figures band (2fr/1fr/1fr/1fr, dominant stat underlined in red), a letter-style "From the Publisher's Desk," and a subscription coupon.
- **Signature effect:** the **Light-Table Reveal** — the front-page hero photo of Rem sits over a perfectly registered copperplate-engraving "printing plate" of the same image; pointer movement dissolves a soft circular window through the photo to the plate beneath, like holding the page up to the light. Pure CSS mask driven by two GSAP quickTo tweens; static photo under reduced motion.
- **Motion plan (restrained, motivated):** one-time masthead ink-in (split-type + GSAP), blur-free 4px scroll reveals, one-shot NumberFlow figure rolls, duotone-to-color image hovers, a rubric-red reading-progress rule on articles, Lenis smooth scroll on fine pointers. No marquees, no parallax, no scroll hijack, everything `prefers-reduced-motion`-gated.
- **Article page:** print-first (type before image), sticky folio bar with issue number, an xl-viewport margin rail indexing the Deep Dive's recurring slugs, drop-cap lead, "This Week in AI" as a news-brief sidebox, Monks case studies as "Case in point" insets, the action box as "The Monday Action," hashtags reset as a "Filed under" line, and giant-numeral prev/next "Continued next Sunday" panels.

### Higgsfield asset pipeline (all bespoke, ~230 credits)
- **Hero (4:5)** — editorial photograph of the owl on a stack of Sunday papers at dawn, generated with `nano_banana` using the original `rem-hero.jpg` as identity reference; **plate layer** re-rendered from the finished hero as a registered copperplate engraving for the reveal effect.
- **Mascot** — copperplate-engraving portrait of Rem (nav glyph, favicon, publisher portrait).
- **19 article headers (3:2)** — one series: a unique print-era still-life metaphor per issue (the owl-shaped lamp shadow for Shadow AI, a balance scale for ROI, nineteen chess pawns with one turned for agents-hiring-humans…), all sharing a byte-identical style suffix — off-white seamless paper, ink-black palette, exactly one vermilion accent, upper-left studio light, halftone grain.
- **Ambient video (8s, 1080p)** — macro slow-motion of newsprint on printing-press rollers (`seedance_2_0`), used at 12% opacity behind the subscription coupon, lazy-mounted and reduced-motion-gated.
- **OG image + favicon** — derived crops, optimized with Pillow (all imagery re-encoded to ~100–250KB progressive JPEGs).

## Part 3 — Where things live now

- **New site source:** `thenewsundai/` in this branch (React 19 + TanStack Start, SSR on a Cloudflare Worker, Tailwind v4).
- **Content pipeline:** all 19 articles were extracted from the legacy HTML into structured TypeScript modules (`thenewsundai/src/content/`) with metadata, lead, hashtags, and body HTML preserved verbatim.
- **Bespoke media:** hero image, ambient hero video loop, 19 article headers, and OG image generated with Higgsfield (image: `nano_banana_pro` with the original owl as identity reference; video: `seedance_2_0`), downloaded into `thenewsundai/public/`.
- **Live deployment:** built and launched on Higgsfield's website platform (its own git repo + Cloudflare Worker).

| What | Where |
|---|---|
| Live site (production) | https://warm-vapor-661.higgsfield.app |
| Preview environment | https://preview--warm-vapor-661.higgsfield.app |
| New source repo | Higgsfield website platform repo `warm-vapor-661` (THENEWSUNDAI), mirrored in `thenewsundai/` here |
| Legacy URLs | `/articles/<slug>.html` 301-redirect to `/articles/<slug>` on the new site |

Note: this session's GitHub access is scoped to `remgm/sundai-motivation`, so the new repo could not be created under GitHub directly; the launch repo lives on Higgsfield's platform and its full source is mirrored in this branch under `thenewsundai/`.
