import HeroSection from '@/components/HeroSection'
import TechStacks from '@/components/TechStacks'
import WorkExperiences from '@/components/WorkExperiences.optimized'
import ProjectShowcase from '@/components/Projects.optimized'
import { projects } from '@/configs/projects'

export const revalidate = 86400

export default function Home() {
  return (
    <div className='lg:p-20 p-4 mt-20 space-y-32'>
      <section id="intro">
        <HeroSection />
        <TechStacks />
      </section>

      <section id="projects">
        <ProjectShowcase projects={projects} />
      </section>

      <section id="experiences">
        <WorkExperiences />
      </section>
    </div>
  );
}
