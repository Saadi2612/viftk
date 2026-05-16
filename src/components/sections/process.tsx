import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "../reveal";

const STEPS = [
  { n: "01", title: "Discover", body: "Workshops and audits to map the problem space and pressure-test the brief." },
  { n: "02", title: "Design", body: "Interfaces, flows, and prototypes — opinionated, tested, and ready to build." },
  { n: "03", title: "Build", body: "Tight engineering loops with weekly demos and production-grade quality from day one." },
  { n: "04", title: "Launch", body: "Measured rollouts, observability, and ongoing iteration after the launch dust settles." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="border-t border-border py-32">
      <div className="container-x" ref={ref}>
        <Reveal>
          <p className="eyebrow mb-4">// Process</p>
          <h2 className="max-w-2xl text-4xl md:text-5xl">
            Four phases. No surprises.
          </h2>
        </Reveal>

        <div className="relative mt-20">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block" />
          <motion.div
            className="absolute left-0 top-6 hidden h-px bg-primary md:block"
            style={{ width }}
          />

          <div className="grid gap-12 md:grid-cols-4 md:gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="relative">
                  <div className="hidden md:block">
                    <span className="absolute -top-1 left-0 inline-block h-3 w-3 rounded-full bg-primary" />
                  </div>
                  <p className="mt-8 font-mono text-3xl text-primary">{s.n}</p>
                  <h3 className="mt-3 text-xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
