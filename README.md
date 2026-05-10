# Rayhan Portfolio

Personal portfolio website for Rayhan Amrullah — built with React + Vite using an npm workspaces monorepo.

## Tech Stack
- **React 19** + **Vite 6**
- **CSS Modules** (component/section scoped styles)
- **npm workspaces**
- Deploy-ready for **Netlify**

## Features
- Sections: **Hero**, **About**, **Skills**, **Projects**, **Contact**
- **Theme toggle** (light/dark) with persistence in `localStorage` (`portfolio-theme`)
- **Active section** highlighting in navbar via `IntersectionObserver`
- **Scroll reveal** animations that respect `prefers-reduced-motion`
- Project modal for project details

## Project Structure
```txt
.
├─ apps/
│  └─ web/                 # Main Vite app
│     ├─ public/
│     └─ src/
│        ├─ components/
│        ├─ sections/
│        ├─ data/           # Content (personal/projects/skills)
│        ├─ hooks/
│        └─ styles/
├─ packages/
│  └─ ui/                   # Shared UI components (Badge, GlassCard, etc.)
├─ netlify.toml
└─ package.json
```

## Getting Started
### Prerequisites
- **Node.js 20+** (Netlify uses Node 20 in `netlify.toml`)
- npm (bundled with Node)

### Install
From repo root:
```bash
npm install
```

### Run (dev)
```bash
npm run dev
```
Vite dev server will run on **http://localhost:3000**.

### Build
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

> Tip: You can also run workspace commands directly:
> - `npm run dev --workspace=apps/web`
> - `npm run build --workspace=apps/web`

## Customization
### Update your content
Edit these files:
- `apps/web/src/data/personal.js` — name, tagline, socials, resume URL
- `apps/web/src/data/projects.js` — project list (title, description, stack, URLs)
- `apps/web/src/data/skills.js` — skill categories & icons

### Resume (Download CV)
Navbar/Hero uses `personal.resumeUrl` (default: `/resume.pdf`).

To make the download button work:
1. Put your resume at `apps/web/public/resume.pdf`, **or**
2. Change `resumeUrl` in `apps/web/src/data/personal.js` to match your file.

### Contact form (Formspree)
The contact form posts to a placeholder Formspree endpoint:
- `apps/web/src/sections/Contact.jsx` → replace `https://formspree.io/f/YOUR_FORM_ID` with your real Formspree form endpoint.

## Deployment
### Netlify
This repo includes a ready-to-use Netlify config in `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `apps/web/dist`
- SPA redirect: `/* -> /index.html` (status 200)

## Path Alias
Vite is configured with an alias:
- `@` → `apps/web/src`

So imports like `@/components/Navbar` resolve correctly.

---

If you want, I can also add:
- a short "Live Demo" section (once you share the deployed URL), or
- a screenshot/GIF section (once you provide images).
