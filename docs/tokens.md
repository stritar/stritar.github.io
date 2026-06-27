# Design tokens

The single source of truth is [`app/globals.css`](../app/globals.css). This is
the human-readable mirror. The Figma "Portfolio" library mirrors these too —
keep all three in sync (see `.claude/skills/sync-tokens-to-figma`).

## Theming model

The site has **four time-of-day moods**, selected by `[data-theme]` on `<html>`:
`morning`, `noon`, `evening`, `night`. There is no separate light/dark — the
moods _are_ the theme. Every colour utility resolves through CSS variables that
`[data-theme]` re-points, so one attribute flip re-themes everything.

"Auto" (the `system` preference) resolves the mood from the visitor's local
sunrise/sunset (geolocation) and falls back to clock buckets
(6–11 morning · 11–16 noon · 16–20 evening · else night).

## Colour palettes

| Token (`--color-*`) | morning | noon | evening | night |
|---|---|---|---|---|
| `fg` (text) | `#2F2F2F` | `#2F2F2F` | `#F7F5F4` | `#F7F5F4` |
| `base` (page bg) | `#F2EFEA` | `#EDECEB` | `#373330` | `#292623` |
| `btn` / `btn-fg` | dark `rgba(47,47,47,.85)` / `#F7F5F4` | same | light `rgba(247,245,244,.85)` / `#2F2F2F` | same |
| `glass` | `rgba(255,255,255,.35)` | same | `rgba(0,0,0,.35)` | same |
| `hairline` | `rgba(47,47,47,.12)` | same | `rgba(247,245,244,.14)` | same |

Gradient backdrops (radial over linear, non-interpolable → crossfaded by two layers):

| mood | radial | linear |
|---|---|---|
| morning | `#ffffff → #F4E9D8` | `#F0D8B8 → #D7BFA6 → #9A8C7A` |
| noon | `#ffffff → #D6D5DB` | `#E8E8EA → #D9D7D5 → #B8B5B2` |
| evening | `#FFD8C2 → #B28B7C` | `#4A3F38 → #3C3530 → #2F2A26` |
| night | `#4A4A52 → #2E2C2A` | `#222324 → #292623 → #3D3A37` |

## Typography

| Role | Family | Tailwind | Sizes |
|---|---|---|---|
| Headings | Campton (self-hosted) | `font-heading` | h1 24 → 32px · h2 20 → 24px · h3 18 → 20px |
| Body | Inter | `font-body` / default | 14 → 16px |
| Code / labels | Roboto Mono | `font-mono` | — |

(`→` = mobile → desktop, the desktop value kicks in at ≥769px.)

## Layout & surfaces

- **Grid** — `grid-page` utility: 4 cols (≤390px) / 8 (391–768) / 12 (≥769);
  padding 16 / 24 / 96; gap 16 / 24 / 32; `max-width: 1440px`, centered.
- **Glass** — `glass` utility: `backdrop-filter: blur(24px)` + mood-aware
  `--color-glass` fill + 1px `--color-hairline` border.
- **Radii** — `--radius-sm 6 · md 8 · lg 12 · xl 16`px (`rounded-sm/md/lg/xl`).

## Tailwind utility cheatsheet

`text-fg` · `bg-base` · `bg-btn` / `text-btn-fg` / `bg-btn-hover` ·
`bg-glass` / `bg-glass-hover` · `border-hairline` · `font-heading` /
`font-body` / `font-mono` · `glass` · `grid-page`. Opacity modifiers work as
usual (`text-fg/70`).
