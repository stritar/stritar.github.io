---
name: work-on-the-webgl-scene
description: Safely edit the interactive WebGL/3D hero (React Three Fiber, three.js, drei) on denisstritar.com — the cursor-following model, HDR lighting, mood crossfade, performance, and assets. Use when changing the 3D background, models, environment lighting, camera, or motion.
---

# Work on the WebGL scene

All 3D code is the one sanctioned `"use client"` island under
`components/webgl/`. Stack: `three` + `@react-three/fiber` v9 + `@react-three/drei` v10 (React 19 compatible — keep this triple).

## File map

| File | Role |
|---|---|
| `hero-mount.tsx` | Client wrapper; `dynamic(import('./hero-canvas'), { ssr:false })`. **Required boundary** — `ssr:false` from a Server Component errors in Next 16. |
| `hero-canvas.tsx` | `<Canvas>` (alpha, antialias, dpr [1,2], ACESFilmic, fov 35). Visibility pause + idle preload. |
| `scene.tsx` | `<Environment>` (HDR IBL, `background={false}`) + `<ModelCrossfade>` + `<AdaptiveDpr>`. |
| `model.tsx` | `useGLTF`, centering, camera fit, per-frame cursor easing, opacity crossfade. |
| `use-pointer-target.ts` | Pointer→target; touch drift; reduced-motion. |
| `webgl-assets.ts` | Mood→URL maps, `MOTION` constants, `CROSSFADE_SECONDS`. |

## Rules & gotchas

- **Never import 3D from a Server Component.** Only `HeroMount` is referenced by
  `app/`; everything else loads via its `ssr:false` chunk so nothing 3D runs at
  build (`output: "export"` would otherwise throw "window is not defined").
- Assets are `/assets/models/model-<mood>.glb` + `/assets/hdr/<mood>.hdr` in
  `public/`. New models should match the existing scale (camera fits once).
- The scene reads the active mood from `useTheme()` (theme context), not the DOM.
- Keep it pointer-transparent (`pointerEvents: "none"`) and behind content (`z-0`).
- Respect: `prefers-reduced-motion` (static), touch drift, tab-hidden pause.
- Tuning lives in `MOTION` (`EASE 0.02`, `MAX_YAW 0.8`, `MAX_PITCH 0.45`, shifts).
  The lerp is frame-rate-dependent (ported verbatim); if you need fps-independence,
  switch to `1 - Math.exp(-k * delta)` in the `useFrame`.

## Verify

`npm run build` (must pass, no "window is not defined"), then `npm run preview`
and in a browser: model renders per mood, cursor easing on desktop / drift on a
narrow touch viewport / static under reduced-motion, mood switch crossfades, and
the render loop pauses when the tab is backgrounded.
