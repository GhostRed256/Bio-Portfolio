"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Github, Linkedin, MapPin, Link as LinkIcon, Instagram } from "lucide-react";

interface HoverProfileProps {
    type: "github" | "linkedin" | "instagram";
    href: string;
    children: React.ReactNode;
}

export function HoverProfile({ type, href, children }: HoverProfileProps) {
    const [isHovered, setIsHovered] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (isHovered) setIsHovered(false);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHovered]);

    const handleMouseEnter = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setCoords({
                x: rect.left + rect.width / 2,
                y: rect.top
            });
            setIsHovered(true);
        }
    };

    const data = {
        github: {
            name: "GhostRed256",
            username: "@GhostRed256",
            bio: "Casual developer who does Android dev and Machine Learning, currently doing Fullstack using MERN stack.",
            location: "India",
            stats: [
                { label: "Repos", value: "10+" },
                { label: "Followers", value: "15+" },
            ],
            icon: <Github className="w-4 h-4" />
        },
        linkedin: {
            name: "Ritesh Dey",
            username: "Full Stack Developer",
            bio: "Casual developer who does Android dev and Machine Learning, currently doing Fullstack using MERN stack.",
            location: "India",
            stats: [
                { label: "Connections", value: "500+" },
                { label: "Views", value: "120" },
            ],
            icon: <Linkedin className="w-4 h-4" />
        },
        instagram: {
            name: "Ritesh Dey",
            username: "@mr.riteshdey",
            bio: "Casual developer who does Android dev and Machine Learning, currently doing Fullstack using MERN stack.",
            location: "India",
            stats: [
                { label: "Posts", value: "50+" },
                { label: "Followers", value: "200+" },
            ],
            icon: <Instagram className="w-4 h-4" />
        }
    };

    const profile = data[type];

    const tooltip = (
        <AnimatePresence>
            {isHovered && (
                <div
                    style={{
                        position: "fixed",
                        left: coords.x,
                        top: coords.y - 10, // Offset to place it above the icon with detailed gap
                        transform: "translate(-50%, -100%)",
                        zIndex: 9999,
                        pointerEvents: "none"
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-[280px]"
                    >
                        <div className="p-4 bg-background border border-border rounded-xl shadow-xl relative bg-opacity-95 backdrop-blur-sm">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary border border-white/10">
                                        {profile.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm leading-tight">{profile.name}</h4>
                                        <p className="text-xs text-muted-foreground">{profile.username}</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                                {profile.bio}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {profile.location}
                                </div>
                                <div className="flex items-center gap-1">
                                    <LinkIcon className="w-3 h-3" />
                                    <span className="truncate max-w-[100px]">{href.replace(/^https?:\/\//, '')}</span>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-3 border-t border-border">
                                {profile.stats.map((stat) => (
                                    <div key={stat.label} className="flex flex-col">
                                        <span className="font-bold text-sm text-foreground">{stat.value}</span>
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Arrow */}
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-background border-r border-b border-border rotate-45" />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    return (
        <>
            <div
                ref={triggerRef}
                className="relative flex items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsHovered(false)}
            >
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors relative z-10"
                >
                    {children}
                </a>
            </div>
            {mounted && createPortal(tooltip, document.body)}
        </>
    );
}
