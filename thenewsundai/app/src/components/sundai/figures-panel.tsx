import { NumberRoll } from "./number-roll";

/**
 * The State of Play: a print figures band. Asymmetric 2fr/1fr/1fr/1fr,
 * the dominant figure underlined in rubric red, vertical hairlines only.
 */
const MINOR_FIGURES = [
  {
    value: 81,
    suffix: "",
    caption: "notable AI models released in 2024, up from 11 in 2020",
  },
  {
    value: 87,
    suffix: "%",
    caption: "of workers already use AI every week",
  },
  {
    value: 74,
    suffix: "%",
    caption: "of CEOs fear falling behind on AI",
  },
];

export function FiguresPanel() {
  return (
    <section aria-label="The state of play" className="border-t border-hairline bg-panel">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        <h2 className="font-display text-3xl font-[550] tracking-tight text-ink">
          The state of play
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-0">
          <div className="md:pr-10">
            <p className="font-display text-7xl font-[550] leading-none text-ink md:text-8xl">
              <NumberRoll value={70} />
              <span className="text-rubric">%</span>
            </p>
            <div className="mt-3 h-0.5 w-24 bg-rubric" aria-hidden="true" />
            <p className="mt-4 max-w-xs font-ui text-base leading-relaxed text-inkmuted">
              of digital transformations fail. Not because the technology is not
              ready, but because leadership, culture, and strategy are not aligned.
            </p>
          </div>
          {MINOR_FIGURES.map((f) => (
            <div
              key={f.caption}
              className="border-hairline md:border-l md:px-8"
            >
              <p className="font-display text-5xl font-[550] leading-none text-ink">
                <NumberRoll value={f.value} />
                {f.suffix}
              </p>
              <p className="mt-4 font-ui text-sm leading-relaxed text-inkmuted">{f.caption}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 font-figures text-xs text-inkmuted">
          Figures as cited across the series, from the Stanford AI Index and executive
          surveys, 2024 to 2026.
        </p>
      </div>
    </section>
  );
}
