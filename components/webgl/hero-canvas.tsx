"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useEnvironment } from "@react-three/drei";
import { ACESFilmicToneMapping } from "three";
import { Scene } from "./scene";
import { ALL_MODEL_URLS, ALL_HDR_URLS } from "./webgl-assets";

/**
 * The WebGL hero canvas — fixed, full-viewport, pointer-transparent, behind all
 * content. Pauses its render loop when the tab is hidden, and idle-preloads the
 * other moods' models so switching is instant.
 *
 * Loaded only via HeroMount's dynamic(ssr:false) import so nothing 3D runs at
 * build time (static export safe).
 */
export function HeroCanvas() {
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  useEffect(() => {
    const onVisibility = () =>
      setFrameloop(document.hidden ? "never" : "always");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Preload all mood models and HDRs when the browser is idle (active mood
  // already loads on demand via Suspense). Makes mood switches feel instant and
  // keeps an uncached HDR from stalling the Environment swap.
  useEffect(() => {
    const idle: (cb: () => void) => number =
      window.requestIdleCallback ?? ((cb) => window.setTimeout(cb, 600));
    const handle = idle(() => {
      for (const url of ALL_MODEL_URLS) useGLTF.preload(url);
      for (const url of ALL_HDR_URLS) useEnvironment.preload({ files: url });
    });
    return () => window.cancelIdleCallback?.(handle as number);
  }, []);

  return (
    <Canvas
      aria-hidden
      frameloop={frameloop}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ fov: 35, near: 0.1, far: 1000, position: [0, 0, 5] }}
      onCreated={({ gl }) => {
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 1;
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
