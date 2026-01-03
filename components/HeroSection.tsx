import PipelineShowcase from "@/components/PipelineShowCase";
import HeroSectionAboutMe from "@/components/HeroSectionAboutMe";

export default function HeroSection() {
  return (
    <section className="relative w-screen min-h-screen  overflow-hidden">
      {/* === Animated gradient base === */}
      <div className="absolute inset-0 bg-[length:200%_200%] bg-gradient-to-br from-black via-neutral-900 to-black animate-gradientMove" />

      {/* === Infra grid (deeper + larger) === */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
                    `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* === Secondary micro grid (depth layer) === */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
                    `,
          backgroundSize: "16px 16px",
        }}
      />

      {/* === Dynamic glow blobs === */}
      <div className="absolute -top-60 -left-60 w-[700px] h-[700px] bg-green-500/10 blur-[160px] rounded-full animate-floatSlow" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-blue-500/10 blur-[160px] rounded-full animate-floatSlower" />

      {/* === Noise overlay === */}
      {/* === CSS Noise (no image) === */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            repeating-radial-gradient(
                circle at 0 0,
                rgba(255,255,255,0.08),
                rgba(255,255,255,0.08) 1px,
                transparent 1px,
                transparent 2px
            )
        `,
          backgroundSize: "3px 3px",
          mixBlendMode: "overlay",
        }}
      />

      {/* === Content === */}
      <div className="relative z-10 w-screen grid lg:mt-20 mt-40 lg:grid-cols-2 grid-cols-1 place-items-center lg:p-20 p-4 h-full">
        <HeroSectionAboutMe />
        <PipelineShowcase />
      </div>
    </section>
  );
}
