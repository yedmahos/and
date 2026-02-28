# and. — The Platform for Builders

> Talent, Build, and Accelerate — all in one place.

A fully functional multi-page React website built from the and. brand identity system (v1.0, 2026).

---

## Pages

| Page | Route (internal) | Description |
|------|-----------------|-------------|
| Home | `home` | Hero, stats, verticals overview, manifesto, CTA |
| Talent | `talent` | Searchable freelancer marketplace with modals |
| Build | `build` | Service packages, inquiry forms, process steps |
| Accelerate | `accelerate` | Cohort info, alumni portfolio, FAQ |
| About | `about` | Story, team, values |
| Apply | `apply` | 3-step multi-track application form |

---

## Tech Stack

- **React 18** — UI framework
- **Google Fonts** — DM Serif Display + Syne + DM Mono
- **CSS-in-JS** (inline `<style>` tags) — zero dependencies on CSS libraries
- **No external UI libraries** — all components hand-crafted

---

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm start
# → Opens at http://localhost:3000
```

### Build for Production

```bash
npm run build
# → Outputs optimized files to /build
```

---

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag the /build folder into netlify.com/drop
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json: "homepage": "https://<username>.github.io/and-website"
npm run build && npx gh-pages -d build
```

---

## Brand Tokens

| Token | Value | Use |
|-------|-------|-----|
| Void | `#0A0A0A` | Primary background |
| Ignite | `#FF4D1C` | and talent |
| Blueprint | `#1C3FFF` | and build |
| Surge | `#00C896` | and accelerate |
| Canvas | `#F5F4F0` | Primary text / light backgrounds |

---

## Project Structure

```
and-website/
├── public/
│   └── index.html          # HTML shell with SEO meta tags
├── src/
│   ├── index.js            # React entry point
│   ├── index.css           # Global CSS reset
│   └── App.jsx             # Full application (all pages + components)
├── .gitignore
├── package.json
└── README.md
```

---

## Features

- ✅ Custom cursor with hover morphing
- ✅ Sticky frosted-glass navbar + mobile hamburger menu
- ✅ Infinite scrolling marquee
- ✅ Talent marketplace with search, filter, and modals
- ✅ Service inquiry modals with forms
- ✅ Accordion FAQ
- ✅ 3-step application flow with validation
- ✅ Toast notification system
- ✅ Scroll-to-top on page change
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ CSS animations and staggered reveals

---

*v1.0 · 2026 · Brand by and™*
