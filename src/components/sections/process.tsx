import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
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

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Explicit keyframes lock each step at its final value — no extrapolation drift
  const s0O = useTransform(scrollYProgress, [0, 0.25, 1],       [0, 1, 1]);
  const s1O = useTransform(scrollYProgress, [0, 0.25, 0.5, 1],  [0, 0, 1, 1]);
  const s2O = useTransform(scrollYProgress, [0, 0.5, 0.75, 1],  [0, 0, 1, 1]);
  const s3O = useTransform(scrollYProgress, [0, 0.75, 1],       [0, 0, 1]);

  const s0S = useTransform(scrollYProgress, [0, 0.25, 1],       [0.93, 1, 1]);
  const s1S = useTransform(scrollYProgress, [0, 0.25, 0.5, 1],  [0.93, 0.93, 1, 1]);
  const s2S = useTransform(scrollYProgress, [0, 0.5, 0.75, 1],  [0.93, 0.93, 1, 1]);
  const s3S = useTransform(scrollYProgress, [0, 0.75, 1],       [0.93, 0.93, 1]);

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
