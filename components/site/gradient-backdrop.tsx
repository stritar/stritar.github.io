/**
 * Fixed full-viewport gradient behind the WebGL canvas. Both theme layers are
 * always mounted; CSS flips their opacity from `[data-theme]` on <html> (a
 * 600ms fade via `.bg-layer`'s transition). No JS state — matches the
 * prototype's hard theme switch. Decorative only (aria-hidden).
 */
export function GradientBackdrop() {
  return (
    <div className="bg-stack" aria-hidden="true">
      <div className="bg-layer" data-mood="light" />
      <div className="bg-layer" data-mood="dark" />
    </div>
  );
}
