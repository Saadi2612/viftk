"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from "motion/react";
import { Reveal } from "../reveal";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    body: "Workshops and audits to map the problem space and pressure-test the brief.",
  },
  {
    n: "02",
    title: "Design",
    body: "Interfaces, flows, and prototypes: opinionated, tested, and ready to build.",
  },
  {
    n: "03",
    title: "Build",
    body: "Tight engineering loops with weekly demos and production-grade quality from day one.",
  },
  {
    n: "04",
    title: "Launch",
    body: "Measured rollouts, observability, and ongoing iteration after the launch dust settles.",
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Wrapper is 300vh tall; section sticks at top for the full scroll distance.
  // scrollYProgress 0→1 spans 200vh of scroll (300vh − 100vh viewport).
  // Each of the 4 steps gets 25% of that range (~50vh per step).
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Latch: progress follows scrollYProgress upward only.
  // Resets to 0 when scrolled back above the section so re-entry animates cleanly.
  // This prevents scrollYProgress going backward past the section from fading steps.
  const progress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.01) progress.set(0);
    else if (v > progress.get()) progress.set(v);
  });

  const lineWidth = useTransform(progress, [0, 0.75], ["0%", "100%"]);

  const s0O = useTransform(progress, [0, 0.15], [0, 1]);
  const s1O = useTransform(progress, [0.15, 0.35], [0, 1]);
  const s2O = useTransform(progress, [0.35, 0.55], [0, 1]);
  const s3O = useTransform(progress, [0.55, 0.75], [0, 1]);

  const s0S = useTransform(progress, [0, 0.15], [0.93, 1]);
  const s1S = useTransform(progress, [0.15, 0.35], [0.93, 1]);
  const s2S = useTransform(progress, [0.35, 0.55], [0.93, 1]);
  const s3S = useTransform(progress, [0.55, 0.75], [0.93, 1]);

  const g0O = useTransform(s0O, [0, 1], [0, 0.06]);
  const g1O = useTransform(s1O, [0, 1], [0, 0.06]);
  const g2O = useTransform(s2O, [0, 1], [0, 0.06]);
  const g3O = useTransform(s3O, [0, 1], [0, 0.06]);

  const g0S = useTransform(s0S, [0.93, 1], [1.15, 1]);
  const g1S = useTransform(s1S, [0.93, 1], [1.15, 1]);
  const g2S = useTransform(s2S, [0.93, 1], [1.15, 1]);
  const g3S = useTransform(s3S, [0.93, 1], [1.15, 1]);

  const stepO = [s0O, s1O, s2O, s3O];
  const stepS = [s0S, s1S, s2S, s3S];
  const ghostO = [g0O, g1O, g2O, g3O];
  const ghostS = [g0S, g1S, g2S, g3S];

  return (
    <div ref={containerRef} style={{ height: "300vh" }}>
      <section
        id="process"
        className="border-t border-border sticky top-0 h-screen flex flex-col justify-center py-16"
      >
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-4">// Process</p>
            <h2 className="max-w-2xl text-balance text-4xl md:text-5xl">
              Four phases. No surprises.
            </h2>
          </Reveal>

          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block" />
            <motion.div
              className="absolute left-0 top-6 hidden h-px bg-primary md:block"
              style={{ width: lineWidth }}
            />

            <div className="process-steps-grid grid md:grid-cols-4">
              {STEPS.map((s, i) => (
                <motion.div key={s.n} style={{ opacity: stepO[i], scale: stepS[i] }}>
                  <div className="process-step">
                    <motion.span
                      className="process-step-ghost"
                      style={{ opacity: ghostO[i], scale: ghostS[i] }}
                    >
                      {s.n}
                    </motion.span>
                    <div className="process-step-content">
                      <p className="font-mono text-2xl text-primary">{s.n}</p>
                      <h3 className="mt-3 text-xl">{s.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
