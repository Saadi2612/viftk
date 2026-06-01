"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const LOGOS = ["NORTHWIND", "HELIOS", "ATLAS", "ORBIT", "MERIDIAN"];

// Each word's unique scatter exit vector
const ALL_EXITS = [
  { x: "-120%", y: "-80%" }, // We → top-left
  { x: "0%", y: "-140%" }, // build → up
  { x: "120%", y: "-80%" }, // software → top-right
  { x: "-140%", y: "60%" }, // that → left-down
  { x: "0%", y: "120%" }, // feels → down
  { x: "160%", y: "50%" }, // inevitable. → right-down
];

const HEADLINE_LINE_1 = ["We", "build", "software"];
const HEADLINE_LINE_2 = ["that", "feels", "inevitable."];

export function HeroV2() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 50, damping: 20, mass: 0.6 });
  const orb1X = useTransform(sx, (v) => v * 30);
  const orb1Y = useTransform(sy, (v) => v * 30);
  const orb2X = useTransform(sx, (v) => v * -40);
  const orb2Y = useTransform(sy, (v) => v * -40);

  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.65], [1, 1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.65], [1, 0.92]);

  // Pre-compute per-word scroll transforms at top level (rules of hooks)
  const w0x = useTransform(scrollYProgress, [0.15, 0.55], ["0%", ALL_EXITS[0].x]);
  const w0y = useTransform(scrollYProgress, [0.15, 0.55], ["0%", ALL_EXITS[0].y]);
  const w1x = useTransform(scrollYProgress, [0.15, 0.55], ["0%", ALL_EXITS[1].x]);
  const w1y = useTransform(scrollYProgress, [0.15, 0.55], ["0%", ALL_EXITS[1].y]);
  const w2x = useTransform(scrollYProgress, [0.15, 0.55], ["0%", ALL_EXITS[2].x]);
  const w2y = useTransform(scrollYProgress, [0.15, 0.55], ["0%", ALL_EXITS[2].y]);
  const w3x = useTransform(scrollYProgress, [0.15, 0.55], ["0%", ALL_EXITS[3].x]);
  const w3y = useTransform(scrollYProgress, [0.15, 0.55], ["0%", ALL_EXITS[3].y]);
  const w4x = useTransform(scrollYProgress, [0.15, 0.55], ["0%", ALL_EXITS[4].x]);
  const w4y = useTransform(scrollYProgress, [0.15, 0.55], ["0%", ALL_EXITS[4].y]);
  const w5x = useTransform(scrollYProgress, [0.15, 0.55], ["0%", ALL_EXITS[5].x]);
  const w5y = useTransform(scrollYProgress, [0.15, 0.55], ["0%", ALL_EXITS[5].y]);
  const wordOpacity = useTransform(scrollYProgress, [0.1, 0.45], [1, 0]);

  const wordXY = [
    { x: w0x, y: w0y },
    { x: w1x, y: w1y },
    { x: w2x, y: w2y },
    { x: w3x, y: w3y },
    { x: w4x, y: w4y },
    { x: w5x, y: w5y },
  ];

  const wordContainer = {
    hidden: {},
    visible: {
      transition: reduce ? { staggerChildren: 0 } : { staggerChildren: 0.06, delayChildren: 0.15 },
    },
  };
  const wordChild = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: "0.5em", filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduce ? 0.3 : 0.85, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <div style={{ height: reduce ? "100vh" : "200vh" }} className="relative">
      <section
        ref={sectionRef}
        id="top"
        className="sticky top-0 flex min-h-screen items-center justify-center overflow-hidden pt-24"
        style={{ zIndex: 1 }}
      >
        {/* Mesh background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, color-mix(in oklab, var(--color-primary) 14%, transparent), transparent 45%), radial-gradient(circle at 20% 80%, color-mix(in oklab, var(--color-primary) 10%, transparent), transparent 45%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18] dark:opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle, var(--color-primary) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(ellipse at center, black 45%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 45%, transparent 80%)",
          }}
        />

        {/* Orbs */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/4 h-[500px] w-[500px]"
          style={{ x: reduce ? 0 : orb1X, y: reduce ? 0 : orb1Y }}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -30, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-full rounded-full opacity-25"
            style={{ background: "var(--color-primary)", filter: "blur(140px)" }}
          />
        </motion.div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-[500px] w-[500px]"
          style={{ x: reduce ? 0 : orb2X, y: reduce ? 0 : orb2Y }}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, 30, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-full rounded-full opacity-20"
            style={{ background: "var(--color-primary)", filter: "blur(140px)" }}
          />
        </motion.div>

        {/* Bottom bleed band */}
        <div
          aria-hidden
          className="hero-bleed hero-bleed-band"
          style={{
            bottom: "-180px",
            left: "0",
            width: "100%",
            height: "350px",
            background: "var(--color-primary)",
            filter: "blur(200px)",
            borderRadius: "0",
          }}
        />

        {/* Main content — global scale+opacity on scroll */}
        <motion.div
          className="container-x relative z-10 flex w-full flex-col items-center text-center"
          style={reduce ? undefined : { opacity: contentOpacity, scale: contentScale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/40 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-primary">
              Software Studio
            </span>
          </motion.div>

          {/* Headline — each word independently exits on scroll */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={wordContainer}
            className="max-w-5xl font-semibold tracking-tight"
            style={{
              fontSize: "clamp(48px, 8.5vw, 96px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            {[HEADLINE_LINE_1, HEADLINE_LINE_2].map((line, li) => (
              <span key={li} className="block">
                {line.map((word, wi) => {
                  const idx = li === 0 ? wi : HEADLINE_LINE_1.length + wi;
                  const isAccent = li === 1 && wi === line.length - 1;
                  const { x, y } = wordXY[idx];

                  return (
                    <span
                      key={wi}
                      className="inline-block overflow-visible align-baseline"
                      style={{ marginRight: wi === line.length - 1 ? 0 : "0.25em" }}
                    >
                      <motion.span
                        variants={wordChild}
                        className={`inline-block will-change-transform ${isAccent ? "text-primary" : ""}`}
                        style={{
                          x: reduce ? undefined : x,
                          y: reduce ? undefined : y,
                          opacity: reduce ? undefined : wordOpacity,
                          ...(isAccent
                            ? {
                                filter:
                                  "drop-shadow(0 0 40px color-mix(in oklab, var(--color-primary) 45%, transparent))",
                              }
                            : {}),
                        }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 max-w-[640px] text-lg text-muted-foreground md:text-xl"
          >
            A focused studio designing and engineering products for ambitious teams, from first
            prototype to production scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex h-12 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_20px_50px_-15px_color-mix(in_oklab,var(--color-primary)_55%,transparent)] transition-all hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] hover:shadow-[0_28px_60px_-15px_color-mix(in_oklab,var(--color-primary)_65%,transparent)] active:translate-y-0 active:scale-[0.98]"
            >
              Start a project
            </a>
            <a
              href="#work"
              className="inline-flex h-12 items-center gap-2 rounded-md border border-border bg-background/40 px-6 text-sm font-medium backdrop-blur-md transition-colors hover:border-primary/40 hover:bg-accent active:scale-[0.98]"
            >
              See our work <ArrowRight size={16} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 font-mono text-xs tracking-[0.18em] text-muted-foreground/60"
          >
            {LOGOS.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
