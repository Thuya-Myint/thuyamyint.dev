"use client";

import { useEffect, useState, useMemo } from "react";
import { journeyData } from "../../configs/journey";
import { useApp } from "../../context/AppProvider";

export default function Journey() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  if (!mounted) return <div className="bg-[#020202] h-[100dvh] w-screen" />;

  return (
    <div className="bg-[#020202] min-h-screen selection:bg-orange-500/30 font-sans antialiased text-white overflow-x-hidden">
      {/* CSS-only Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #333 1px, transparent 1px),
              linear-gradient(to bottom, #333 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#020202_100%)]" />
      </div>

      {/* CRT Scanlines - Static */}
      <div className="fixed inset-0 pointer-events-none z-[90] opacity-[0.03]
        bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)]
        bg-[length:100%_2px]"
      />

      <JourneyContent />
    </div>
  );
}

function JourneyContent() {
  const { t } = useApp();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -30% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = entry.target.getAttribute("data-index");
          if (index !== null) {
            setActiveIndex(Number(index));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll(".journey-focus-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const translatedJourney = useMemo(() => {
    return journeyData.map((item) => {
      let key = item.year;
      if (item.year === "2024 - 2025") key = "2024_2025";
      if (item.year === "2025 - Present") key = "2025_present";

      return {
        ...item,
        title: t(`journey_${key}_title`),
        description: t(`journey_${key}_desc`),
        details: t(`journey_${key}_detail`),
      };
    });
  }, [t]);

  return (
    <main className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 py-20 md:py-40">
      {/* Hero Section */}
      <header
        data-index={0}
        className={`journey-focus-section mb-40 md:mb-64 relative ${activeIndex === 0 ? "is-active" : ""}`}
      >
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[120px]" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 md:gap-6 mb-12">
            <div className="h-px w-12 md:w-24 bg-gradient-to-r from-orange-500 to-transparent" />
            <span className="text-orange-500 font-mono text-xs md:text-sm tracking-[0.2em] md:tracking-[0.5em] uppercase">
              {t("journey_hero_badge")}
            </span>
          </div>

          <h1 className="text-[12vw] md:text-[12rem] lg:text-[15rem] font-black tracking-tighter leading-[0.8] md:leading-[0.75] mb-12 md:mb-20 break-words">
            <span className="block text-white/10 hover:text-white/20 transition-colors duration-700">{t("journey_hero_title")}</span>
            <span className="block text-white">{t("journey_hero_subtitle")}</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-green-400 to-blue-500">
              2021_2026
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-7">
              <p className="text-gray-400 text-xl md:text-4xl leading-[1.2] md:leading-[1.1] font-medium tracking-tight break-words">
                {t("journey_hero_description")}
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="h-px w-full bg-white/10" />
              <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                <div className="space-y-1">
                  <div className="text-white/40">{t("journey_location")}</div>
                  <div>{t("journey_location_val")}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-white/40">{t("journey_status")}</div>
                  <div className="text-green-500">{t("journey_status_val")}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-white/40">{t("journey_version")}</div>
                  <div>{t("journey_version_val")}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-white/40">{t("journey_last_update")}</div>
                  <div>{t("journey_last_update_val")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Journey Grid */}
      <div className="relative space-y-32 md:space-y-64 overflow-hidden">
        {translatedJourney.map((item, i) => (
          <section
            key={i}
            data-index={i + 1}
            className={`journey-focus-section group relative ${activeIndex === i + 1 ? "is-active" : ""}`}
          >
            {/* Background Index */}
            <div
              className={`absolute -top-10 md:-top-20 left-0 text-[8rem] md:text-[30rem] lg:text-[40rem] font-black select-none pointer-events-none transition-all duration-1000 leading-none ${activeIndex === i + 1 ? "text-orange-500/10" : "text-white/[0.02]"
                }`}
            >
              0{i + 1}
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-24 items-start px-4 md:px-0">
              {/* Left: The Year & Phase */}
              <div className="md:col-span-4">
                <div className="md:sticky md:top-40 space-y-6 md:space-y-8">
                  <div className="inline-block px-4 md:px-6 py-1 md:py-2 rounded-full bg-white/5 border border-white/10 text-orange-500 font-mono text-base md:text-lg font-bold tracking-tighter">
                    {item.year}
                  </div>
                  <div className="space-y-2">
                    <h3 className={`text-3xl md:text-6xl font-black leading-none tracking-tighter uppercase transition-colors duration-1000 ${activeIndex === i + 1 ? "text-orange-500" : "text-white"
                      }`}>
                      Phase<br className="hidden md:block" />_0{i + 1}
                    </h3>
                    <div className="h-1 w-16 md:w-20 bg-gradient-to-r from-orange-500 to-transparent" />
                  </div>

                  {/* Decorative Data Points */}
                  <div className="hidden md:block space-y-4 pt-12">
                    {[1, 2, 3].map(n => (
                      <div key={n} className="flex items-center gap-3 opacity-20 group-hover:opacity-40 transition-opacity">
                        <div className="w-1 h-1 bg-white rounded-full" />
                        <div className="h-px flex-grow bg-white/20" />
                        <div className="font-mono text-[8px] text-white">DATA_STREAM_0{n}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: The Content Bento */}
              <div className="md:col-span-8 space-y-8 md:space-y-12 w-full max-w-full overflow-hidden">
                <div
                  className={`relative p-5 md:p-16 rounded-[1.5rem] md:rounded-[3rem] bg-white/[0.01] border border-white/5 overflow-hidden transition-all duration-700 ${activeIndex === i + 1
                    ? "bg-white/[0.04] border-orange-500/30 shadow-[0_0_50px_rgba(249,115,22,0.1)]"
                    : "group-hover:bg-white/[0.02] group-hover:border-white/10"
                    }`}
                >
                  {/* Corner Accents */}
                  <div className="absolute top-4 md:top-8 right-4 md:right-8 w-8 md:w-12 h-8 md:h-12 border-t-2 border-r-2 border-orange-500/20 group-hover:border-orange-500 transition-colors duration-700" />
                  <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 w-8 md:w-12 h-8 md:h-12 border-b-2 border-l-2 border-blue-500/20 group-hover:border-blue-500 transition-colors duration-700" />

                  <div className="relative z-10 space-y-8 md:space-y-12">
                    <h2
                      className={`text-3xl md:text-8xl font-bold tracking-tighter leading-[0.9] transition-colors duration-700 ${activeIndex === i + 1 ? "text-white" : "text-white/40"
                        }`}
                    >
                      {item.title}
                    </h2>

                    <p className="text-gray-400 text-lg md:text-3xl leading-tight font-light">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-black/40 border border-white/5 text-[10px] md:text-xs font-mono uppercase tracking-widest hover:text-orange-500 hover:border-orange-500/30 transition-all"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Technical Log */}
                    <div className="mt-8 md:mt-12 p-4 md:p-8 rounded-2xl bg-black/60 border border-white/5 relative group-hover:border-orange-500/20 transition-colors overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <span className="text-[9px] md:text-[10px] font-mono text-orange-500 uppercase tracking-[0.2em] md:tracking-[0.4em] truncate">
                          {">"} System_Insight_Report
                        </span>
                        <span className="text-[9px] md:text-[10px] font-mono text-gray-700">
                          SEC_LEVEL_0{i + 1}
                        </span>
                      </div>
                      <p className="text-gray-500 font-mono text-xs md:text-base leading-relaxed italic break-words">
                        {item.details}
                      </p>

                      <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center font-mono text-[9px] text-gray-800">
                        <span>{"<init_seq>"}</span>
                        <div className="flex gap-2">
                          <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
                          <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse delay-75" />
                          <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-150" />
                        </div>
                        <span>{"</end_seq>"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer
        data-index={translatedJourney.length + 1}
        className={`journey-focus-section mt-64 md:mt-96 text-center ${activeIndex === translatedJourney.length + 1 ? "is-active" : ""
          }`}
      >
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
            {t("journey_footer_title")} <span className="text-orange-500">{t("journey_footer_subtitle")}</span>
          </h2>
          <button
            onClick={() => (window.location.href = "/#contact")}
            className="group relative px-16 py-8 bg-white text-black font-black uppercase tracking-[0.8em] text-xs overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-orange-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10 group-hover:text-white transition-colors">
              {t("journey_footer_button")}
            </span>
          </button>
          <div className="pt-20 font-mono text-[10px] text-gray-800 tracking-[2em] uppercase">
            {t("journey_footer_end")}
          </div>
        </div>
      </footer>
    </main>
  );
}
