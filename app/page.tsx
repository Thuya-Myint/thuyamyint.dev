import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import Scroll3DSection from "@/components/Scroll3DSection";
import TechStacks from "@/components/TechStacks";
import { projects } from "@/configs/projects";

const ProjectShowcase = dynamic(() => import("@/components/Projects.optimized"), {
  loading: () => <div className="h-96 animate-pulse rounded-3xl bg-white/5" />,
});

const WorkExperiences = dynamic(() => import("@/components/WorkExperiences.optimized"), {
  loading: () => <div className="h-96 animate-pulse rounded-3xl bg-white/5" />,
});

export const revalidate = 86400;

export default function Home() {
  return (
    <div className="space-y-24 px-4 py-4 lg:px-20 lg:py-20">
      <Scroll3DSection intensity={0.6} className="origin-center">
        <section id="intro" className="performance-section space-y-10">
          <HeroSection />
          <TechStacks />
        </section>
      </Scroll3DSection>

      <Scroll3DSection intensity={0.5} className="origin-center">
        <section id="projects" className="performance-section">
          <ProjectShowcase projects={projects} />
        </section>
      </Scroll3DSection>

      <Scroll3DSection intensity={0.45} className="origin-center">
        <section id="experiences" className="performance-section">
          <WorkExperiences />
        </section>
      </Scroll3DSection>
    </div>
  );
}
