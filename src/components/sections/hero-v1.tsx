"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const LOGOS = ["NORTHWIND", "HELIOS", "ATLAS", "ORBIT", "MERIDIAN"];
const HEADLINE_LINE_1 = ["We", "build", "software"];
const HEADLINE_LINE_2 = ["that", "feels", "inevitable."];

// ---------------------------------------------------------------------------
// Lean canvas dot animation — desktop (pointer:fine) only
//   • SPACING 60px → ~4× fewer dots than the original 36px grid
//   • No velocity / spring physics — simple lerp, zero allocations
//   • fillStyle built ONCE at resize, never inside the draw loop
//   • DPR capped at 1 (no retina overdraw)
//   • IntersectionObserver pauses rAF when hero is off-screen
// ---------------------------------------------------------------------------
function useDotCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPACING = 30;
    const DOT_R = 1.2;
    const REPEL_R = 120;
    const REPEL_R2 = REPEL_R * REPEL_R;
    const REPEL_STRENGTH = 22;
    const LERP = 0.12;
    const BASE_ALPHA = 0.13;
    const GLOW_ALPHA = 0.55;

    type Dot = {
      bx: number;
      by: number;
      x: number;
      y: number;
      fade: number;
      color: string;
      glowColor: string;
    };

    let dots: Dot[] = [];
    let W = 0,
      H = 0;
    let raf = 0;
    let rgb = "46,107,230";

    // Paint 1×1 offscreen canvas to resolve any CSS color format (oklch, hsl, hex…)
    function resolveRGB() {
      const raw = getComputedStyle(canvas!).getPropertyValue("--color-primary").trim();
      if (!raw) return;
      const oc = document.createElement("canvas");
      oc.width = oc.height = 1;
      const oc2d = oc.getContext("2d");
      if (!oc2d) return;
      oc2d.fillStyle = raw;
      oc2d.fillRect(0, 0, 1, 1);
      const [r, g, b] = oc2d.getImageData(0, 0, 1, 1).data;
      if (r === 0 && g === 0 && b === 0) return;
      rgb = `${r},${g},${b}`;
    }

    function buildDots() {
      dots = [];
      const cols = Math.ceil(W / SPACING) + 2;
      const rows = Math.ceil(H / SPACING) + 2;
      const maxD = Math.hypot(W / 2, H / 2) || 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = (c - 0.5) * SPACING;
          const by = (r - 0.5) * SPACING;
          const fade = Math.max(0, 1 - (Math.hypot(bx - W / 2, by - H / 2) / maxD) * 1.3);
          if (fade < 0.02) continue;
          dots.push({
            bx,
            by,
            x: bx,
            y: by,
            fade,
            color: `rgba(${rgb},${(BASE_ALPHA * fade).toFixed(3)})`,
            glowColor: `rgba(${rgb},${(GLOW_ALPHA * fade).toFixed(3)})`,
          });
        }
      }
    }

    function resize() {
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width = W;
      canvas!.height = H;
      resolveRGB();
      buildDots();
    }

    let tx = -999,
      ty = -999;
    let cx = -999,
      cy = -999;

    function draw() {
      cx += (tx - cx) * LERP;
      cy += (ty - cy) * LERP;
      ctx!.clearRect(0, 0, W, H);

      for (const d of dots) {
        const dx = d.bx - cx;
        const dy = d.by - cy;
        const dist2 = dx * dx + dy * dy;
        let px = 0,
          py = 0;
        let isGlowing = false;

        if (dist2 < REPEL_R2 && dist2 > 0.1) {
          const dist = Math.sqrt(dist2);
          const k = 1 - dist / REPEL_R;
          const force = k * k * REPEL_STRENGTH;
          px = (dx / dist) * force;
          py = (dy / dist) * force;
          isGlowing = k > 0.25;
        }

        d.x += (d.bx + px - d.x) * 0.15;
        d.y += (d.by + py - d.y) * 0.15;

        ctx!.beginPath();
        ctx!.arc(d.x, d.y, isGlowing ? DOT_R + 1.2 : DOT_R, 0, Math.PI * 2);
        ctx!.fillStyle = isGlowing ? d.glowColor : d.color;
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
    };
    const onLeave = () => {
      tx = -999;
      ty = -999;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave, { passive: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !raf) raf = requestAnimationFrame(draw);
        else if (!entry.isIntersecting && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, canvasRef]);
}

export function HeroV1() {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useDotCanvas(canvasRef, !reduce);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center pt-24"
      style={{ zIndex: 1 }}
    >
      {/* Desktop: interactive canvas dot grid (pointer:fine only, no-op on mobile) */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* Mobile: static CSS dot grid — zero JS, no compositor layer */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 md:hidden",
          "[background-size:24px_24px]",
          "[background-image:radial-gradient(var(--color-primary,#6366f1)_1px,transparent_1px)]",
          "opacity-[0.13] dark:opacity-[0.09]",
        )}
      />

      {/* Radial vignette — solid bg with mask, no blur, no compositor cost */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_80%_70%_at_50%_45%,transparent_30%,black_100%)]"
      />

      {/*
        Orb — desktop only (md:block).
        blur(60px) forces a GPU compositing layer; hiding it on mobile
        removes that cost entirely on small screens.
      */}
      {!reduce && (
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2
                     h-[500px] w-[500px] hidden md:block"
        >
          <div
            className="h-full w-full rounded-full"
            style={{ background: "var(--color-primary)", filter: "blur(60px)", opacity: 0.06 }}
          />
        </div>
      )}

      <div className="container-x relative z-10 flex w-full flex-col items-center text-center">
        {/*
          Badge
          • Removed backdrop-blur — forced a compositor layer on every repaint
          • Mobile: solid bg-background (opaque = no blending cost)
          • Desktop: semi-transparent bg-background/60 is fine, no blur needed
          • animate-ping hidden on mobile (md:inline-flex) — saves a continuous
            CSS animation running on the UI thread
        */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 inline-flex items-center gap-2 rounded-full
                     border border-primary/15
                     bg-background md:bg-background/60
                     px-4 py-1.5"
        >
          <span className="relative flex h-1.5 w-1.5">
            {/* Ping animation — desktop only, saves continuous animation on mobile */}
            <span className="absolute hidden md:inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-primary">
            Software Studio
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          className="max-w-5xl font-semibold tracking-tight"
          style={{
            fontSize: "clamp(48px, 8.5vw, 96px)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
          }}
        >
          {[HEADLINE_LINE_1, HEADLINE_LINE_2].map((line, li) => (
            <span key={li} className="block">
              {line.map((word, i) => {
                const isAccent = li === 1 && i === line.length - 1;
                const wordIndex = li === 0 ? i : HEADLINE_LINE_1.length + i;
                return (
                  <motion.span
                    key={i}
                    className={`inline-block align-baseline ${isAccent ? "relative" : "overflow-hidden"}`}
                    style={{ marginRight: i === line.length - 1 ? 0 : "0.25em" }}
                    {...(isAccent
                      ? { initial: "hidden", animate: "visible", whileHover: "hovered" }
                      : {})}
                  >
                    {isAccent && (
                      <motion.span
                        aria-hidden
                        className="absolute bg-primary rounded-sm"
                        style={{ inset: "-2px -6px", zIndex: 0 }}
                        variants={{
                          hidden: { rotate: -1.5, opacity: 0, scaleX: 0.75 },
                          visible: {
                            rotate: -1.5,
                            opacity: 1,
                            scaleX: 1,
                            transition: { delay: 0.4, duration: 0.5 },
                          },
                          hovered: {
                            rotate: 0,
                            opacity: 1,
                            scaleX: 1,
                            transition: { duration: 0.1 },
                          },
                        }}
                      />
                    )}
                    <motion.span
                      className={isAccent ? "text-white dark:text-black relative px-1" : ""}
                      style={{ zIndex: isAccent ? 1 : undefined }}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + wordIndex * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 max-w-[640px] text-lg text-muted-foreground md:text-xl"
        >
          A focused studio designing and engineering products for ambitious teams, from first
          prototype to production scale.
        </motion.p>

        {/*
          CTAs
          • Primary button: unchanged — solid bg, no blur
          • Secondary button: removed backdrop-blur-md + bg-background/60
            Both forced a compositor layer. Replaced with solid bg-background
            on mobile, semi-transparent only on desktop (md:bg-background/60)
        */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#contact"
            className="group inline-flex h-12 items-center rounded-md bg-primary px-6
                       text-sm font-medium text-primary-foreground
                       shadow-[0_20px_50px_-15px_color-mix(in_oklab,var(--color-primary)_55%,transparent)]
                       transition-all hover:-translate-y-0.5 hover:bg-(--color-primary-hover)
                       hover:shadow-[0_28px_60px_-15px_color-mix(in_oklab,var(--color-primary)_65%,transparent)]
                       active:translate-y-0 active:scale-[0.98]"
          >
            Start a project
          </a>
          <a
            href="#work"
            className="inline-flex h-12 items-center gap-2 rounded-md
                       border border-border
                       bg-background md:bg-background/60
                       px-6 text-sm font-medium
                       transition-colors hover:border-primary/40 hover:bg-accent
                       active:scale-[0.98]"
          >
            See our work <ArrowRight size={16} />
          </a>
        </motion.div>

        {/* Logo strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4
                     font-mono text-xs tracking-[0.18em] text-muted-foreground/60"
        >
          {LOGOS.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
