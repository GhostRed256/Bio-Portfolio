
import { HoverProfile } from "@/components/ui/HoverProfile";
import { Github, Linkedin, Instagram } from "lucide-react";
import { instagramProfileUrl } from "@/data/art";
import { EasterEggTrigger } from "@/components/ui/EasterEggTrigger";

export function Footer() {
    return (
        <footer className="w-full py-6 md:py-10 border-t border-border bg-background/50 backdrop-blur-md">
            <div className="container px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Ritesh Dey. All rights reserved.
                    </p>
                    <span className="hidden md:inline text-muted-foreground/30">•</span>
                    <p className="text-sm text-muted-foreground">
                        Made with <span className="text-red-500 inline-block animate-pulse">❤️</span> by <span className="font-semibold text-foreground">Ritesh Dey</span>
                    </p>
                    <span className="hidden md:inline text-muted-foreground/30">•</span>
                    <EasterEggTrigger />
                </div>

                <div className="flex gap-4 md:gap-6">
                    <HoverProfile type="github" href="https://github.com/GhostRed256">
                        <span className="flex items-center gap-2 text-sm hover:text-foreground transition-colors">
                            <Github className="w-4 h-4 shrink-0" />
                            <span className="hidden sm:inline">GitHub</span>
                        </span>
                    </HoverProfile>
                    <HoverProfile type="linkedin" href="https://www.linkedin.com/in/ritesh-dey-77887a219">
                        <span className="flex items-center gap-2 text-sm hover:text-foreground transition-colors">
                            <Linkedin className="w-4 h-4 shrink-0" />
                            <span className="hidden sm:inline">LinkedIn</span>
                        </span>
                    </HoverProfile>
                    <HoverProfile type="instagram" href={instagramProfileUrl}>
                        <span className="flex items-center gap-2 text-sm hover:text-foreground transition-colors">
                            <Instagram className="w-4 h-4 shrink-0" />
                            <span className="hidden sm:inline">Instagram</span>
                        </span>
                    </HoverProfile>
                </div>
            </div>
        </footer>
    );
}
