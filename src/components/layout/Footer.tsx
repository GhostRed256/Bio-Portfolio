
import { HoverProfile } from "@/components/ui/HoverProfile";

export function Footer() {
    return (
        <footer className="w-full py-6 md:py-10 border-t border-border bg-background">
            <div className="container px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Portfolio. All rights reserved.
                </p>
                <div className="flex gap-4">
                    <HoverProfile type="github" href="https://github.com/GhostRed256">
                        GitHub
                    </HoverProfile>
                    <HoverProfile type="linkedin" href="https://www.linkedin.com/in/ritesh-dey-77887a219">
                        LinkedIn
                    </HoverProfile>
                    <HoverProfile type="instagram" href="https://instagram.com/ritesh_dey">
                        Instagram
                    </HoverProfile>
                </div>
            </div>
        </footer>
    );
}
