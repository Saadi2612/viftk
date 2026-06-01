"use client";

import { ArrowRight } from "lucide-react";
import { Reveal } from "../reveal";

const WORK = [
  {
    client: "FOLIUM OPS SUITE",
    title: "One dashboard for people, assets, and ops. No tab-switching.",
    metrics: [
      { v: "3 hrs", l: "saved per manager, per week" },
      { v: "−68%", l: "admin overhead per manager" },
    ],
    tags: ["Ops", "Dashboard", "Enterprise"],
    img: "/work/folium-ops.png",
  },
  {
    client: "PROPFLOW",
    title: "Sales analytics that surface what actually matters",
    metrics: [
      { v: "+45%", l: "pipeline throughput in 90 days" },
      { v: "7×", l: "faster deal-stage visibility" },
    ],
    tags: ["Analytics", "Dashboard", "SaaS"],
    img: "/work/propflow-dashboard.png",
  },
  {
    client: "WHISPER",
    title: "Turning hours of video into minutes of insight",
    metrics: [
      { v: "10×", l: "faster content review" },
      { v: "95%+", l: "transcript accuracy" },
    ],
    tags: ["AI", "SaaS", "Productivity"],
    img: "/work/whisper.png",
  },
];

export function Work() {
  return (
    <section id="work" className="border-t border-border py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-4">// Selected work</p>
          <h2 className="max-w-2xl text-balance text-4xl md:text-5xl">
            Outcomes our clients still talk about.
          </h2>
        </Reveal>
        <div className="mt-16 flex flex-col v1-items">
          {WORK.map((w) => (
            <div key={w.title} className="group v3a-item">
              <div className="v1-img">
                <img
                  src={w.img}
                  alt={w.client}
                  className="h-full w-full object-cover object-top v1-img-inner"
                />
              </div>
              <div className="mt-8 grid md:grid-cols-2 gap-8 md:gap-16">
                <div>
                  <p className="eyebrow">{w.client}</p>
                  <h3 className="mt-3 text-2xl md:text-3xl leading-snug">{w.title}</h3>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex flex-wrap gap-x-8 gap-y-3">
                    {w.metrics.map((m) => (
                      <div key={m.l}>
                        <div className="text-3xl font-semibold tracking-tight text-primary tabular-nums">
                          {m.v}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">{m.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {w.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 shrink-0"
                    >
                      Start a similar project
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
