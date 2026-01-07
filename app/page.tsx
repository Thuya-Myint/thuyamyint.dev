import HeroSection from '@/components/HeroSection'
import TechStacks from '@/components/TechStacks'
import WorkExperiences from '@/components/WorkExperiences'
export default function Home() {
  return (
    <div className='lg:p-20 p-4'>

      <HeroSection />

      <TechStacks />
      <WorkExperiences />
    </div>
  )
}