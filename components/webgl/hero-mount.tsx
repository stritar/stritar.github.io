"use client";

import dynamic from "next/dynamic";

/**
 * Client-only mount point for the WebGL hero. `dynamic(..., { ssr: false })`
 * must be called from a Client Component (it errors in a Server Component under
 * Next 16), so this thin wrapper is the boundary. The home page (a Server
 * Component) renders <HeroMount /> directly.
 */
const HeroCanvas = dynamic(
  () => import("./hero-canvas").then((m) => m.HeroCanvas),
  { ssr: false, loading: () => null },
);

export function HeroMount() {
  return <HeroCanvas />;
}
