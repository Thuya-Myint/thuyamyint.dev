import HeroSectionAboutMe from "@/components/HeroSectionAboutMe";
import PipelineShowcase from "@/components/PipelineShowCase";


export default function HeroSection() {
  return (
    <div className="relative z-10 grid  lg:grid-cols-2 gap-10 grid-cols-1 place-items-center  h-full">
      <div className="order-2 lg:order-1 w-full">
        <PipelineShowcase />
      </div>
      <div className="order-1 lg:order-2 w-full">
        <HeroSectionAboutMe />
      </div>
    </div>

  );
}
