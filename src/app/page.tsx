import { Hero } from "@/components/sections/Hero";
import { ArtGallery } from "@/components/sections/ArtGallery";
import { GithubShowcase } from "@/components/sections/GithubShowcase";
import { Contact } from "@/components/sections/Contact";
import { FloatingBalloons } from "@/components/ui/FloatingBalloons";
import { WeatherEffects } from "@/components/ui/WeatherEffects";
import { ThemeDial } from "@/components/ui/ThemeDial";
import { FestiveEffects } from "@/components/ui/FestiveEffects";


export default function Home() {
  return (
    <div className="flex flex-col gap-0 pb-0 relative">
      <WeatherEffects />
      <FestiveEffects />
      <FloatingBalloons />
      <ThemeDial />
      <Hero />
      <ArtGallery />
      <GithubShowcase />
      <Contact />
    </div>
  );
}
