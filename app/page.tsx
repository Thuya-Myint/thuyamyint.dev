export const revalidate = 86400
import HeroSection from '@/components/HeroSection'
import TechStacks from '@/components/TechStacks'
import WorkExperiences from '@/components/WorkExperiences.optimized'
// import WorkExperiences from '@/components/WorkExperiences'
// import ProjectShowcase from '@/components/Projects'
import ProjectShowcase from '@/components/Projects.optimized'
import { projects } from '@/configs/projects'
export default function Home() {
  return (
    <div id="intro" className='lg:p-20 p-4'>
      <HeroSection />
      <TechStacks />
      <WorkExperiences />
      <ProjectShowcase projects={projects} />
    </div>
  )
}