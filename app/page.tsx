import HeroSection from '@/components/HeroSection'
import TechStacks from '@/components/TechStacks'
import WorkExperiences from '@/components/WorkExperiences'
import ProjectShowcase from '@/components/Projects'
import { projects } from '@/configs/projects'
export default function Home() {
  return (
    <div className='lg:p-20 p-4'>
      <HeroSection />
      <TechStacks />
      <WorkExperiences />
      <ProjectShowcase projects={projects} />
    </div>
  )
}