import { LinkedinLogoIcon } from "@phosphor-icons/react";

/** Colophon footer: small Franklin type, copyright, LinkedIn glyph. */
export function Colophon() {
  return (
    <footer className="border-t border-hairline bg-paper">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-8">
        <p className="font-ui text-sm text-inkmuted">
          &copy; 2026 Remco Vroom · The New Sundai
        </p>
        <a
          href="https://www.linkedin.com/in/remcovroom/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Remco Vroom on LinkedIn"
          className="text-inkmuted transition-colors hover:text-rubric"
        >
          <LinkedinLogoIcon size={20} weight="regular" />
        </a>
      </div>
    </footer>
  );
}
