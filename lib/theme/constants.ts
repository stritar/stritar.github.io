/** The two themes that drive the entire visual system. */
export const THEMES = ["light", "dark"] as const;
export type Theme = (typeof THEMES)[number];

/** A user preference is a fixed theme, or "system" (follow prefers-color-scheme). */
export const THEME_PREFS = [...THEMES, "system"] as const;
export type ThemePref = (typeof THEME_PREFS)[number];

export const DEFAULT_THEME: Theme = "light";
export const DEFAULT_PREF: ThemePref = "system";

/** localStorage key. */
export const STORAGE_KEY = "themePref";

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

export function isThemePref(value: unknown): value is ThemePref {
  return (
    typeof value === "string" && (THEME_PREFS as readonly string[]).includes(value)
  );
}
