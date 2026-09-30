# OIL TWIN

An AI-powered digital oilfield demo: an animated pumpjack digital twin, live field telemetry, predictive analytics, a what-if simulator, and an AI copilot. All data is simulated in the browser.

**Stack:** React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · Lucide

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Typecheck and build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript compiler only |

Requires Node 18.18+ (Node 20 recommended, see `.nvmrc`).

## Deploying

It's a static site, so no environment variables or backend are needed.

- **Vercel:** import the repo. `vercel.json` sets the build and caching.
- **Netlify:** import the repo. `netlify.toml` sets the build and SPA fallback.
- **Any static host:** run `npm run build` and upload the `dist/` folder.

## Project structure

```
src/
  components/   Page sections (Hero, Underground, Analytics, Simulator, LiveField, Impact, AICopilot)
  lib/          Shared digital-twin state (twin-context.tsx)
public/         Static assets (favicon)
```
