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