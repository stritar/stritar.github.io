# AGENTS.md

Vendor-neutral rules for any AI coding agent working in this repo (Claude Code, Cursor, Codex, Copilot, Amp, Continue, Aider, etc.). Claude-specific and Copilot-specific pointer files redirect here — keep this as the single source of truth.

## Project

Personal portfolio site for Denis Stritar (product designer).

- **Canonical URL:** https://denisstritar.com (custom domain via `public/CNAME`)
- **Repo / host:** GitHub Pages, user site `stritar.github.io`, default branch `master`
- **Stack:** Next.js 16 (App Router), React 19, MDX via [content-collections](https://www.content-collections.dev/), TypeScript (strict), Tailwind CSS 4, static export (`output: "export"`)
- **Prefer Server Components.** Keep client JavaScript minimal. Only add `"use client"` islands with explicit approval.

## Routes

| Path | Source | Purpose |
|---|---|---|
| `/` | [app/page.tsx](app/page.tsx) | Showcase / selected work index |
| `/work/<slug>/` | [app/work/[slug]/page.tsx](app/work/[slug]/page.tsx) + `content/projects/<slug>.mdx` | One case study per portfolio project |
| `/robots.txt`, `/llms.txt`, `/humans.txt` | [public/](public/) | Static (add others here as needed) |

Trailing slashes are enabled in [next.config.ts](next.config.ts) for reliable GitHub Pages routing.

## Content model (`projects` collection)

Schema: [content-collections.ts](content-collections.ts). Query helpers: [lib/projects.ts](lib/projects.ts).

**To add a new project:**

1. Create `content/projects/<kebab-slug>.mdx`.
2. Fill frontmatter. Use [content/projects/_example.mdx](content/projects/_example.mdx) as the template (copy and unset `draft`).
3. Body MDX starts at `##` — the page renders `<h1>` from the `title` frontmatter in [app/work/[slug]/page.tsx](app/work/[slug]/page.tsx).
4. Set `draft: true` to exclude from the build until the article is ready.
5. Custom MDX components are wired in [components/mdx/mdx-components.tsx](components/mdx/mdx-components.tsx).

Required frontmatter: `title`, `summary` (≤160 chars), `year`, `publishedDate`.
Optional: `role`, `client`, `updatedDate`, `cover`, `coverAlt`, `accent`, `tags`, `ogImage`, `canonicalUrl`, `draft`.

When a project is published, update the `## Work` list in [public/llms.txt](public/llms.txt).

## SEO invariants

Site-wide metadata: [lib/seo.ts](lib/seo.ts) via [app/layout.tsx](app/layout.tsx). Project pages extend it with `generateMetadata` in [app/work/[slug]/page.tsx](app/work/[slug]/page.tsx).

- Always set `title` and `description` (or `summary` for projects).
- `metadataBase` is set to the production domain; relative canonicals resolve correctly. Override per project via `canonicalUrl` only for cross-posted content.
- Project pages set Open Graph `type: "article"` and emit a `CreativeWork` JSON-LD block.
- Home page emits a `Person` JSON-LD block.
- One `<h1>` per page. Content headings start at `<h2>` (project pages render `<h1>` from frontmatter).
- Every `<img>` needs a meaningful `alt` (or `alt=""` for decorative). Include `width`/`height` when available.
- Images use `images.unoptimized: true` — GitHub Pages has no image optimizer. Optimize assets before committing or at build time.

## SEO / AI discoverability files

Edit in place when updating copy:

- [public/llms.txt](public/llms.txt) — follows [llmstxt.org](https://llmstxt.org); update the `## Work` list whenever a project is added
- [public/humans.txt](public/humans.txt) — bump `Last update`
- Add [public/robots.txt](public/robots.txt) and [public/site.webmanifest](public/site.webmanifest) when ready

## Don't

- Add runtime dependencies without approval. The scaffold is intentionally minimal.
- Touch `archive/` — it is the frozen legacy site and is not deployed.
- Touch `doc/` unless explicitly asked — it is separate stakeholder documentation, not part of the portfolio site.
- Add a `basePath` to [next.config.ts](next.config.ts) — the site serves from the domain root.
- Remove [public/CNAME](public/CNAME).
- Introduce heavy UI frameworks or design systems beyond the existing Tailwind setup unless explicitly requested.

## Verify before reporting done

Run both and report exact output if either fails:

```
npm run typecheck
npm run build
```

`out/` should contain `index.html`, static assets, and everything from `public/` (e.g. `CNAME`, `llms.txt`, `humans.txt`). Published project pages appear under `out/work/<slug>/`. No `work/` pages are emitted until the first project is un-drafted.

Preview locally with `npm run preview`.

## Deploy

GitHub Actions workflow: [.github/workflows/deploy.yml](.github/workflows/deploy.yml). Triggers on push to `master`. Node 24. Builds with `npm run build` and uploads `./out` to the `github-pages` environment.
