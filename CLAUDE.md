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

## Architecture

**Stack:** Next.js 15 App Router · React 19 · TypeScript · Tailwind CSS v4 · framer-motion · shadcn/ui

```
src/
  app/
    page.tsx              # Home page (client component, framer-motion entry animation)
    layout.tsx            # Root layout with Geist fonts
    globals.css           # Tailwind v4 import
    api/
      video/route.ts      # POST /api/video → generate, GET /api/video?jobId= → status
  components/
    ui/
      button.tsx          # shadcn/ui Button (cva variants)
      animated-section.tsx  # framer-motion whileInView fade-up wrapper
  lib/
    higgsfield.ts         # Higgsfield.ai API client (generateVideo, getVideoStatus)
    utils.ts              # cn() helper (clsx + tailwind-merge)
```

## Higgsfield.ai

The API client lives in `src/lib/higgsfield.ts` and is called only from server-side code (Route Handlers, Server Actions). Set `HIGGSFIELD_API_KEY` in `.env.local` (see `.env.local.example`). The `/api/video` route proxies requests so the key never reaches the client.

## framer-motion Patterns

- Use `AnimatedSection` (`src/components/ui/animated-section.tsx`) for scroll-triggered fade-up animations.
- Mark any component that imports from `framer-motion` with `"use client"`.
- Page-level entry animations live directly in the page component.

## UI / UX Pro Max Skill

The `/plugin` system is not available in the Claude Code web environment. Apply UI/UX guidance manually following 21st.dev component conventions and framer-motion motion design principles.
