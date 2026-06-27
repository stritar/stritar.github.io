"use client";

import { THEME_PREFS, type ThemePref } from "@/lib/theme/constants";
import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";

const LABELS: Record<ThemePref, string> = {
  light: "Light",
  dark: "Dark",
  system: "Auto",
};

/** Glass segmented control for choosing a theme (or "Auto" = system). */
export function ThemeSwitch({ className }: { className?: string }) {
  const { pref, effective, setPref } = useTheme();

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={cn("glass inline-flex gap-1 rounded-md p-1", className)}
    >
      {THEME_PREFS.map((value) => {
        const active = pref === value;
        const title =
          value === "system" ? `Follows your system preference (${effective})` : undefined;
        return (
          <button
            key={value}
            type="button"
            title={title}
            aria-pressed={active}
            onClick={() => setPref(value)}
            className={cn(
              "cursor-pointer rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
              "text-fg/70 hover:text-fg",
              active && "bg-btn text-btn-fg hover:text-btn-fg",
            )}
          >
            {LABELS[value]}
          </button>
        );
      })}
    </div>
  );
}
