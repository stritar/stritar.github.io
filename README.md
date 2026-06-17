# denisstritar.com

Portfolio site for Denis Stritar (product designer). Built with Next.js + MDX, statically exported and deployed to GitHub Pages at [denisstritar.com](https://denisstritar.com).

## Develop

Requires Node ≥22 (CI uses Node 24).

```
npm install
npm run dev
```

| Script | Purpose |
|---|---|
| `npm run dev` | Local dev server (Turbopack) |
| `npm run build` | Static export → `out/` |
| `npm run preview` | Preview the built site in `out/` |
| `npm run typecheck` | TypeScript type check |
| `npm run lint` | Next.js ESLint |

## Content

Portfolio projects live in `content/projects/` as MDX files. Schema and compile pipeline: [content-collections.ts](./content-collections.ts). Helpers: [lib/projects.ts](./lib/projects.ts). See [AGENTS.md](./AGENTS.md) for the content model and how to add a new project.

## Deploy

Pushing to `master` triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds with Node 24, exports the static site to `out/`, and publishes it to the `github-pages` environment. The custom domain (`denisstritar.com`) is preserved via [public/CNAME](public/CNAME).

## Legacy

The old site lives under [`archive/`](archive/). It is not built or deployed — kept as a reference only.

## AI agents

[AGENTS.md](./AGENTS.md) is the canonical rule set for any AI coding agent working in this repo. `CLAUDE.md` and `.github/copilot-instructions.md` are thin pointers to it.
