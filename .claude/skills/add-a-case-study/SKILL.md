---
name: add-a-case-study
description: Create, write, and publish a portfolio case study (a project MDX file) for denisstritar.com, including frontmatter, body, images, and the discoverability updates. Use when the user wants to add, draft, publish, or edit a project / case study / work entry.
---

# Add a case study

Projects are MDX files in `content/projects/<kebab-slug>.mdx`, validated by the
Zod schema in `content-collections.ts` and queried via `lib/projects.ts`.

## Steps

1. **Copy the template:** start from `content/projects/_example.mdx`.
2. **Name the file** `content/projects/<kebab-slug>.mdx`. The slug becomes the
   URL `/work/<slug>/`.
3. **Fill frontmatter.**
   - Required: `title`, `summary` (≤160 chars), `year` (number), `publishedDate` (`YYYY-MM-DD`).
   - Optional: `role`, `client`, `updatedDate`, `cover`, `coverAlt`, `accent` (hex), `tags` (array), `ogImage`, `canonicalUrl`, `draft`.
4. **Write the body** starting at `##` — the `<h1>` is rendered from `title`, so
   never add an `<h1>`. Available MDX components: `<Figure src alt caption />`
   and `<ImageGrid>` (two-up). Standard markdown (lists, tables, code, quotes)
   is styled in `components/mdx/mdx-components.tsx`.
5. **Images:** put them under `public/work/<slug>/…` and reference with absolute
   paths (`/work/<slug>/cover.jpg`). Compress first — GitHub Pages has no image
   optimizer (`images.unoptimized: true`). Always give a meaningful `alt`.
6. **Publish:** remove `draft: true` (or set `draft: false`).
7. **Update discoverability:** add a bullet to the `## Work` list in
   `public/llms.txt`; bump `Last update` in `public/humans.txt`.
8. **Verify:** `npm run typecheck && npm run build`, confirm
   `out/work/<slug>/index.html` exists. (See the `deploy-and-verify` skill.)

## Notes

- `output: "export"` needs ≥1 published project. `colophon` is the seed — don't
  unpublish the last remaining project.
- Keep one `<h1>` per page (the rendered title); body starts at `<h2>`.
- Drafts are excluded from the build and from `sitemap.xml`.
