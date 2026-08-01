"use client";

import { motion } from "framer-motion";
import { BrowserWindow } from "@/components/ui/BrowserWindow";
import { projects, Project } from "@/data/projects";
import { Github, Star, Globe, Code2, Sparkles } from "lucide-react";
import { useState } from "react";

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const hasDemoUrl = Boolean(project.demoUrl);
    const previewImg = project.previewImg;

    return (
        <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="h-full group"
        >
            <BrowserWindow url={project.demoUrl || project.repoUrl} className="h-full min-h-[360px] bg-background">
                <div className="flex flex-col h-full relative overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Live Website Preview / Image Background */}
                    {(hasDemoUrl || previewImg) && (
                        <div className="absolute inset-0 bottom-[52px] z-0 overflow-hidden bg-muted/30">
                            {/* Instant Preview Image (Loads immediately, zero delay!) */}
                            {previewImg && (
                                <img
                                    src={previewImg}
                                    alt={`${project.name} preview`}
                                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                />
                            )}

                            {/* Scaled Live Iframe Overlay (Loads on hover/in background) */}
                            {hasDemoUrl && (
                                <div
                                    className="absolute inset-0 w-full h-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                >
                                    <div
                                        style={{
                                            width: '200%',
                                            height: '200%',
                                            transform: 'scale(0.5)',
                                            transformOrigin: 'top left',
                                        }}
                                    >
                                        <iframe
                                            src={project.demoUrl}
                                            title={`${project.name} Live Preview`}
                                            className={`w-full h-full border-0 transition-opacity duration-700 ${
                                                iframeLoaded ? 'opacity-100' : 'opacity-0'
                                            }`}
                                            loading="lazy"
                                            sandbox="allow-scripts allow-same-origin allow-popups"
                                            onLoad={() => setIframeLoaded(true)}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Subtle Glass Tint Overlay when NOT hovered - fades out on hover to reveal crisp live site */}
                            <div className="absolute inset-0 bg-background/60 dark:bg-background/70 backdrop-blur-[2px] group-hover:opacity-0 group-hover:backdrop-blur-none transition-all duration-500 pointer-events-none z-10" />
                        </div>
                    )}

                    {/* Code Pattern Decorative Background for projects without demoUrl or previewImg */}
                    {!hasDemoUrl && !previewImg && (
                        <div className="absolute inset-0 bottom-[52px] z-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] bg-[radial-gradient(#3178c6_1px,transparent_1px)] [background-size:16px_16px]" />
                            <Code2 className="w-32 h-32 text-primary/10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6" />
                        </div>
                    )}

                    {/* Main Content Info Overlay - sits over background, fades on hover for live site interaction */}
                    <div className="flex-1 relative z-20 p-6 flex flex-col justify-between pointer-events-none">
                        {/* Top Bar Details */}
                        <div className="flex justify-between items-start mb-4 pointer-events-auto">
                            <div className="flex items-center gap-2.5 bg-background/85 dark:bg-background/90 backdrop-blur-md border border-border/60 px-3 py-1.5 rounded-xl shadow-md group-hover:shadow-primary/20 transition-all duration-300">
                                <Github className="w-4 h-4 text-foreground shrink-0" />
                                <h3 className="font-bold text-base tracking-tight text-foreground">
                                    {project.name}
                                </h3>
                            </div>
                            <div className="flex items-center text-xs font-semibold text-muted-foreground bg-background/85 dark:bg-background/90 backdrop-blur-md border border-border/60 px-2.5 py-1.5 rounded-xl shadow-md">
                                <Star className="w-3.5 h-3.5 mr-1 fill-yellow-500 stroke-yellow-500" />
                                {project.stars}
                            </div>
                        </div>

                        {/* Middle Description Card - Fades out on hover if demo exists so user sees clean preview */}
                        <div className={`mt-auto transition-all duration-500 ${
                            hasDemoUrl ? 'group-hover:opacity-0 group-hover:translate-y-2' : ''
                        }`}>
                            <div className="p-4 rounded-xl bg-background/85 dark:bg-background/90 backdrop-blur-md border border-border/60 shadow-lg">
                                <p className="text-muted-foreground text-xs leading-relaxed font-medium">
                                    {project.description}
                                </p>

                                {hasDemoUrl && (
                                    <div className="flex items-center gap-2 text-[11px] font-semibold text-primary mt-3">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                        </span>
                                        <Sparkles className="w-3 h-3" />
                                        Hover to interact with live site
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Footer Bar - Always visible & interactive */}
                    <div className="px-6 py-3 border-t border-border flex items-center justify-between bg-background/90 dark:bg-background/95 backdrop-blur-md z-30 relative mt-auto">
                        <div className="flex items-center gap-2 text-xs font-semibold">
                            <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: project.color }} />
                            <span className="text-muted-foreground">{project.language}</span>
                        </div>

                        <div className="flex gap-2.5 items-center">
                            {project.demoUrl && (
                                <a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                                >
                                    <Globe size={13} />
                                    View Website
                                </a>
                            )}
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-background/60 hover:bg-accent text-foreground transition-all"
                            >
                                <Code2 size={13} />
                                Code
                            </a>
                        </div>
                    </div>
                </div>
            </BrowserWindow>
        </motion.div>
    );
}

export function GithubShowcase() {
    return (
        <section id="code" className="py-24 container mx-auto px-6 bg-secondary/20">
            <div className="flex flex-col items-center mb-16 space-y-4 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold tracking-tighter"
                >
                    Selected Projects
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground max-w-2xl text-lg"
                >
                    Open source contributions, web applications, and live project demos.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {projects.map((project, index) => (
                    <ProjectCard key={project.name} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}

