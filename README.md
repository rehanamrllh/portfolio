# Rayhan Portfolio

Personal portfolio website for Rayhan Amrullah.

Built with React + Vite in an npm workspaces monorepo.

## Tech Stack

- React 19 + Vite 6
- CSS Modules (component/section-scoped styling)
- npm workspaces (`apps/*` + `packages/*`)
- Netlify deployment (`netlify.toml`)

## Features

- Sections: Hero, About, Skills, Projects, Contact
- Light/dark theme toggle with persistence (localStorage key: `portfolio-theme`)
- Active-section highlighting via `IntersectionObserver`
- Scroll reveal animations that respect `prefers-reduced-motion`
- Project modal for viewing project details
- WebGL/three.js-driven hero background (React Three Fiber)

## Quick Start

From the repository root:

```bash
npm install
npm run dev
```

The dev server runs on port 3000 and opens the browser automatically.

## Scripts

Run these from the repository root:

- `npm run dev` — start Vite dev server (workspace: `apps/web`)
- `npm run build` — production build (outputs to `apps/web/dist`)
- `npm run preview` — preview the production build locally

You can also run workspace scripts directly:

```bash
npm run dev --workspace=apps/web
npm run build --workspace=apps/web
```

## Content & Customization

Edit the content here:

- `apps/web/src/data/personal.js` — name, tagline, resume link, stats
- `apps/web/src/data/projects.js` — project list shown in the Projects section
- `apps/web/src/data/skills.js` — skills shown in the Skills section

Most layout/styling is split into section-level modules:

- `apps/web/src/sections/*` + corresponding `*.module.css`

## Path Aliases

Vite is configured with `@` → `apps/web/src`, so imports like `@/components/...` resolve correctly.

## Project Structure

```txt
.
├─ apps/
│  └─ web/                    # Main Vite app
│     ├─ public/
│     ├─ index.html
│     ├─ vite.config.js
│     └─ src/
│        ├─ components/
│        ├─ sections/
│        ├─ data/
│        ├─ hooks/
│        └─ styles/
├─ packages/
│  └─ ui/                     # Shared UI components (Badge, GlassCard, etc.)
├─ netlify.toml
└─ package.json
```

## Deployment (Netlify)

`netlify.toml` is set up to:

- Build with: `npm run build`
- Publish directory: `apps/web/dist`
- Use Node.js 20
- Redirect all routes to `index.html` (SPA fallback)