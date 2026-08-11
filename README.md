# Benzene Studio

A responsive React + Vite website for Benzene Studio's games, utilities, support and privacy center.

## Run locally

```bash
npm install
npm run dev
```

To create a deployable production bundle:

```bash
npm run build
```

The generated static site is in `dist/` and is ready for GitHub Pages or any static host.

## Editing app content

All app names, descriptions, colors and feature lists live in `src/main.jsx` in the `apps` array. Updating this one collection updates the app grids, individual app pages, privacy center and support center automatically.

## Before publishing

- Replace each placeholder `Google Play` button target with its real store URL.
- Add real product screenshots to the app pages.
- Review each generated privacy page so it accurately reflects the app's actual data practices.
- Set `base` in a Vite configuration if deploying to a GitHub Pages project subpath.
