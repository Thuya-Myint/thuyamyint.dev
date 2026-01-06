import HeroSectionAboutMe from "@/components/HeroSectionAboutMe";
import PipelineShowcase from "@/components/PipelineShowCase";


export default function HeroSection() {
  return (

    <div className="relative z-10  w-screen grid lg:mt-20 mt-40 lg:grid-cols-2  grid-cols-1 place-items-center lg:p-20 p-4 h-full">
      <div className="order-2 lg:order-1 w-full">
        <PipelineShowcase />
      </div>
      <div className="order-1 lg:order-2 w-full">
        <HeroSectionAboutMe />
      </div>
    </div>

  );
}
