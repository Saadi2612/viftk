import { Reveal } from "../reveal";

const WORK = [
  {
    client: "NORTHWIND LOGISTICS",
    title: "A control tower for global freight operations",
    metrics: [
      { v: "+240%", l: "operator throughput" },
      { v: "−63%", l: "incident response time" },
    ],
    tags: ["Platform", "Realtime", "Design System"],
    gradient:
      "linear-gradient(135deg, oklch(0.564 0.197 261.5) 0%, oklch(0.35 0.15 270) 100%)",
  },
  {
    client: "HELIOS HEALTH",
    title: "Clinician-first records, rebuilt from scratch",
    metrics: [
      { v: "12 min", l: "saved per patient" },
      { v: "98", l: "NPS at rollout" },
    ],
    tags: ["Product", "Mobile", "HIPAA"],
    gradient:
      "linear-gradient(135deg, oklch(0.7 0.13 200) 0%, oklch(0.4 0.1 220) 100%)",
  },
  {
    client: "ATLAS FINANCE",
    title: "An AI copilot for portfolio analysts",
    metrics: [
      { v: "4×", l: "research throughput" },
      { v: "$2.1M", l: "annual cost saved" },
    ],
    tags: ["AI", "Enterprise", "Audit-ready"],
    gradient:
      "linear-gradient(135deg, oklch(0.25 0.05 260) 0%, oklch(0.15 0.03 260) 100%)",
  },
];

export function Work() {
  return (
    <section id="work" className="border-t border-border py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-4">// Selected work</p>
          <h2 className="max-w-2xl text-4xl md:text-5xl">
            Outcomes our clients still talk about.
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-6">
          {WORK.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <a
                href="#contact"
                className="group block overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="grid md:grid-cols-2">
                  <div className="aspect-[4/3] overflow-hidden md:aspect-auto">
                    <div
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                      style={{ background: w.gradient }}
                    />
                  </div>
                  <div className="flex flex-col justify-between p-8 md:p-12">
                    <div>
                      <p className="eyebrow">{w.client}</p>
                      <h3 className="mt-4 text-2xl md:text-3xl">
                        <span className="relative inline-block">
                          {w.title}
                          <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                        </span>
                      </h3>
                    </div>

                    <div className="mt-10">
                      <div className="flex flex-wrap gap-x-10 gap-y-4">
                        {w.metrics.map((m) => (
                          <div key={m.l}>
                            <div className="text-3xl font-semibold tracking-tight text-primary">
                              {m.v}
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">{m.l}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {w.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
