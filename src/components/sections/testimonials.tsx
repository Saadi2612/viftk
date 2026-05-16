import { Reveal } from "../reveal";

const STATS = [
  { v: "120+", l: "Projects shipped" },
  { v: "9", l: "Years in practice" },
  { v: "40+", l: "Active clients" },
  { v: "72", l: "NPS, trailing 12 mo" },
];

export function Testimonials() {
  return (
    <section id="about" className="border-t border-border py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-10">// What clients say</p>
          <blockquote
            className="max-w-4xl text-3xl font-medium leading-tight tracking-tight md:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            &ldquo;Stratosphere works like an extension of our team. They ship faster than
            our internal engineers and ask better questions than our consultants.&rdquo;
          </blockquote>
          <div className="mt-8 text-sm">
            <p className="font-medium">Mara Linden</p>
            <p className="text-muted-foreground">VP Product, Northwind Logistics</p>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.05}>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="text-4xl font-semibold tracking-tight">{s.v}</div>
                <div className="mt-2 text-xs text-muted-foreground">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
