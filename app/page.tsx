import dynamic from 'next/dynamic'
import HeroSection from '@/components/HeroSection'
import TechStacks from '@/components/TechStacks'
import { projects } from '@/configs/projects'

const ProjectShowcase = dynamic(() => import('@/components/Projects.optimized'), {
  loading: () => <div className="h-96 animate-pulse bg-white/5 rounded-3xl" />
})

const WorkExperiences = dynamic(() => import('@/components/WorkExperiences.optimized'), {
  loading: () => <div className="h-96 animate-pulse bg-white/5 rounded-3xl" />
})

export const revalidate = 86400

export default function Home() {
  return (
    <div className='lg:p-20 p-4 space-y-16'>
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
