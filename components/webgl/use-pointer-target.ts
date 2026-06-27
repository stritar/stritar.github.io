"use client";

import { useEffect, useRef } from "react";
import { MOTION } from "./webgl-assets";

export interface PointerTarget {
  yaw: number;
  pitch: number;
  shiftX: number;
  shiftY: number;
}

const ZERO: PointerTarget = { yaw: 0, pitch: 0, shiftX: 0, shiftY: 0 };

/**
 * Returns a ref holding the desired model orientation/offset. On desktop it
 * tracks the pointer; on phones it drifts to random targets; under
 * prefers-reduced-motion it stays centered. The animation loop eases the
 * model toward this target each frame (see ModelInstance).
 */
export function usePointerTarget() {
  const target = useRef<PointerTarget>({ ...ZERO });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      target.current = { ...ZERO };
      return;
    }

    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const narrow = Math.min(window.innerWidth, window.innerHeight) < 768;
    const likelyPhone = touch && narrow;

    const { MAX_YAW, MAX_PITCH, MAX_SHIFT_X, MAX_SHIFT_Y } = MOTION;

    if (likelyPhone) {
      const randomize = () => {
        target.current = {
          yaw: (Math.random() * 2 - 1) * MAX_YAW,
          pitch: (Math.random() * 2 - 1) * MAX_PITCH,
          shiftX: (Math.random() * 2 - 1) * MAX_SHIFT_X,
          shiftY: (Math.random() * 2 - 1) * MAX_SHIFT_Y,
        };
      };
      randomize();
      const timer = setInterval(randomize, 3500 + Math.random() * 2000);
      return () => clearInterval(timer);
    }

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
      const ny = (e.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
      target.current = {
        yaw: nx * MAX_YAW,
        pitch: ny * MAX_PITCH,
        shiftX: -nx * MAX_SHIFT_X,
        shiftY: ny * MAX_SHIFT_Y,
      };
    };
    const onLeave = () => {
      target.current = { ...ZERO };
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return target;
}
