# Next.js App Router Boilerplate — Operational Guide

This repository is a minimal Next.js 16 (App Router) starter with React 19, TypeScript, Tailwind-ready PostCSS, and no backend/auth/billing. Use this document as the single operational reference. If anything is unclear: **STOP AND ASK** before proceeding.

---

## 1. Current Scope
- Purpose: baseline UI scaffold for future SaaS features.
- No authentication, database, or API layer is present.
- **NEW: AI FAQ Generator (Faqlio) — provides FAQ generation from product description using OpenAI API**
- To enable AI FAQ feature, set `OPENAI_API_KEY` as described below (see "Environment & Secrets")
- First feature rule: ship the first feature/update directly in `app/page.tsx` (the main page) before introducing new routes or structure. Rebrand the entire page as per the request, including header and footer sections.
- Current landing: Panda-themed orange palette, responsive layout with wrapping buttons, and constrained center width (up to ~1600px) while remaining mobile-friendly.

## 2. Technology Stack
- Next.js 16 App Router (server-first, file-based routing).
- React 19, TypeScript 5 (strict).
- Styling: Tailwind via `@tailwindcss/postcss` pipeline; global CSS in `app/globals.css`.
- Tooling: ESLint 9 (`eslint-config-next`), PostCSS, Next font loader (Geist).

## 3. Project Structure
```
app/
  layout.tsx        # Root layout, loads fonts, applies globals
  page.tsx          # Public landing page (server component, now with Faqlio AI FAQ Generator)
  globals.css       # Global styles; Tailwind entrypoint
public/             # Static assets (logos/icons)
scripts/            # Ops helpers (minimal placeholders)
  dev-supervisor.js # Runs Next dev server
  db-init.js        # No-op (no DB)
  git-poll.js       # Polls git origin for branch updates
  error-reporter.ts # Client-safe error forwarder (imported via components/ErrorReporter)
Dockerfile          # Container definition (npm ci, runs dev-supervisor)
eslint.config.mjs   # ESLint configuration
next.config.ts      # Next.js config (minimal)
postcss.config.mjs  # PostCSS plugins (Tailwind-ready)
tsconfig.json       # TypeScript config
package.json        # Scripts and dependencies
package-lock.json   # Locked dependency tree
FILES.md            # Structural index
RULES.md            # Change boundaries (boilerplate)
env.example         # Add your OpenAI API key here for FAQ generation
```

## 4. Install &amp; Run
```bash
npm install
# Add .env.local with your OpenAI key (see env.example)
cp env.example .env.local  # then fill in your OPENAI_API_KEY

npm run dev   # starts Next.js on localhost:3000
npm run lint  # ESLint
npm run build # production build
```

## 5. Routing &amp; Components
- Public landing page: `app/page.tsx`.
- No route groups exist yet. When adding authenticated/dashboard areas, create `app/(dashboard)/...` and reuse shared layouts there (see RULES.md).
- Keep components server-side by default; add `&quot;use client&quot;` only when required by client hooks/state.

## 6. Styling
- Tailwind is enabled via `app/globals.css` (`@import &quot;tailwindcss&quot;;`). There is no standalone `tailwind.config` yet; add one only if needed.
- Limit global styles; prefer component- or route-scoped styles.
- Fonts are loaded through `next/font` (Geist). Keep overrides minimal.
- Landing page uses Panda orange (#FB7232) accents, card-based feature highlights, and a gradient hero; buttons and menus wrap on small viewports.

## 7. Environment &amp; Secrets

**AI FAQ Generator requires an OpenAI API key:**

- Copy `env.example` to `.env.local` and fill in your key:
  ```
  OPENAI_API_KEY=sk-...
  ```
- FAQ generation will NOT work unless this is set. Get your key from https://platform.openai.com/api-keys.
- Never commit `.env.local` to source control.

## 8. Data &amp; Backend (Absent)

- No Prisma/ORM; no custom API routes or database connections beyond server action for AI FAQ generator.
- If adding further data access, place server-only helpers under `lib/` and add API routes or server actions within `app/`. Document new contracts in FILES.md and RULES.md.

## 9. Testing (Not Present)
- No tests are included. If adding tests, prefer:
  - Unit: `__tests__/` or co-located `*.test.tsx`
  - E2E: Playwright under `e2e/`
  - Provide lightweight mocks/utilities

## 10. Change Guidelines
- Default to minimal diffs; avoid rewrites.
- Do not move files across route groups without coordination.
- Avoid new Markdown explainer files unless explicitly requested; update existing docs instead.
- Do not introduce time- or randomness-dependent values directly in React render (`Date.now()`, `Math.random()`). Precompute in server components, constants, or `useEffect` if client-only.
- If adding auth, billing, or DB: update RULES.md and FILES.md first, then implement.
- Only `scripts/error-reporter.ts` may be imported into runtime UI (via `components/ErrorReporter.tsx`); keep other scripts server-only.

## 11. Hard Stops
- Unclear requirements or missing context.
- Requests to alter session/cookie behavior (not present) without approval.
- Hand-editing generated migration SQL (when Prisma is added).
- Storing or logging secrets in code or assets.

## 12. Deployment
- Default target: Next.js on Vercel or any Node 18+ host.
- Docker support is not configured. Add a `Dockerfile` only with explicit need and document it.

---

Operate cautiously, keep changes small, and align new features with the documented structure. When uncertain: **STOP AND ASK**.