# AGENTS.md

Vendor-neutral rules for any AI coding agent working in this repo (Claude Code, Cursor, Codex, Copilot, Amp, Continue, Aider, etc.). Claude-specific and Copilot-specific pointer files redirect here — keep this as the single source of truth.

## Project

Personal portfolio site for Denis Stritar (product designer).

- **Canonical URL:** https://denisstritar.com (custom domain via `public/CNAME`)
- **Repo / host:** GitHub Pages, user site `stritar.github.io`, default branch `master`
- **Stack:** Astro 5, MDX, TypeScript (strict), static SSG
- **No runtime JS framework** (no React, no Vue). Use `.astro` files. Only add client islands with explicit approval.

## Routes

| Path | Source | Purpose |
|---|---|---|
| `/` | `src/pages/index.astro` | Showcase / selected work index |
| `/work/<slug>` | `src/pages/work/[...slug].astro` + `src/content/projects/<slug>.mdx` | One article per portfolio project |
| `/sitemap-index.xml` | `@astrojs/sitemap` | Auto-generated |
| `/robots.txt`, `/llms.txt`, `/humans.txt`, `/site.webmanifest` | `public/` | Static |

## Content model (`projects` collection)

Schema: [src/content/config.ts](src/content/config.ts). Loader: [src/lib/projects.ts](src/lib/projects.ts).

**To add a new project:**

1. Create `src/content/projects/<kebab-slug>.mdx`.
2. Fill frontmatter. Use [src/content/projects/_example.mdx](src/content/projects/_example.mdx) as the template (copy and unset `draft`).
3. Body MDX starts at `##` — `<h1>` is rendered from the `title` frontmatter by `ProjectLayout`.
4. Set `draft: true` to exclude from the build until the article is ready.

Required frontmatter: `title`, `summary` (≤160 chars), `year`, `publishedDate`.
Optional: `role`, `client`, `updatedDate`, `cover`, `coverAlt`, `tags`, `ogImage`, `canonicalUrl`, `draft`.

## SEO invariants

Every page goes through [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) or [src/layouts/ProjectLayout.astro](src/layouts/ProjectLayout.astro) (which wraps `BaseLayout`).

- Always pass `title` and `description` (or `summary` for projects).
- Canonical URL is auto-derived from `Astro.url.pathname` + `site`. Only override via `canonicalUrl` for cross-posted content.
- Project pages automatically set `ogType="article"` and emit `article:*` meta + a `CreativeWork` JSON-LD block.
- Home page emits a `Person` JSON-LD block.
- One `<h1>` per page. Content headings start at `<h2>` (on project pages the layout renders the `<h1>` from frontmatter).
- Every `<img>` needs a meaningful `alt` (or `alt=""` for decorative). Include `width`/`height` when available.

## SEO / AI discoverability files

Edit in place when updating copy:

- [public/robots.txt](public/robots.txt) — allow-all + sitemap pointer
- [public/llms.txt](public/llms.txt) — follows [llmstxt.org](https://llmstxt.org); update the `## Work` list whenever a project is added
- [public/humans.txt](public/humans.txt) — bump `Last update`
- [public/site.webmanifest](public/site.webmanifest) — add `icons` once favicons exist

## Don't

- Add runtime dependencies without approval. The scaffold is intentionally minimal.
- Touch `archive/` — it is the frozen legacy site and is not deployed.
- Introduce React, a CSS framework, or a design system unless explicitly requested.
- Create new top-level docs (`README.md` and `AGENTS.md` are the only two).
- Remove `public/CNAME` or `public/.nojekyll` — both are required for GH Pages + custom domain.
- Add a `base` to `astro.config.ts` — the site serves from the domain root.

## Verify before reporting done

Run both and report exact output if either fails:

```
npm run check
npm run build
```

`dist/` should contain `index.html`, `sitemap-index.xml`, `robots.txt`, `llms.txt`, `humans.txt`, `site.webmanifest`, `.nojekyll`, `CNAME`. No `work/` pages will be emitted until the first project is un-drafted.

## Deploy

GitHub Actions workflow: [.github/workflows/deploy.yml](.github/workflows/deploy.yml). Triggers on push to `master`. Node 24. Uploads `./dist` and deploys to the `github-pages` environment.
