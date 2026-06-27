---
name: sync-tokens-to-figma
description: Keep the Figma "Portfolio" design-system library in parity with the code tokens in app/globals.css (colours/moods, type, grid, glass, radii). Use when design tokens change in code and need pushing to Figma, or when (re)generating the Figma foundations.
---

# Sync tokens to Figma

Code (`app/globals.css`) is the **source of truth**; Figma mirrors it.
`docs/tokens.md` is the human-readable spec — reconcile all three.

- **Figma file:** `349PM1Y6rT8aFFf1NY28ky` ("Portfolio"), page `0:1`.
- **Tooling:** use the `figma-generate-library` skill (Figma MCP server) driving
  the `figma-remote` MCP tools. Run `/figma-generate-library` first.

## What maps to what

| Code token | Figma |
|---|---|
| Four moods (`[data-theme]`) | one **variable collection** with 4 **modes**: morning/noon/evening/night |
| `--text`, `--bg-base`, `--btn-bg`, `--btn-text`, `--glass`, `--hairline` + gradient stops | **color variables** in that collection (values per `docs/tokens.md`) |
| Campton / Inter / Roboto Mono + type scale | **text styles** (h1 32/24 … body 16/14 … mono) |
| `grid-page` (4/8/12, pad 16/24/96, gap 16/24/32) | **layout grid styles** |
| `glass` (`blur(24px)`) | **effect style** |
| `--radius-sm/md/lg/xl`, spacing | number/variable tokens |

Also lay out a **"Foundations" cover frame** (swatches, type specimens, grid +
glass samples) so the page is human-readable, not just raw variables.

## Parity rule

There is no automated sync yet. On any token change in `globals.css`: update the
matching Figma variable/style **and** `docs/tokens.md` in the same change. A
future improvement is wiring Figma Code Connect / `DesignSync`.
