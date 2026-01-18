"use client";

import { useEffect, useRef, useState, memo } from "react";
import { techStacks } from "@/configs/techstacks";
import { useApp } from "@/context/AppProvider";
import { GrAd } from "react-icons/gr"

interface TechStackItemProps {
  stack: any;
  index: number;
  isActive: boolean;
  isLast: boolean;
  setRef: (el: HTMLDivElement | null) => void;
}

const TechStackItem = memo(function TechStackItem({
  stack,
  index,
  isActive,
  isLast,
  setRef
}: TechStackItemProps) {
  const { t } = useApp();

  return (
    <div
      ref={setRef}
      data-index={index}
      className={`relative transition-all duration-500 ${isActive ? "opacity-100" : "opacity-40"
        }`}
    >
      {/* TOP CONNECTOR */}
      {index !== 0 && (
        <div
          className={`absolute -top-24 left-6 h-24 w-px transition-all duration-500 ${isActive
            ? "bg-cyan-400 shadow-[0_0_24px_rgba(34,211,238,0.9)]"
            : "bg-white/10"
            }`}
        />
      )}

      {/* BOTTOM CONNECTOR */}
      {!isLast && (
        <div
          className={`absolute -bottom-24 left-6 h-24 w-px transition-all duration-500 ${isActive
            ? "bg-cyan-400 shadow-[0_0_24px_rgba(34,211,238,0.9)]"
            : "bg-white/10"
            }`}
        />
      )}

      {/* Content Row */}
      <div className="flex flex-col gap-8 sm:flex-row sm:gap-10">
        {/* Icons */}
        <div className="flex flex-row sm:flex-col items-start sm:items-center gap-4 sm:gap-4">
          {stack.icons.map(({ icon: Icon, color }: any, i: number) => (
            <div
              key={i}
              className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-500 ${isActive
                ? "border-white/40 scale-105 ring-1 ring-cyan-400/40"
                : "border-white/10"
                }`}
              style={{
                boxShadow: isActive
                  ? `0 0 24px ${color}88`
                  : "none",
              }}
            >
              <Icon size={22} color={color} />
            </div>
          ))}
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <p className="max-w-3xl text-sm leading-relaxed">
            {t(stack.descriptionKey)}
          </p>

          {stack.additionalLibraries?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {stack.additionalLibraries.map((lib: any) => (
                <span
                  key={lib.text}
                  className={`rounded-md border px-3 py-1 text-xs transition-all duration-500 ${isActive
                    ? "border-white/20 opacity-100"
                    : "border-white/10 opacity-50"
                    }`}
                  style={{
                    color: lib.color,
                    boxShadow: isActive
                      ? `0 0 12px ${lib.color}55`
                      : "none",
                  }}
                >
                  {lib.text}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default function TechStacks() {
  const { t } = useApp();
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // -----------------------------
  // IntersectionObserver for precise center focus
  // -----------------------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const viewportCenter = window.innerHeight / 2;

        let closestIndex: number | null = null;
        let closestDistance = Infinity;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const rect = entry.boundingClientRect;
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = Number(entry.target.getAttribute("data-index"));
          }
        });

        if (closestIndex !== null) {
          setActiveIndex(closestIndex);
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6">
      {/* Header */}
      <div className="mb-10 max-w-3xl">

        <h2 className="mb-6 text-3xl font-semibold  flex gap-2 items-center tracking-tight">
          <GrAd className="text-green-400" />
          {t("systemArchitectureTitle")}
        </h2>
        <p className="text-sm leading-relaxed opacity-80">
          {t("systemArchitectureDescription")}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative space-y-24">
        {techStacks.map((stack, index) => (
          <TechStackItem
            key={stack.id}
            stack={stack}
            index={index}
            isActive={index === activeIndex}
            isLast={index === techStacks.length - 1}
            setRef={(el) => {
              refs.current[index] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}
