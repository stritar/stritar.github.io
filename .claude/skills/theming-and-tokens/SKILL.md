---
name: theming-and-tokens
description: Change the visual design system of denisstritar.com — colours, the four time-of-day moods, typography, spacing, radii, glass, the grid — and the theme logic (mood resolution, FOUC script, geolocation/solar fallback). Use when adjusting look-and-feel, adding/tweaking a mood, or touching theme behaviour.
---

# Theming & tokens

Source of truth: `app/globals.css`. Human reference: `docs/tokens.md`. Figma
mirrors it (see `sync-tokens-to-figma`).

## Tokens (`app/globals.css`)

- **Per-mood palettes** are `:root[data-theme="<mood>"]` blocks setting runtime
  variables (`--text`, `--bg-base`, `--btn-bg`, `--glass`, `--hairline`, …).
- `@theme inline` maps those to Tailwind utilities (`text-fg`, `bg-base`,
  `bg-glass`, `border-hairline`, `font-heading`, …) — so flipping `[data-theme]`
  re-themes everything. **Components must use these utilities, never raw hex.**
- Gradients per mood are raw CSS (`.bg-layer[data-mood="…"]`), crossfaded by
  `components/site/gradient-backdrop.tsx` (gradients can't be tweened).
- `grid-page` (4/8/12 cols) and `glass` (blur 24px) are `@utility` blocks.

### To tweak or add a mood

1. Edit/add the `:root[data-theme="<mood>"]` palette + the matching
   `.bg-layer[data-mood="<mood>"]` gradient in `globals.css`.
2. If adding a *new* mood name, update `MOODS` in `lib/theme/constants.ts`, the
   bucket logic in `lib/theme/solar.ts`, the FOUC script in
   `components/theme/theme-script.tsx`, and `LABELS` in
   `components/theme/theme-switch.tsx`.
3. Mirror it into Figma and `docs/tokens.md`.

## Theme logic (`lib/theme/` + `components/theme/`)

- `solar.ts` / `geo.ts` are pure: clock buckets + geolocated sunrise/sunset.
- `theme-provider.tsx` holds `{ pref, effective, setPref }`, persists `themePref`,
  re-ticks hourly and on tab refocus for `system`.
- **FOUC invariant:** `theme-script.tsx` runs synchronously in `<head>` and sets
  `[data-theme]` before paint. Keep it dependency-free and its bucket hours
  (6/11/16/20) in sync with `constants.ts`. The provider refines `system` via
  geolocation *after* hydration — never block first paint on the geo prompt.
- `<html>` has `suppressHydrationWarning` because the script mutates it pre-hydration.

## Verify

`npm run build` then `npm run preview`: each mood button recolours text +
gradient + buttons; "Auto" resolves to local time of day; no flash of the wrong
mood on hard reload.
