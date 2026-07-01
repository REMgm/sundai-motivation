import { Link } from "@tanstack/react-router";

const LINKS = [
  { href: "#archive", label: "Archive" },
  { href: "#publisher", label: "About" },
  { href: "#subscribe", label: "Subscribe" },
];

/** 64px single-line utility bar above the masthead plate. */
export function SiteNav() {
  return (
    <nav
      aria-label="Main navigation"
      className="border-b border-hairline bg-paper"
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <Link to="/" aria-label="The New Sundai front page" className="flex items-center gap-3">
          <img
            src="/assets/owl-glyph.jpg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 border border-hairline object-cover"
          />
          <span className="slug text-ink">The New Sundai</span>
        </Link>
        <ul className="flex items-center gap-7">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-ui text-sm font-medium text-inkmuted transition-colors hover:text-rubric"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
