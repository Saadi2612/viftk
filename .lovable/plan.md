# Stratosphere — Premium Marketing Site

A single-page TanStack Start site (the project's actual stack — not Next.js, but same React/TS/Tailwind result) with a complete design system, full-height slide-out menu with domino animation, and all 8 sections from your spec.

## Scope

One route (`src/routes/index.tsx`) composed of modular section components. Light/dark theme with persistence. Framer Motion for all animations. shadcn/ui primitives (already in project). lucide-react icons.

## Design system (src/styles.css)

Replace the current token block with the Stratosphere palette, converted to `oklch` (project convention), keeping shadcn token names intact:

- `--primary` → cobalt #2E6BE6, `--primary-hover` → #1E54C7
- `--background`, `--card`, `--border`, `--foreground`, `--muted-foreground` for both `:root` (light) and `.dark` (dark) per spec
- `--accent-soft` → #EAF1FE / rgba(46,107,230,0.12)
- Radii: card 12px, button 8px, pill 999px
- Add `--shadow-hover: 0 8px 30px rgba(0,0,0,0.06)` and a `--font-mono` stack
- Global 200ms transition on `background-color` and `color`
- Load Inter + JetBrains Mono via `<link>` tags in `__root.tsx` head

## Components (new files under `src/components/`)

- `theme-provider.tsx` — context + localStorage + `prefers-color-scheme` on first visit, toggles `.dark` on `<html>`
- `theme-toggle.tsx` — sun/moon icon button
- `navbar.tsx` — sticky, backdrop-blur, logo with blue dot, theme toggle + "Book a call" + hamburger; bottom border appears after scroll past hero
- `slide-menu.tsx` — full-height right panel, backdrop, 5 numbered links + contact block, Framer Motion domino:
  - Open: backdrop fade (200ms) → panel slide-in (400ms, `cubic-bezier(0.32,0.72,0,1)`) → children stagger 60ms, opacity+translateY, ease-out
  - Close: children reverse-stagger 40ms → panel slide-out (300ms) → backdrop fade (150ms)
  - Uses `AnimatePresence`, `staggerChildren` + `staggerDirection: -1` on exit
  - Locks body scroll; closes on Escape and backdrop click
- `sections/hero.tsx` — 100vh, mono eyebrow, clamp(48,8vw,84) headline, sub, two CTAs, 5 muted logo row, subtle dot-grid background + single blue radial glow bottom-right, animated chevron scroll cue, fade-in-up on mount
- `sections/services.tsx` — 6-card bento grid (one card spans 2 cols), lucide icons, hover lift + blue border glow
- `sections/process.tsx` — 4-step horizontal stepper with big mono numerals; connecting line fills via `useScroll`/`useTransform`
- `sections/work.tsx` — 3 stacked case-study cards with placeholder thumbnails (CSS gradient blocks, no stock imagery), mono client eyebrow, 2 metrics, tag row, hover zoom + blue underline
- `sections/testimonials.tsx` — large pull quote + 4-stat strip
- `sections/cta.tsx` — dark band in light mode, light band in dark mode (inverts via `.dark` selector)
- `sections/footer.tsx` — 4 columns + bottom row

All sections wrapped in a small `RevealOnScroll` motion helper (once, threshold 0.2).

## Page assembly

`src/routes/index.tsx` replaces the placeholder with:
```
<ThemeProvider>
  <Navbar />
  <main>
    <Hero /> <Services /> <Process /> <Work /> <Testimonials /> <CTA />
  </main>
  <Footer />
  <SlideMenu />  // controlled by a small zustand-free context or lifted state
</ThemeProvider>
```

Menu open state lives in a tiny `MenuProvider` so Navbar's hamburger and SlideMenu share it without prop drilling.

## SEO

Update `__root.tsx` head: title "Stratosphere — Software Studio", description, og:title/description, twitter card. Single H1 in Hero.

## Copy

Believable studio copy throughout — no Lorem Ipsum. Services, process steps, three fictional case studies (e.g. "Northwind Logistics", "Helios Health", "Atlas Finance") with plausible metrics.

## Technical notes

- Framer Motion (`motion`) — confirm install; add via `bun add motion` if missing
- Stack is **TanStack Start**, not Next.js — same React/TS/Tailwind output, just different router/build. All component code is portable.
- Single route only (per your "single-page, smooth-scroll anchors" instruction); the slide-menu links scroll to `#services`, `#process`, etc.
- Section IDs match menu labels for in-page anchor navigation
- Theme transition: 200ms on `background-color, color, border-color` globally in `@layer base`
- Focus rings: `focus-visible:outline-2 focus-visible:outline-offset-2 outline-primary`

## Out of scope

- Multi-route split (everything lives on `/` per your spec)
- Real backend / form submission (CTAs are visual only)
- Real client logos / case-study imagery (use abstract placeholders)
