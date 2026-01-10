"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { artPieces, instagramProfileUrl } from "@/data/art";

export function ArtGallery() {
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
                        className="w-full max-w-[400px] h-[480px] bg-white/50 dark:bg-black/50 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden border border-white/20 dark:border-white/10 relative group"
                    >
                        <InstagramCard piece={piece} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function InstagramCard({ piece }: { piece: { id: string, instagramUrl: string } }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
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
    }, [piece.instagramUrl]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4 bg-gradient-to-br from-muted/20 to-muted/5 border border-white/5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <Instagram className="w-8 h-8 text-pink-500/60" />
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground/80">View Art Post</p>
                    <p className="text-xs text-muted-foreground">Preview unavailable in browser.</p>
                </div>
                <a
                    href={piece.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl text-xs font-bold hover:brightness-110 transition shadow-lg shadow-pink-500/20 hover:scale-105 active:scale-95"
                >
                    <Instagram size={14} />
                    Open Instagram
                </a>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative overflow-hidden bg-muted/10">
            {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-[8px] text-primary">IG</div>
                    </div>
                </div>
            ) : (
                <a href={piece.instagramUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative group cursor-pointer">
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Instagram Post"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            onLoad={() => setLoading(false)}
                            onError={() => setError(true)}
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 space-y-2">
                            <div className="flex items-center gap-2 text-white font-bold text-lg">
                                <Instagram size={20} className="text-pink-500" />
                                <span>View Artwork</span>
                            </div>
                            <p className="text-xs text-white/70 font-medium">Click to see the full story on Instagram</p>
                        </div>
                    </div>
                    {/* Corner badge */}
                    <div className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-lg text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Instagram size={16} />
                    </div>
                </a>
            )}
        </div>
    );
}
