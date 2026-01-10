"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { artPieces, instagramProfileUrl } from "@/data/art";

export function ArtGallery() {
    // Load Instagram Embed Script
    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = "//www.instagram.com/embed.js";
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Reprocess embeds when component mounts or updates
    useEffect(() => {
        if ((window as any).instgrm) {
            (window as any).instgrm.Embeds.process();
        }
    }, []);

    return (
        <section id="art" className="py-24 container mx-auto px-6">
            <div className="flex flex-col items-center mb-16 space-y-4 text-center">
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x">
                    Art & Photography
                </h2>
                <p className="text-muted-foreground max-w-2xl text-lg font-medium">
                    A curated selection of my visual works and photographic moments.
                </p>
                <a
                    href={instagramProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20"
                >
                    <Instagram size={18} />
                    <span>@mr.riteshdey</span>
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {artPieces.map((piece, index) => (
                    <motion.div
                        key={piece.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="w-full max-w-[400px] bg-white/50 dark:bg-black/50 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden border border-white/20 dark:border-white/10"
                    >
                        <blockquote
                            className="instagram-media"
                            data-instgrm-captioned
                            data-instgrm-permalink={piece.instagramUrl}
                            data-instgrm-version="14"
                            style={{
                                background: "#FFF",
                                border: 0,
                                borderRadius: "3px",
                                boxShadow: "none",
                                margin: "0px",
                                maxWidth: "540px",
                                minWidth: "326px",
                                padding: "0",
                                width: "calc(100% - 2px)"
                            }}
                        >
                            <div style={{ padding: "16px" }}>
                                <a
                                    href={piece.instagramUrl}
                                    style={{ background: "#FFFFFF", lineHeight: 0, padding: "0 0", textAlign: "center", textDecoration: "none", width: "100%" }}
                                    target="_blank"
                                >
                                    View on Instagram
                                </a>
                            </div>
                        </blockquote>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
