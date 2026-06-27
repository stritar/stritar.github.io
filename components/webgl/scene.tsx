"use client";

import { Suspense } from "react";
import { AdaptiveDpr, Environment } from "@react-three/drei";
import { useTheme } from "@/components/theme/theme-provider";
import { ThemeModels } from "./model";
import { usePointerTarget } from "./use-pointer-target";
import { hdrUrl } from "./webgl-assets";

/** The R3F scene graph: HDR image-based lighting + the cursor-following model. */
export function Scene() {
  const { effective } = useTheme();
  const target = usePointerTarget();

  return (
    <>
      {/* HDR provides reflections/lighting only — the gradient DOM layers are
          the visible background, so background={false}. Its own Suspense
          boundary: an uncached HDR must never unmount the models. While it
          loads, the previous EnvironmentCube stays committed, so the old
          lighting holds until the new HDR commits (no dark frame). Both HDRs
          preload, so the swap is instant. Leave it unkeyed so drei swaps
          `files` in place. */}
      <Suspense fallback={null}>
        <Environment files={hdrUrl(effective)} background={false} />
      </Suspense>
      <ThemeModels theme={effective} target={target} />
      <AdaptiveDpr pixelated={false} />
    </>
  );
}
