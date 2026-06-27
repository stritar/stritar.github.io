# AGENTS.md

Vendor-neutral rules for any AI coding agent working in this repo (Claude Code, Cursor, Codex, Copilot, Amp, Continue, Aider, etc.). Claude-specific and Copilot-specific pointer files redirect here — keep this as the single source of truth (the always-loaded hub). Task-specific playbooks live in [`.claude/skills/`](.claude/skills/) and load on demand — see **Skills** below.

## Project

Personal portfolio site for Denis Stritar (Berlin-based product designer). A rich, interactive experience: a time-of-day WebGL hero over a four-mood design system.

- **Canonical URL:** https://denisstritar.com (custom domain via `public/CNAME`)
- **Repo / host:** GitHub Pages, user site `stritar.github.io`, default branch `master`
- **Stack:** Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS 4, MDX via [content-collections](https://www.content-collections.dev/), [React Three Fiber](https://r3f.docs.pmnd.rs/) v9 + drei v10 + three for the WebGL hero, static export (`output: "export"`)
- **Prefer Server Components.** Keep client JavaScript minimal. The WebGL hero is the **one sanctioned `"use client"` island** (`components/webgl/`) — add further client islands only with explicit approval.

## Routes

| Path | Source | Purpose |
|---|---|---|
| `/` | [app/page.tsx](app/page.tsx) | Hero + selected-work index |
| `/work/<slug>/` | [app/work/[slug]/page.tsx](app/work/[slug]/page.tsx) + `content/projects/<slug>.mdx` | One case study per project |
| `/sitemap.xml` | [app/sitemap.ts](app/sitemap.ts) | Generated from published projects |
| `/404` | [app/not-found.tsx](app/not-found.tsx) | Custom branded 404 |
| `/robots.txt`, `/llms.txt`, `/humans.txt`, `/site.webmanifest` | [public/](public/) | Static |

Trailing slashes are enabled in [next.config.ts](next.config.ts) for reliable GitHub Pages routing. `output: "export"` cannot emit a dynamic route with **zero** paths — keep at least one published project (currently `colophon`).

## Design system & theming

Tokens are defined once in [app/globals.css](app/globals.css) and documented in [docs/tokens.md](docs/tokens.md). The Figma "Portfolio" library mirrors them.

- **Four time-of-day moods** (`morning`/`noon`/`evening`/`night`) selected by `[data-theme]` on `<html>`. No separate light/dark — the moods are the theme. Utilities resolve through CSS variables that `[data-theme]` re-points.
- Use the semantic utilities: `text-fg`, `bg-base`, `bg-btn`/`text-btn-fg`, `bg-glass`, `border-hairline`, `font-heading`/`font-body`/`font-mono`, and the `glass` / `grid-page` utilities. **Do not hard-code hex colours** in components.
- Theme logic: [lib/theme/](lib/theme/) (pure solar/geo/constants) + [components/theme/](components/theme/) (provider, pre-hydration FOUC script, switch). The inline `ThemeScript` must stay synchronous and dependency-free — it paints the mood before hydration; the provider refines `system` via geolocation after. Keep the script's bucket hours in sync with `lib/theme/constants.ts`.

## WebGL hero

Lives entirely in [components/webgl/](components/webgl/), mounted via `HeroMount` with `dynamic(..., { ssr: false })` from a client wrapper (calling that from a Server Component errors in Next 16). Nothing 3D runs at build time.

- Per mood it loads `/assets/models/model-<mood>.glb` + `/assets/hdr/<mood>.hdr` (drei `<Environment>` + `useGLTF`). Tuning constants (`EASE`, `MAX_YAW`, …) live in `webgl-assets.ts`.
- Honours `prefers-reduced-motion` (static), drifts on touch devices, and pauses the render loop when the tab is hidden.
- See the `work-on-the-webgl-scene` skill before editing.

## Assets

Binary assets (3D models, HDR maps, fonts, favicons, resume) live in [public/](public/) and are served from the domain root (no `basePath`). HDR maps light the scene only. **`public/assets/hdr/night.hdr` is oversized (~4.3 MB)** — compress to match the others (~140 KB) before launch.

## Content model (`projects` collection)

Schema: [content-collections.ts](content-collections.ts). Query helpers: [lib/projects.ts](lib/projects.ts). Full workflow: the `add-a-case-study` skill.

Required frontmatter: `title`, `summary` (≤160 chars), `year`, `publishedDate`. Optional: `role`, `client`, `updatedDate`, `cover`, `coverAlt`, `accent`, `tags`, `ogImage`, `canonicalUrl`, `draft`. Body starts at `##` (the page renders `<h1>` from `title`). Custom MDX components (`Figure`, `ImageGrid`) are in [components/mdx/mdx-components.tsx](components/mdx/mdx-components.tsx). Set `draft: true` to exclude from the build. When publishing, update the `## Work` list in [public/llms.txt](public/llms.txt).

## SEO invariants

Site-wide metadata: [lib/seo.ts](lib/seo.ts) via [app/layout.tsx](app/layout.tsx); project pages extend it with `generateMetadata`.

- Always set `title` and `description` (or `summary`). One `<h1>` per page; content headings start at `<h2>`.
- Project pages set OG `type: "article"` + a `CreativeWork` JSON-LD block; home emits `Person`.
- Every `<img>` needs a meaningful `alt` (or `alt=""` for decorative). Images use `images.unoptimized: true` — optimize before committing (GitHub Pages has no optimizer).

## Skills (progressive disclosure)

Load the matching playbook in [`.claude/skills/`](.claude/skills/) before the task:

- **add-a-case-study** — create/publish a project MDX + update discoverability files
- **work-on-the-webgl-scene** — edit the R3F hero safely
- **theming-and-tokens** — change colours/moods/type/grid; the FOUC + solar invariants
- **deploy-and-verify** — typecheck → build → inspect `out/` → preview → ship
- **sync-tokens-to-figma** — keep the Figma library in parity with `globals.css`

## Don't

- Add runtime dependencies without approval (the 3D stack — three/@react-three/* — is already approved; nothing else is).
- Add a `basePath` to [next.config.ts](next.config.ts) — the site serves from the domain root.
- Remove [public/CNAME](public/CNAME).
- Hard-code colours/spacing in components — use the design tokens.
- Add a second `"use client"` island beyond the WebGL hero without approval.

## Verify before reporting done

```
npm run typecheck
npm run build
```

Report exact output if either fails. The build fetches Inter/Roboto Mono from Google Fonts via `next/font` — it needs network (CI has it; local builds need connectivity). `out/` must contain `index.html`, `404.html`, `CNAME`, `llms.txt`, `humans.txt`, `sitemap.xml`, `assets/`, `fonts/`, and `work/<slug>/` per published project. Preview with `npm run preview` and smoke-test the WebGL + theme switch in a browser.

## Deploy

GitHub Actions: [.github/workflows/deploy.yml](.github/workflows/deploy.yml). Push to `master` → Node 24 → `npm run build` → uploads `./out` to the `github-pages` environment.
