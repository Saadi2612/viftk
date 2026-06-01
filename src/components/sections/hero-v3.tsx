"use client";

import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const LOGOS = ["NORTHWIND", "HELIOS", "ATLAS", "ORBIT", "MERIDIAN"];
const HEADLINE_LINE_1 = ["We", "build", "software"];
const HEADLINE_LINE_2 = ["that", "feels", "inevitable."];

// Vertex shader — fullscreen quad
const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Fragment shader — fbm turbulence rendered as a Compiler-Blue flow field.
// Composited normally (source-over): outputs blue with fbm-driven alpha, so
// it reads as luminous liquid blue over BOTH the light and dark themes.
const FRAG = `
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;    // 0..1
uniform float uIntensity; // overall alpha multiplier (theme-aware)

// 2D hash
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}

// Gradient noise
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                 dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
             mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                 dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
}

// Fractional Brownian Motion
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2  shift = vec2(100.0);
  mat2  rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p  = rot * p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = uv;
  p.x *= aspect;

  // mouse influence — subtle flow warp toward the cursor
  vec2 mouse = uMouse - 0.5;
  vec2 warped = p + mouse * 0.12;

  float t = uTime * 0.16;

  // domain-warped fbm — the "liquid under pressure" look
  vec2 q = vec2(fbm(warped * 2.2 + t),
                fbm(warped * 2.2 + vec2(5.2, 1.3) + t * 1.1));
  vec2 r = vec2(fbm(warped * 2.0 + 1.8 * q + vec2(1.7, 9.2) + t * 0.55),
                fbm(warped * 2.0 + 1.8 * q + vec2(8.3, 2.8) + t * 0.65));

  float f = fbm(warped * 2.6 + 1.6 * r);
  f = clamp(0.5 + 0.65 * f, 0.0, 1.0);

  // Compiler Blue ramp — brighter in the dense regions
  vec3 deep   = vec3(0.090, 0.180, 0.560); // deep compiler blue
  vec3 bright = vec3(0.255, 0.510, 1.000); // luminous blue highlight
  vec3 color  = mix(deep, bright, smoothstep(0.45, 0.95, f));

  // Cursor proximity bloom
  float md = distance(p, vec2(uMouse.x * aspect, uMouse.y));
  float bloom = smoothstep(0.45, 0.0, md) * 0.35;
  color += bright * bloom;

  // Radial vignette — fade to nothing at the edges so it blends into the page
  float vig = 1.0 - smoothstep(0.30, 0.95, length(uv - 0.5) * 1.45);

  // Alpha driven by flow density: transparent in the gaps, opaque in the ridges
  float density = smoothstep(0.40, 0.92, f);
  float alpha = density * vig * uIntensity;

  gl_FragColor = vec4(color, alpha);
}
`;

function useShaderCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>, disabled: boolean) {
  useEffect(() => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) {
      console.warn("[HeroV3] WebGL unavailable — falling back to CSS mesh.");
      return;
    }

    function compileShader(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        console.error("[HeroV3] shader compile failed:", gl!.getShaderInfoLog(s));
        gl!.deleteShader(s);
        return null;
      }
      return s;
    }

    const vs = compileShader(gl.VERTEX_SHADER, VERT);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("[HeroV3] program link failed:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // Fullscreen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uIntensity = gl.getUniformLocation(prog, "uIntensity");

    // Theme-aware intensity — louder on the dark surface, restrained on light
    const isDark = document.documentElement.classList.contains("dark");
    const intensity = isDark ? 0.85 : 0.55;

    let W = 0,
      H = 0;
    function resize() {
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width = W * Math.min(devicePixelRatio, 2);
      canvas!.height = H * Math.min(devicePixelRatio, 2);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let mx = 0.5,
      my = 0.5;
    let tmx = 0.5,
      tmy = 0.5;
    const onMove = (e: MouseEvent) => {
      tmx = e.clientX / window.innerWidth;
      tmy = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const start = performance.now();
    let raf: number;

    function draw() {
      mx += (tmx - mx) * 0.04;
      my += (tmy - my) * 0.04;
      const t = (performance.now() - start) / 1000;
      gl!.uniform2f(uRes, W * Math.min(devicePixelRatio, 2), H * Math.min(devicePixelRatio, 2));
      gl!.uniform1f(uTime, t);
      gl!.uniform2f(uMouse, mx, my);
      gl!.uniform1f(uIntensity, intensity);
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, [disabled, canvasRef]);
}

export function HeroV3() {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useShaderCanvas(canvasRef, !!reduce);

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
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

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
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center pt-24"
      style={{ zIndex: 1 }}
    >
      {/* CSS fallback mesh — sits BEHIND the shader; visible if WebGL fails */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, color-mix(in oklab, var(--color-primary) 10%, transparent), transparent 45%), radial-gradient(circle at 20% 80%, color-mix(in oklab, var(--color-primary) 7%, transparent), transparent 45%)",
        }}
      />

      {/* Orb 1 */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/4 -right-24 h-[500px] w-[500px]"
        style={{ x: reduce ? 0 : orb1X, y: reduce ? 0 : orb1Y }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-full rounded-full"
          style={{ background: "var(--color-primary)", filter: "blur(140px)", opacity: 0.18 }}
        />
      </motion.div>

      {/* Orb 2 */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-[500px] w-[500px]"
        style={{ x: reduce ? 0 : orb2X, y: reduce ? 0 : orb2Y }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-full rounded-full"
          style={{ background: "var(--color-primary)", filter: "blur(140px)", opacity: 0.14 }}
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

      {/* WebGL shader layer — drawn last so it sits above the mesh/orbs */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

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
                      className={`inline-block will-change-transform ${isAccent ? "text-primary" : ""}`}
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
      </div>
    </section>
  );
}
