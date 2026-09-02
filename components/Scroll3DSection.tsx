"use client";

import { type ReactNode, useEffect, useRef } from "react";

type Scroll3DSectionProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const baseTransform = "translate3d(0, 0, 0) scale(1)";

export default function Scroll3DSection({
  children,
  className = "",
  intensity = 1,
}: Scroll3DSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const disabledRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const updatePreference = () => {
      disabledRef.current = motionQuery.matches || mobileQuery.matches;
      if (disabledRef.current && sectionRef.current) {
        sectionRef.current.style.transform = baseTransform;
        sectionRef.current.style.opacity = "1";
      }
    };

    updatePreference();

    motionQuery.addEventListener?.("change", updatePreference);
    mobileQuery.addEventListener?.("change", updatePreference);
    return () => {
      motionQuery.removeEventListener?.("change", updatePreference);
      mobileQuery.removeEventListener?.("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    const updateTransform = () => {
      const section = sectionRef.current;
      if (!section) return;

      if (disabledRef.current) {
        section.style.transform = baseTransform;
        section.style.opacity = "1";
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = rect.top + rect.height / 2;
      const distanceFromCenter = (sectionCenter - viewportCenter) / window.innerHeight;
      const distance = clamp(Math.abs(distanceFromCenter), 0, 1.5);

      const translateY = clamp(distanceFromCenter * -54 * intensity, -72, 72);
      const translateZ = clamp((1 - distance) * 48 * intensity, -24, 48);
      const rotateX = clamp(distanceFromCenter * -6 * intensity, -8, 8);
      const rotateY = clamp(distanceFromCenter * 4 * intensity, -6, 6);
      const scale = 1 - clamp(distance * 0.03 * intensity, 0, 0.05);
      const opacity = 1 - clamp(distance * 0.15, 0, 0.2);

      section.style.transform = `translate3d(0, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
      section.style.opacity = String(opacity);
    };

    const scheduleUpdate = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(updateTransform);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [intensity]);

  return (
    <section
      ref={sectionRef}
      className={`relative transform-gpu [transform-style:preserve-3d] [backface-visibility:hidden] [perspective:1200px] motion-safe:will-change-transform ${className}`}
      style={{ transform: baseTransform, opacity: 1, transition: "transform 180ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease-out" }}
    >
      {children}
    </section>
  );
}
