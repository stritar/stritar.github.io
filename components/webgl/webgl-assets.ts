import { THEMES, type Theme } from "@/lib/theme/constants";

/** Public-path URL helpers for the per-theme 3D + lighting assets. */
export const modelUrl = (theme: Theme) => `/assets/models/model-${theme}.glb`;
export const hdrUrl = (theme: Theme) => `/assets/hdr/${theme}.hdr`;

export const ALL_MODEL_URLS = THEMES.map(modelUrl);
export const ALL_HDR_URLS = THEMES.map(hdrUrl);

/** Cursor-follow tuning — ported verbatim from the prototype. */
export const MOTION = {
  MAX_YAW: 0.8,
  MAX_PITCH: 0.45,
  MAX_SHIFT_X: 0.25,
  MAX_SHIFT_Y: 0.15,
  EASE: 0.02,
} as const;
