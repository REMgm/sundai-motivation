import { Reveal } from "./reveal";

/** From the Publisher's Desk: engraved portrait beside a letter from the editor. */
export function PublisherDesk() {
  return (
    <section id="publisher" className="border-t border-hairline">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 py-20 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <img
            src="/assets/owl-plate.jpg"
            alt="Engraved portrait of Rem, the Sundai owl"
            width={800}
            height={800}
            loading="lazy"
            className="w-full border border-hairline"
          />
          <p className="mt-3 font-ui text-xs text-inkmuted">
            Rem, the Sundai owl. Engraved plate, publisher's mark since issue one.
          </p>
        </Reveal>
        <Reveal className="md:col-span-7" delay={0.08}>
          <h2 className="font-display text-3xl font-[550] tracking-tight text-ink">
            From the publisher's desk
          </h2>
          <div className="mt-8 max-w-[62ch] font-display text-lg leading-[1.7] text-ink">
            <p className="first-letter:float-left first-letter:pr-2 first-letter:font-display first-letter:text-6xl first-letter:font-[560] first-letter:leading-[0.85]">
              With three decades at the intersection of marketing and technology, I have
              learned that the hardest part of AI is not the technology. It is the
              translation. Boards do not need another demo. They need to know what this
              means for their business, in language they can act on.
            </p>
            <p className="mt-5">
              That is what this paper is for. Every Sunday I write one briefing for
              leaders who are serious about AI but have no time for the noise. No
              jargon. No hype. Just the signal you need to make better decisions in the
              week ahead.
            </p>
            <p className="mt-5">
              I lead MarTech AI transformation globally at Monks, where 6,500 of us
              build this future with clients every day. The briefings draw on that
              work, and on the conversations I keep having with CEOs, CFOs, and CMOs
              who are smart, capable, and quietly worried they are already behind.
            </p>
            <p className="mt-5">They are not behind. They just need a paper worth reading.</p>
          </div>
          <p className="mt-8 font-display text-2xl italic text-ink">Remco Vroom</p>
          <p className="mt-1 font-ui text-sm text-inkmuted">
            Global EVP MarTech AI Transformation, Monks
          </p>
        </Reveal>
      </div>
    </section>
  );
}
