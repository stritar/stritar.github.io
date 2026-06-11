# denisstritar.com

Portfolio site for Denis Stritar (product designer). Built with Astro + MDX, deployed to GitHub Pages at [denisstritar.com](https://denisstritar.com).

## Develop

```
nvm use        # Node 24 (see .nvmrc)
npm install
npm run dev
```

| Script | Purpose |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Static build → `dist/` |
| `npm run preview` | Preview the built site |
| `npm run check` | Astro + TypeScript type check |

## Content

Portfolio projects live in `src/content/projects/` as MDX files. See [AGENTS.md](./AGENTS.md) for the content model and how to add a new project.

## Deploy

Pushing to `master` triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds with Node 24 and publishes `dist/` to the `github-pages` environment. The custom domain (`denisstritar.com`) is preserved via [public/CNAME](public/CNAME) and Jekyll is disabled via [public/.nojekyll](public/.nojekyll).

## Legacy

The old site lives under [`archive/`](archive/). It is not built or deployed — kept as a reference only.

## AI agents

[AGENTS.md](./AGENTS.md) is the canonical rule set for any AI coding agent working in this repo. `CLAUDE.md` and `.github/copilot-instructions.md` are thin pointers to it.
