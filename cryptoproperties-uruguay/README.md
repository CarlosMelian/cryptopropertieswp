# CryptoProperties Uruguay

A luxury crypto-wealth-to-real-estate advisory website built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

> **The Bridge Between Crypto Wealth and Uruguayan Real Estate.**

---

## Getting Started

Requires Node.js 18.18+ (Node 20 LTS recommended).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other commands:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

The first `npm run build` or `npm run dev` needs internet access once, to let `next/font/google` download and self-host the Fraunces, Manrope, and IBM Plex Mono font files. After that, fonts are served from your own build — no runtime dependency on Google's CDN.

---

## Project Structure

```
src/
  app/
    layout.tsx          Root layout, fonts, SEO metadata, JSON-LD
    page.tsx             Homepage (assembles all sections below)
    globals.css          Tailwind layers, design tokens, base styles
    properties/          "Portfolio access" placeholder page
    legal/                Privacy, Terms, Compliance, Risk placeholder pages
  components/
    layout/              Navbar, Footer
    sections/             The 9 homepage sections from the brief
    ui/                    Button, GlassCard, Reveal, BridgeMark, BridgeLine,
                           AnimatedCounter, SectionEyebrow
    legal/                Shared layout for the legal pages
  lib/
    data.ts               All site copy/content as typed arrays
    utils.ts               `cn()` className helper
  types/
    index.ts                Shared TypeScript interfaces
```

Every homepage section is its own component in `src/components/sections`, and all editable copy (stats, services, testimonials, articles, etc.) lives in `src/lib/data.ts` — edit that one file to change most of the site's text without touching JSX.

---

## Design System

- **Palette** — void black background, graphite surfaces, a single restrained gold accent (no second accent color, by design).
- **Type** — Fraunces (display/serif), Manrope (body/sans), IBM Plex Mono (labels, data, mono accents).
- **Signature motif** — "The Bridge Line": a cable-stayed bridge mark used in the logo, the hero graphic (connecting a Bitcoin node to a building), and the How It Works timeline connector, each with an animated traveling pulse.
- All visuals (hero graphic, skyline, locator map) are hand-built inline SVG — there are no external image dependencies to swap out before deploying.

---

## Before You Launch — Replace Placeholder Content

This build is content-complete and production-ready from a *code* standpoint, but several pieces are intentionally illustrative and **must be reviewed/replaced** before this goes live or is used to onboard real clients:

- [ ] **Domain** — `https://www.cryptoproperties.uy` is a placeholder in `src/app/layout.tsx` (`siteUrl`, `metadataBase`, OpenGraph/Twitter URLs). Update to your real domain.
- [ ] **Statistics** — the "Capital Facilitated / International Clients / Transactions / Countries" figures in `src/lib/data.ts` (`statItems`) are explicitly labeled illustrative on the page. Replace with real, verifiable figures or keep clearly labeled as illustrative.
- [ ] **Testimonials** — the four client quotes in `src/lib/data.ts` (`testimonials`) are fictional examples written for this build. Replace with real client testimonials (with permission) before publishing.
- [ ] **Contact details** — email (`contact@cryptoproperties.uy`) and social links (LinkedIn/Instagram/Twitter, currently `#`) in `src/components/layout/Footer.tsx` and `src/app/properties/page.tsx`.
- [ ] **Legal pages** (`src/app/legal/*`) — written as realistic, structurally complete placeholders, but each one carries an on-page notice that it needs review by a licensed Uruguayan attorney and compliance professional before launch. Treat them as a first draft, not final legal text.
- [ ] **JSON-LD structured data** in `layout.tsx` — update once you have a real address/phone/registration details to include.
- [ ] **`/properties`** — currently a "request access" placeholder, consistent with the brief's requirement that listings live outside the homepage. Build out the actual portfolio/listings experience here when ready.

---

## Deployment

Built to deploy on Vercel with zero configuration:

```bash
npx vercel
```

Or connect the repository in the Vercel dashboard and it will detect the Next.js project automatically.
