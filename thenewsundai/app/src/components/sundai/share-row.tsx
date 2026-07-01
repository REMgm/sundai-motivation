import { useState } from "react";
import { LinkedinLogoIcon, XLogoIcon, LinkIcon, CheckIcon } from "@phosphor-icons/react";

const btn =
  "inline-flex items-center gap-2 border border-hairline px-4 py-2 font-ui text-sm font-semibold text-ink transition-colors hover:border-ink active:scale-[0.98]";

/** Share row at the article's foot: LinkedIn, X, copy link. */
export function ShareRow({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = (network: "linkedin" | "x") => {
    const url = encodeURIComponent(window.location.href);
    const target =
      network === "linkedin"
        ? `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        : `https://x.com/intent/tweet?url=${url}&text=${encodeURIComponent(title)}&hashtags=SundAIMotivation,AIforBusiness`;
    window.open(target, "_blank", "width=620,height=520,noopener");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; nothing to do.
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="slug text-inkmuted">Share this briefing</span>
      <button type="button" onClick={() => share("linkedin")} className={btn} aria-label="Share on LinkedIn">
        <LinkedinLogoIcon size={16} /> LinkedIn
      </button>
      <button type="button" onClick={() => share("x")} className={btn} aria-label="Share on X">
        <XLogoIcon size={16} /> Post
      </button>
      <button type="button" onClick={copy} className={btn} aria-label="Copy link">
        {copied ? <CheckIcon size={16} className="text-rubric" /> : <LinkIcon size={16} />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
