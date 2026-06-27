"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Box3, Group, Mesh, PerspectiveCamera, Vector3 } from "three";
import { THEMES, type Theme } from "@/lib/theme/constants";
import { MOTION, modelUrl } from "./webgl-assets";
import type { PointerTarget } from "./use-pointer-target";

/**
 * One GLB instance: centered, camera-fit, and pointer-eased. Toggled in/out via
 * `visible` rather than crossfaded — matches the prototype's hard theme switch,
 * which avoids the flicker of fading two huge transparent models.
 */
function ModelInstance({
  url,
  target,
  visible,
}: {
  url: string;
  target: React.RefObject<PointerTarget>;
  visible: boolean;
}) {
  const { scene } = useGLTF(url);
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const group = useRef<Group>(null);
  const curr = useRef<PointerTarget>({ yaw: 0, pitch: 0, shiftX: 0, shiftY: 0 });

  // Clone so each theme owns its own object. Center it and disable frustum
  // culling (it fills the screen, so the bounding sphere often reads as off).
  const object = useMemo(() => {
    const clone = scene.clone(true);
    const box = new Box3().setFromObject(clone);
    const center = box.getCenter(new Vector3());
    clone.position.sub(center);
    clone.traverse((o) => {
      const mesh = o as Mesh;
      if (mesh.isMesh) {
        mesh.frustumCulled = false;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });
    return clone;
  }, [scene]);

  // Fit the camera to the model once (distance from bounding sphere). Both
  // themes share near-identical bounds, so fitting each is equivalent.
  useEffect(() => {
    const box = new Box3().setFromObject(object);
    const size = box.getSize(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const fov = (camera.fov * Math.PI) / 180;
    const dist = ((maxDim / 2) / Math.tan(fov / 2)) * 1.3;
    camera.position.set(0, size.y * 0.15, dist);
    camera.lookAt(0, 0, 0);
    camera.near = Math.max(0.01, dist / 100);
    camera.far = dist * 100;
    camera.updateProjectionMatrix();
  }, [object, camera]);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const t = target.current;
    const c = curr.current;
    const E = MOTION.EASE;
    c.yaw += (t.yaw - c.yaw) * E;
    c.pitch += (t.pitch - c.pitch) * E;
    c.shiftX += (t.shiftX - c.shiftX) * E;
    c.shiftY += (t.shiftY - c.shiftY) * E;
    g.rotation.set(c.pitch, c.yaw, 0);
    g.position.set(c.shiftX, c.shiftY, 0);
  });

  return (
    <group ref={group} visible={visible}>
      <primitive object={object} />
    </group>
  );
}

/**
 * Renders both themes' models at once and toggles which is visible. With both
 * GLBs (and both HDRs) preloaded, switching themes is instant and glitch-free.
 */
export function ThemeModels({
  theme,
  target,
}: {
  theme: Theme;
  target: React.RefObject<PointerTarget>;
}) {
  return (
    <>
      {THEMES.map((t) => (
        <ModelInstance
          key={t}
          url={modelUrl(t)}
          target={target}
          visible={t === theme}
        />
      ))}
    </>
  );
}
