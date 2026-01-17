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

  if (!mounted) return <div className="bg-[#020202] h-screen w-screen" />;

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

      {/* CRT Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-[90] opacity-[0.03]
        bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)]
        bg-[length:100%_2px]"
      />

      {/* Scanning Line - CSS Animation via Tailwind config or arbitrary values */}
      <div className="fixed inset-0 pointer-events-none z-[91] overflow-hidden">
        <div className="w-full h-[20vh] bg-gradient-to-b from-transparent via-orange-500/10 to-transparent animate-[scan_8s_linear_infinite]" />
      </div>

      <JourneyContent />
    </div>
  );
}

function JourneyContent() {
  const { t } = useApp();

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
    <main className="relative z-10 max-w-6xl mx-auto px-6 py-32">
      {/* Header Section */}
      <header className="mb-32 relative">
        <div className="inline-block px-3 py-1 border border-orange-500/30 bg-orange-500/5 mb-6">
          <span className="text-orange-500 font-mono text-[10px] tracking-[0.5em] uppercase animate-pulse">
            System.Status: Online
          </span>
        </div>
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20">
          JOURNEY<br />LOG
        </h1>
        <p className="text-gray-500 max-w-md font-mono text-xs uppercase tracking-[0.2em] leading-relaxed">
          [DECODING_ARCHITECTURAL_EVOLUTION]<br />
          A chronological trace of technical milestones and system developments from 2021 to present.
        </p>
      </header>

      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-20 hidden md:block" />

        <div className="space-y-32">
          {translatedJourney.map((item, i) => (
            <div key={i} className={`relative flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              {/* Year Marker */}
              <div className="absolute left-0 md:left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                <div className="w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.8)]" />
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-[45%] transition-all duration-500 hover:translate-x-2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <div className="group relative p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-orange-500/30 transition-all duration-500">
                  {/* Year Label */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-orange-500 font-mono text-sm font-bold tracking-widest">
                      {item.year}
                    </span>
                    <div className="h-px flex-grow bg-white/10" />
                  </div>

                  <h3 className="text-3xl font-bold mb-4 group-hover:text-orange-500 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-8 text-sm md:text-base">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {item.tags.map((tag, j) => (
                      <span key={j} className="px-2 py-1 text-[9px] font-mono bg-white/5 border border-white/10 text-gray-500 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Technical Details Box */}
                  <div className="p-4 bg-black/40 border-l-2 border-orange-500/50">
                    <span className="text-[9px] font-mono text-orange-500/70 uppercase tracking-widest block mb-2">
                      Technical_Insight
                    </span>
                    <p className="text-gray-500 text-xs font-mono italic leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </div>
              </div>

              {/* Spacer for the other side */}
              <div className="hidden md:block md:w-[45%]" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-64 text-center">
        <div className="h-px w-32 bg-orange-500 mx-auto mb-12 opacity-30" />
        <h2 className="text-5xl md:text-7xl font-black mb-12 opacity-20">END_OF_FILE</h2>
        <button
          onClick={() => (window.location.href = "/#contact")}
          className="group relative px-12 py-4 overflow-hidden border border-white/10 transition-all hover:border-orange-500"
        >
          <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10 text-xs font-black uppercase tracking-[0.5em] group-hover:text-black transition-colors">
            Establish_Link
          </span>
        </button>
      </footer>
    </main>
  );
}
