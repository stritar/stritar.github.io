/**
 * Pre-hydration theme script. Runs synchronously in <head> before first paint
 * to set [data-theme] from the stored preference, falling back to the OS
 * colour-scheme for "system" — preventing a flash of the wrong theme. Keep it
 * dependency-free and in sync with lib/theme.
 */
const script = `(function(){
  try {
    var KEY = "themePref";
    var THEMES = ["light","dark"];
    var saved = localStorage.getItem(KEY);
    var pref = (saved === "system" || THEMES.indexOf(saved) !== -1) ? saved : "system";
    var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = (pref === "system") ? (systemDark ? "dark" : "light") : pref;
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = "light";
  }
})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} suppressHydrationWarning />;
}
