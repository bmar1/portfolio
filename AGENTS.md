# AGENTS.md

## Cursor Cloud specific instructions

This is a single-product React + TypeScript portfolio site located in `portfolio-site/`.

### Quick reference

| Action | Command | Working directory |
|--------|---------|-------------------|
| Install deps | `npm install` | `portfolio-site/` |
| Dev server | `npm run dev` | `portfolio-site/` |
| Lint | `npm run lint` | `portfolio-site/` |
| Build | `npm run build` | `portfolio-site/` |
| Preview prod | `npm run preview` | `portfolio-site/` |

### Notes

- **Node.js 22 LTS** is required (installed via nodesource).
- The dev server (Vite) runs on `http://localhost:5173` by default; use `--host 0.0.0.0` to expose on all interfaces.
- There are no environment variables, databases, or backend services required.
- ESLint has 4 pre-existing warnings related to React hooks (`set-state-in-effect`, `refs` usage). These are in the original code and not blocking.
- The site has a terminal boot animation on load; wait ~5-10s for it to finish before interacting with sections.
- The `references/` directory contains design docs and a PRD—these are not part of the build.
