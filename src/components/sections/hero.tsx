import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";

const LOGOS = ["NORTHWIND", "HELIOS", "ATLAS", "ORBIT", "MERIDIAN"];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />
      {/* blue glow bottom-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-primary) 35%, transparent), transparent 65%)",
        }}
      />

      <div className="container-x relative z-10 w-full">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow mb-8"
        >
          // Software Studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-5xl font-semibold tracking-tight"
          style={{ fontSize: "clamp(48px, 8vw, 84px)", lineHeight: 1.05 }}
        >
          We build software that feels inevitable.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-[600px] text-lg text-muted-foreground"
        >
          A focused studio designing and engineering products for ambitious teams —
          from first prototype to production scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#contact"
            className="inline-flex h-12 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-[var(--color-primary-hover)] active:scale-[0.98]"
          >
            Start a project
          </a>
          <a
            href="#work"
            className="inline-flex h-12 items-center gap-2 rounded-md border border-border bg-transparent px-6 text-sm font-medium hover:bg-accent active:scale-[0.98]"
          >
            See our work <ArrowRight size={16} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 flex flex-wrap items-center gap-x-10 gap-y-4 text-xs font-mono tracking-[0.18em] text-muted-foreground/70"
        >
          {LOGOS.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}
