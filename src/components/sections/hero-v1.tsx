"use client";

import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";

const LOGOS = ["NORTHWIND", "HELIOS", "ATLAS", "ORBIT", "MERIDIAN"];
const HEADLINE_LINE_1 = ["We", "build", "software"];
const HEADLINE_LINE_2 = ["that", "feels", "inevitable."];

// Resolves --color-primary to an rgb triplet for canvas use
function getPrimaryRGB(el: HTMLElement): [number, number, number] {
  const raw = getComputedStyle(el).getPropertyValue("--primary").trim();
  // oklch — convert via a temporary element
  const tmp = document.createElement("div");
  tmp.style.color = raw;
  tmp.style.position = "absolute";
  tmp.style.opacity = "0";
  document.body.appendChild(tmp);
  const rgb = getComputedStyle(tmp).color; // "rgb(r, g, b)"
  document.body.removeChild(tmp);
  const m = rgb.match(/(\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return [46, 107, 230];
  return [+m[1], +m[2], +m[3]];
}

export function HeroV1() {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // pointer parallax for subtle orb (kept, much lighter)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 50, damping: 20, mass: 0.6 });
  const orbX = useTransform(sx, (v) => v * 20);
  const orbY = useTransform(sy, (v) => v * 20);

  // cursor position for canvas (normalized -1..1)
  const cursorRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    // Skip the interactive ripple on touch/coarse-pointer devices: no cursor to
    // drive it, and it's the single most expensive thing in the hero. Mobile
    // just gets the cheap static dot grid.
    const finePointer =
      typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
    const animate = !reduce && finePointer;

    // Cap DPR — retina (2x) quadruples pixel fill cost for a faint dot grid.
    const dpr = Math.min(typeof devicePixelRatio === "number" ? devicePixelRatio : 1, 1.5);

    let raf = 0;
    let rgb: [number, number, number] = [46, 107, 230];

    const SPACING = 36;
    const DOT_R = 1.1;
    const RIPPLE_RADIUS = 130;
    const RIPPLE_STRENGTH = 18;
    const RIPPLE_RADIUS2 = RIPPLE_RADIUS * RIPPLE_RADIUS;

    type Dot = {
      bx: number;
      by: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      fade: number; // static center-fade, computed once per resize
    };
    let dots: Dot[] = [];
    let W = 0,
      H = 0;

    function buildDots() {
      dots = [];
      const cols = Math.ceil(W / SPACING) + 2;
      const rows = Math.ceil(H / SPACING) + 2;
      const maxDist = Math.hypot(W / 2, H / 2) || 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = (c - 0.5) * SPACING;
          const by = (r - 0.5) * SPACING;
          const distCenter = Math.hypot(bx - W / 2, by - H / 2);
          const fade = Math.max(0, 1 - (distCenter / maxDist) * 1.35);
          dots.push({ bx, by, x: bx, y: by, vx: 0, vy: 0, fade });
        }
      }
    }

    function resize() {
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
      if (!animate) drawStatic();
    }

    function drawStatic() {
      ctx.clearRect(0, 0, W, H);
      for (const d of dots) {
        const alpha = d.fade * 0.13;
        if (alpha < 0.01) continue;
        ctx.beginPath();
        ctx.arc(d.bx, d.by, DOT_R, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
        ctx.fill();
      }
    }

    const cx = cursorRef.current;

    function draw() {
      cx.x += (cx.tx - cx.x) * 0.08;
      cx.y += (cx.ty - cx.y) * 0.08;

      ctx.clearRect(0, 0, W, H);

      for (const d of dots) {
        const dx = d.bx - cx.x;
        const dy = d.by - cx.y;
        const dist2 = dx * dx + dy * dy;
        let px = 0,
          py = 0;
        let proxGlow = 0;
        if (dist2 < RIPPLE_RADIUS2 && dist2 > 0.01) {
          const distCursor = Math.sqrt(dist2);
          const k = 1 - distCursor / RIPPLE_RADIUS;
          const force = k * k * RIPPLE_STRENGTH;
          px = (dx / distCursor) * force;
          py = (dy / distCursor) * force;
          proxGlow = k * 0.55;
        }

        const ax = (d.bx + px - d.x) * 0.18 - d.vx * 0.55;
        const ay = (d.by + py - d.y) * 0.18 - d.vy * 0.55;
        d.vx += ax;
        d.vy += ay;
        d.x += d.vx;
        d.y += d.vy;

        const baseAlpha = d.fade * (0.13 + proxGlow);
        if (baseAlpha < 0.01) continue;

        ctx.beginPath();
        const r = DOT_R + proxGlow * 1.8;
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${baseAlpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    rgb = getPrimaryRGB(canvas);

    // Pause the rAF loop whenever the hero is scrolled out of view.
    let io: IntersectionObserver | null = null;
    let onMove: ((e: PointerEvent) => void) | null = null;

    if (animate) {
      onMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        cx.tx = e.clientX - rect.left;
        cx.ty = e.clientY - rect.top;
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !raf) {
            raf = requestAnimationFrame(draw);
          } else if (!entry.isIntersecting && raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
        },
        { threshold: 0 },
      );
      io.observe(canvas);
    } else {
      drawStatic();
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
      if (onMove) window.removeEventListener("pointermove", onMove);
    };
  }, [reduce, mx, my]);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center pt-24"
      style={{ zIndex: 1 }}
    >
      {/* Canvas blueprint grid */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: reduce ? 0.7 : 1 }}
      />

      {/* Subtle radial vignette — keeps centre readable */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 30%, var(--color-background) 100%)",
        }}
      />

      {/* Single light orb — much subtler than original */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[600px] w-[600px]"
          style={{ x: orbX, y: orbY }}
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background: "var(--color-primary)",
              filter: "blur(180px)",
              opacity: 0.07,
            }}
          />
        </motion.div>
      )}

      <div className="container-x relative z-10 flex w-full flex-col items-center text-center">
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
                // global word index across both lines, for staggered delay
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
                    <span
                      className={`hero-word ${isAccent ? "text-white dark:text-black relative px-1" : ""}`}
                      style={
                        {
                          "--word-delay": `${0.2 + wordIndex * 0.06}s`,
                          ...(isAccent ? { zIndex: 1 } : {}),
                        } as CSSProperties
                      }
                    >
                      {word}
                      {/* {isAccent ? (
                        <motion.span
                          initial={{ color: "#0a0a0a" }}
                          animate={{
                            color: "#ffffff",
                            transition: { delay: 0.3, duration: 0.2, ease: "easeInOut" },
                          }}
                        >
                          {word}
                        </motion.span>
                      ) : (
                        word
                      )} */}
                    </span>
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

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
            className="group inline-flex h-12 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_20px_50px_-15px_color-mix(in_oklab,var(--color-primary)_55%,transparent)] transition-all hover:-translate-y-0.5 hover:bg-(--color-primary-hover) hover:shadow-[0_28px_60px_-15px_color-mix(in_oklab,var(--color-primary)_65%,transparent)] active:translate-y-0 active:scale-[0.98]"
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
    </section>
  );
}
