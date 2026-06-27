# denisstritar.com

Portfolio for Denis Stritar (product designer): an interactive **time-of-day
WebGL hero** over a four-mood design system. Built with Next.js + React Three
Fiber + MDX, statically exported and deployed to GitHub Pages at
[denisstritar.com](https://denisstritar.com).

## Develop

Requires Node ≥22 (CI uses Node 24).

```
npm install
npm run dev
```

| Script | Purpose |
|---|---|
| `npm run dev` | Local dev server (Turbopack) |
| `npm run build` | Static export → `out/` (fetches Google Fonts — needs network) |
| `npm run preview` | Preview the built site in `out/` |
| `npm run typecheck` | TypeScript type check |
| `npm run lint` | Next.js ESLint |

## How it's built

- **Design system** — tokens in [app/globals.css](./app/globals.css), documented
  in [docs/tokens.md](./docs/tokens.md), mirrored in a Figma library. Four
  time-of-day moods driven by `[data-theme]`.
- **WebGL hero** — [components/webgl/](./components/webgl/), a single
  `ssr:false` React Three Fiber island (three + drei). Models/HDR in
  [public/assets/](./public/assets/).
- **Theme logic** — [lib/theme/](./lib/theme/) + [components/theme/](./components/theme/)
  (mood resolution via local sunrise/sunset, pre-hydration FOUC script).
- **Content** — case studies in `content/projects/*.mdx`
  ([content-collections.ts](./content-collections.ts), [lib/projects.ts](./lib/projects.ts)).

## Deploy

Pushing to `master` triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
(Node 24): builds to `out/` and publishes to the `github-pages` environment. The
custom domain is preserved via [public/CNAME](./public/CNAME).

## AI agents

[AGENTS.md](./AGENTS.md) is the canonical rule set (the hub); task playbooks live
in [`.claude/skills/`](./.claude/skills/). `CLAUDE.md` and
`.github/copilot-instructions.md` are thin pointers to AGENTS.md.
