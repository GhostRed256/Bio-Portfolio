import { Hero } from "@/components/sections/Hero";
import { ArtGallery } from "@/components/sections/ArtGallery";
import { GithubShowcase } from "@/components/sections/GithubShowcase";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 pb-0">
      <Hero />
      <ArtGallery />
      <GithubShowcase />
      <Contact />
    </div>
  );
}
