"use client";

import { useState, useEffect } from "react";
import { HeroV1 } from "./hero-v1";
import { HeroV2 } from "./hero-v2";
import { HeroV3 } from "./hero-v3";

const STORAGE_KEY = "viftk_hero_variant";

type Variant = 1 | 2 | 3;

const LABELS: Record<Variant, string> = {
  1: "V1 Blueprint",
  2: "V2 Scroll Cinema",
  3: "V3 Shader",
};

export function HeroSwitcher() {
  const [variant, setVariant] = useState<Variant>(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "1" || saved === "2" || saved === "3") {
      setVariant(Number(saved) as Variant);
    }
    setMounted(true);
  }, []);

  const pick = (v: Variant) => {
    setVariant(v);
    localStorage.setItem(STORAGE_KEY, String(v));
  };

  return (
    <>
      {variant === 1 && <HeroV1 />}
      {variant === 2 && <HeroV2 />}
      {variant === 3 && <HeroV3 />}

      {/* Floating dev switcher — only visible in development */}
      {process.env.NODE_ENV === "development" && mounted && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-end",
          }}
        >
          <span
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              opacity: 0.4,
              paddingRight: "2px",
            }}
          >
            // Hero variant
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            {([1, 2, 3] as Variant[]).map((v) => (
              <button
                key={v}
                onClick={() => pick(v)}
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: "11px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid",
                  cursor: "pointer",
                  transition: "all 150ms",
                  borderColor: variant === v ? "oklch(0.564 0.197 261.5)" : "oklch(0.24 0.018 265)",
                  background:
                    variant === v ? "oklch(0.564 0.197 261.5)" : "oklch(0.17 0.012 264 / 0.9)",
                  color: variant === v ? "#fff" : "oklch(0.67 0.012 260)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {LABELS[v]}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
