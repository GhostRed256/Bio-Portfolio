"use client";

import { motion } from "framer-motion";
import { ExternalLink, Heart } from "lucide-react";
import { artPieces, type ArtPiece } from "@/data/art";
import { cn } from "@/lib/utils";

export function ArtGallery() {
    return (
        <section id="art" className="py-24 container mx-auto px-6">
            <div className="flex flex-col items-center mb-16 space-y-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
                    Art Gallery
                </h2>
                <p className="text-muted-foreground max-w-2xl text-lg">
                    A curated selection of my visual works from Instagram.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 md:gap-8">
                {artPieces.map((piece, index) => (
                    <GalleryItem key={piece.id} piece={piece} index={index} />
                ))}
            </div>
        </section>
    );
}

function GalleryItem({ piece, index }: { piece: ArtPiece; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
        >
            {/* Placeholder Image (Gradient) */}
            <div className={cn("w-full h-full transition-transform duration-500 group-hover:scale-110", piece.gradient)} />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6 text-center backdrop-blur-sm">
                <h3 className="font-bold text-xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {piece.title}
                </h3>
                <p className="text-sm text-white/80 mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {piece.caption}
                </p>

                <div className="flex gap-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    <div className="flex items-center gap-1">
                        <Heart size={20} className="fill-white" />
                        <span className="text-sm font-medium">Like</span>
                    </div>
                    <a
                        href={piece.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-white/80 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ExternalLink size={20} />
                        <span className="text-sm font-medium">View</span>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
