"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { artPieces, instagramProfileUrl, ArtPiece } from "@/data/art";

export function ArtGallery() {
    return (
        <section id="art" className="py-24 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center mb-20 space-y-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h2 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x">
                            Art & Photography
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
                    </motion.div>

                    <p className="text-muted-foreground max-w-2xl text-lg font-medium leading-relaxed">
                        A curated selection of my visual works and photographic moments,
                        blending digital creativity with traditional techniques.
                    </p>

                    <motion.a
                        href={instagramProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-3 text-sm font-bold bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 px-6 py-3 rounded-2xl hover:bg-white/60 dark:hover:bg-white/10 transition-all shadow-xl shadow-black/5"
                    >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/20 group-hover:rotate-12 transition-transform">
                            <Instagram size={18} />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">@mr.riteshdey</span>
                    </motion.a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {artPieces.map((piece, index) => (
                        <motion.div
                            key={piece.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                delay: index * 0.05,
                                duration: 0.6,
                                ease: [0.23, 1, 0.32, 1]
                            }}
                            className="group"
                        >
                            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-white/40 dark:bg-white/5 backdrop-blur-3xl border border-white/30 dark:border-white/10 shadow-2xl p-3 transition-all duration-500 group-hover:shadow-primary/20 group-hover:rounded-[2rem]">
                                <InstagramCard piece={piece} index={index} total={artPieces.length} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function InstagramCard({ piece, index, total }: { piece: ArtPiece, index: number, total: number }) {
    const [imageUrl, setImageUrl] = useState<string | null>(piece.thumbnail || null);
    const [loading, setLoading] = useState(!piece.thumbnail);
    const [error, setError] = useState(false);

    // Rotation Logic
    let rotationClass = "";
    if (index === 0) rotationClass = "rotate-0"; // Correcting to upright as per latest feedback
    else if (index === 1 || index === 2) rotationClass = "-rotate-90";
    else rotationClass = "rotate-0";

    // Category Logic
    const category = index < 3 ? "Sketch" : "Photography";

    useEffect(() => {
        if (piece.thumbnail) return;

        let mounted = true;
        const fetchImage = async () => {
            try {
                const res = await fetch(`/api/instagram?url=${encodeURIComponent(piece.instagramUrl)}`);
                if (res.ok) {
                    const data = await res.json();
                    if (mounted && data.imageUrl) {
                        setImageUrl(data.imageUrl);
                    } else if (mounted) {
                        setError(true);
                    }
                } else {
                    if (mounted) setError(true);
                }
            } catch (e) {
                if (mounted) setError(true);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchImage();
        return () => { mounted = false; };
    }, [piece.instagramUrl, piece.thumbnail]);

    return (
        <div className="w-full h-full relative overflow-hidden rounded-[1.8rem] bg-muted/20">
            {loading ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                    </div>
                </div>
            ) : error && !imageUrl ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4 bg-gradient-to-br from-primary/5 to-secondary/5">
                    <Instagram className="w-10 h-10 text-muted-foreground/30" />
                    <a
                        href={piece.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-primary hover:underline"
                    >
                        View on Instagram
                    </a>
                </div>
            ) : (
                <a href={piece.instagramUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative group cursor-pointer">
                    {imageUrl && (
                        <motion.img
                            src={imageUrl}
                            alt="Art Piece"
                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-115 ${rotationClass}`}
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        />
                    )}

                    {/* Pastel Glass Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                        <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-sm tracking-wide">{category}</span>
                                <span className="text-white/60 text-[10px] uppercase tracking-widest font-black">Collection 2026</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                                <Instagram size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_white]" />
                </a>
            )}
        </div>
    );
}
