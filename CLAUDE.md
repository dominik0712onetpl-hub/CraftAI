# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build
npm run lint         # ESLint via Next.js
```

## Adding 21st.dev Components

21st.dev uses shadcn/ui as a registry base. Add components with:

```bash
npx shadcn@latest add <component>
# or pull directly from 21st.dev registry:
npx shadcn@latest add "https://21st.dev/r/<component-name>"
```

`components.json` is already configured — components land in `src/components/ui/`.

## Product: Vorn — Live Translation Earbuds

**Vorn** is a product landing page for wireless earbuds with real-time AI translation.
- Primary use case: live speech translation (< 0.5 s latency, 40+ languages)
- Secondary: music, calls, podcasts
- Two product variants: Standard (€299) and Pro (€399)
- Three colors: Midnight Black, Pearl White, Sage

The page is a **sales/marketing landing page** — every design decision should serve conversion.

## Architecture

**Stack:** Next.js 15 App Router · React 19 · TypeScript · Tailwind CSS v4 · framer-motion · shadcn/ui

```
src/
  app/
    page.tsx              # Main landing page (client component)
    layout.tsx            # Root layout with Geist fonts
    globals.css           # Tailwind v4 + shadcn/ui CSS variables (light + dark)
    api/
      video/route.ts      # POST /api/video → Higgsfield.ai generate
                          # GET  /api/video?jobId= → status
  components/
    ui/
      button.tsx          # shadcn/ui Button (cva variants)
      animated-section.tsx  # framer-motion whileInView fade-up wrapper
    purchase-panel.tsx    # Full purchase section: variant/color/qty selector,
                          #   animated buy button, demo success state
  lib/
    higgsfield.ts         # Higgsfield.ai API client (server-side only)
    translations.ts       # All copy in EN / PL / DE / NO + detectLang()
    utils.ts              # cn() helper (clsx + tailwind-merge)
```

## Internationalisation (i18n)

Language is detected automatically via `navigator.language` and saved to `localStorage` under key `"vorn-lang"`. Supported: `en` (default), `pl`, `de`, `no`.

- All translatable strings live in `src/lib/translations.ts`
- The `T` type is inferred from the English (`en`) object — other languages must satisfy `typeof en`
- Language switcher is in the nav: pill-style `EN | PL | DE | NO` buttons

## Page Structure (top → bottom)

1. **Nav** — fixed, backdrop-blur, brand + language switcher + CTA button
2. **Video hero section** (400 vh, sticky video) — scroll-driven: `video.currentTime` is set via `useMotionValueEvent(scrollYProgress)`. Contains 4 scenes that fade in/out:
   - Scene 0: Hero headline + CTA
   - Scene 1: "Translation faster than thought" (< 0.5 s)
   - Scene 2: "Every language. One pair of earbuds." (40+ languages)
   - Scene 3: "Focused. All day." (ANC + battery)
3. **How it works** — 3-step process (Capture → Translate → Deliver), white bg
4. **Tech specs** — 12-row grid, black bg
5. **Purchase panel** (`#order`) — variant + color + qty + animated buy button + demo success state
6. **Footer**

## framer-motion Patterns

- `AnimatedSection` (`src/components/ui/animated-section.tsx`) for scroll-triggered fade-up.
- `"use client"` required on any component importing from `framer-motion`.
- The `Scene` component in `page.tsx` takes a `progress: MotionValue<number>` and a `range: [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd]` — all values are 0–1 relative to the video section's scroll progress.

## Higgsfield.ai

API client in `src/lib/higgsfield.ts` — server-side only. Set `HIGGSFIELD_API_KEY` in `.env.local` (see `.env.local.example`). The `/api/video` route proxies requests so the key never reaches the client. Currently not wired into the UI — reserved for future AI-generated video features.

## Purchase Panel

`src/components/purchase-panel.tsx` is a demo — no real payment is processed. The order flow: `idle → submitting (1.8 s animation) → success`. To wire up real payments, replace the `setTimeout` in `handleOrder` with a real API call (Stripe, etc.).

## UI / UX Notes

- Color palette: off-white `#f2efe9` (bg), pure black, white text on dark sections
- Typography: Geist (variable font), heavy weights (font-black = 900) for headlines
- The `/plugin` system is not available in the Claude Code web environment. Apply UI/UX guidance manually following 21st.dev component conventions.
