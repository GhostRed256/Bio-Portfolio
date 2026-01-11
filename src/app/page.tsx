import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { ArtGallery } from "@/components/sections/ArtGallery";
import { GithubShowcase } from "@/components/sections/GithubShowcase";
import { Contact } from "@/components/sections/Contact";
import { ThemeDial } from "@/components/ui/ThemeDial";

// Lazy load heavy visual effects to improve initial load
const WeatherEffects = dynamic(() => import("@/components/ui/WeatherEffects").then(mod => ({ default: mod.WeatherEffects })), {
  ssr: false
});

const FestiveEffects = dynamic(() => import("@/components/ui/FestiveEffects").then(mod => ({ default: mod.FestiveEffects })), {
  ssr: false
});

const FloatingBalloons = dynamic(() => import("@/components/ui/FloatingBalloons").then(mod => ({ default: mod.FloatingBalloons })), {
  ssr: false
});

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
