---
name: deploy-and-verify
description: Verify and ship denisstritar.com — typecheck, static-export build, inspect the out/ folder, local preview, and the GitHub Pages deploy flow. Use before reporting work done, or when the user wants to build, preview, verify, or deploy the site.
---

# Deploy & verify

## Build gates (always run before "done")

```
npm run typecheck   # React 19 / R3F v9 / @types/three must agree
npm run build       # static export → out/
```

- The build fetches Inter + Roboto Mono via `next/font/google`, so it **needs
  network** (CI has it; locally you need connectivity).
- A `window is not defined` error means 3D code leaked outside the
  `ssr:false` boundary — see `work-on-the-webgl-scene`.
- `output: "export"` needs ≥1 published project, else `/work/[slug]` fails.

## Inspect `out/`

Must contain: `index.html`, `404.html`, `CNAME` (= `denisstritar.com`),
`llms.txt`, `humans.txt`, `sitemap.xml`, `.nojekyll`, `_next/`,
`assets/models/*.glb`, `assets/hdr/*.hdr`, `fonts/campton/*.woff2`, and
`work/<slug>/index.html` per published project. Sanity-check asset sizes
(`night.hdr` should be compressed, not ~4 MB).

## Preview

```
npm run preview     # serves out/ at a local URL
```

Browser smoke test: WebGL model renders and follows the cursor; theme switch
crossfades all four moods; "Auto" resolves to local time of day; no flash of the
wrong mood on hard reload; footer year is current; the case study page renders.

## Deploy

Push to `master` → `.github/workflows/deploy.yml` (Node 24) runs `npm run build`
and publishes `./out` to the `github-pages` environment. The custom domain is
preserved via `public/CNAME`. Only commit/push when the user asks.
