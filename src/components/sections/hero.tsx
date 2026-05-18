import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

const LOGOS = ["NORTHWIND", "HELIOS", "ATLAS", "ORBIT", "MERIDIAN"];

const HEADLINE_LINE_1 = ["We", "build", "software"];
const HEADLINE_LINE_2 = ["that", "feels", "inevitable."];

export function Hero() {
  const reduce = useReducedMotion();

  // pointer parallax (disabled when prefers-reduced-motion)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 50, damping: 20, mass: 0.6 });
  const orb1X = useTransform(sx, (v) => v * 30);
  const orb1Y = useTransform(sy, (v) => v * 30);
  const orb2X = useTransform(sx, (v) => v * -40);
  const orb2Y = useTransform(sy, (v) => v * -40);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  const wordContainer = {
    hidden: {},
    visible: {
      transition: reduce
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.06, delayChildren: 0.15 },
    },
  };

  const wordChild = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, y: "0.5em", filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: reduce ? 0.3 : 0.85,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24"
    >
      {/* mesh gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, color-mix(in oklab, var(--color-primary) 14%, transparent), transparent 45%), radial-gradient(circle at 20% 80%, color-mix(in oklab, var(--color-primary) 10%, transparent), transparent 45%)",
        }}
      />
      {/* dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(ellipse at center, black 45%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 45%, transparent 80%)",
        }}
      />

      {/* floating orbs */}
      <motion.div
        aria-hidden
        animate={
          reduce
            ? undefined
            : { y: [0, -30, 0], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/4 -right-24 h-[500px] w-[500px] rounded-full opacity-25"
        style={{
          background: "var(--color-primary)",
          filter: "blur(140px)",
          x: reduce ? 0 : orb1X,
          y: reduce ? 0 : orb1Y,
        }}
      />
      <motion.div
        aria-hidden
        animate={
          reduce
            ? undefined
            : { y: [0, 30, 0], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-24 -left-24 h-[500px] w-[500px] rounded-full opacity-20"
        style={{
          background: "var(--color-primary)",
          filter: "blur(140px)",
          x: reduce ? 0 : orb2X,
          y: reduce ? 0 : orb2Y,
        }}
      />

      {/* subtle grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="container-x relative z-10 flex w-full flex-col items-center text-center">
        {/* glass eyebrow pill */}
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

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={wordContainer}
          className="max-w-5xl font-semibold tracking-tight"
          style={{ fontSize: "clamp(48px, 8.5vw, 96px)", lineHeight: 1.02, letterSpacing: "-0.03em" }}
        >
          {[HEADLINE_LINE_1, HEADLINE_LINE_2].map((line, li) => (
            <span key={li} className="block">
              {line.map((word, i) => {
                const isAccent = li === 1 && i === line.length - 1;
                return (
                  <span
                    key={i}
                    className="inline-block overflow-hidden align-baseline"
                    style={{ marginRight: i === line.length - 1 ? 0 : "0.25em" }}
                  >
                    <motion.span
                      variants={wordChild}
                      className={`inline-block will-change-transform ${
                        isAccent ? "text-primary" : ""
                      }`}
                      style={
                        isAccent
                          ? {
                              filter:
                                "drop-shadow(0 0 40px color-mix(in oklab, var(--color-primary) 45%, transparent))",
                            }
                          : undefined
                      }
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
          A focused studio designing and engineering products for ambitious teams —
          from first prototype to production scale.
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
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground/50"
      >
        <span
          className="font-mono text-[9px] font-semibold uppercase tracking-[0.4em]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="h-14 w-px origin-top bg-gradient-to-b from-border via-muted-foreground/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
