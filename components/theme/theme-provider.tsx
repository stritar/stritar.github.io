"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  DEFAULT_PREF,
  DEFAULT_THEME,
  isTheme,
  isThemePref,
  STORAGE_KEY,
  type Theme,
  type ThemePref,
} from "@/lib/theme/constants";

interface ThemeContextValue {
  /** The user's stored preference (a fixed theme or "system"). */
  pref: ThemePref;
  /** The currently-applied theme (what "system" resolved to). */
  effective: Theme;
  setPref: (pref: ThemePref) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

/** Resolve "system" to a theme via the OS/browser colour-scheme preference. */
function systemTheme(): Theme {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [pref, setPrefState] = useState<ThemePref>(DEFAULT_PREF);
  const [effective, setEffective] = useState<Theme>(DEFAULT_THEME);

  const applyEffective = useCallback((nextPref: ThemePref): Theme => {
    const theme = nextPref === "system" ? systemTheme() : nextPref;
    setEffective(theme);
    applyTheme(theme);
    return theme;
  }, []);

  // Initialise from storage; adopt whatever the pre-hydration script painted.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initialPref: ThemePref = isThemePref(stored) ? stored : DEFAULT_PREF;
    setPrefState(initialPref);

    const painted = document.documentElement.dataset.theme;
    if (isTheme(painted)) setEffective(painted);

    applyEffective(initialPref);
  }, [applyEffective]);

  // While on "system", follow live OS colour-scheme changes.
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if ((isThemePref(stored) ? stored : DEFAULT_PREF) === "system") {
        applyEffective("system");
      }
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [applyEffective]);

  const setPref = useCallback(
    (next: ThemePref) => {
      setPrefState(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* private mode / storage disabled — non-fatal */
      }
      applyEffective(next);
    },
    [applyEffective],
  );

  return (
    <ThemeContext.Provider value={{ pref, effective, setPref }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
