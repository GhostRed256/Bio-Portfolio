"use client";

import { motion } from "framer-motion";
import { BrowserWindow } from "@/components/ui/BrowserWindow";
import { projects, Project } from "@/data/projects";
import { Github, Star, Globe, Code2 } from "lucide-react";
import { useState } from "react";

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const [imgLoaded, setImgLoaded] = useState(false);
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
                    {/* Website Preview Image Background */}
                    {previewImg && (
                        <div className="absolute inset-0 bottom-[52px] z-0 overflow-hidden bg-muted/30">
                            {/* Shimmering Skeleton Loader */}
                            {!imgLoaded && (
                                <div className="absolute inset-0 bg-gradient-to-r from-muted/50 via-muted to-muted/50 animate-pulse z-0 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                                </div>
                            )}

                            <img
                                src={previewImg}
                                alt={`${project.name} preview`}
                                loading="lazy"
                                decoding="async"
                                onLoad={() => setImgLoaded(true)}
                                className={`w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.05] ${
                                    imgLoaded ? 'opacity-100' : 'opacity-0'
                                }`}
                            />

                            {/* Glass Overlay - slight tint when idle, clears on hover */}
                            <div className="absolute inset-0 bg-background/60 dark:bg-background/70 backdrop-blur-[2px] group-hover:bg-background/20 group-hover:backdrop-blur-none transition-all duration-500 pointer-events-none z-10" />
                        </div>
                    )}

                    {/* Code Pattern Background for non-web projects */}
                    {!previewImg && (
                        <div className="absolute inset-0 bottom-[52px] z-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] bg-[radial-gradient(#3178c6_1px,transparent_1px)] [background-size:16px_16px]" />
                            <Code2 className="w-32 h-32 text-primary/10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6" />
                        </div>
                    )}

                    {/* Main Content Info Overlay */}
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

                        {/* Middle Description Card */}
                        <div className="mt-auto transition-all duration-500 group-hover:opacity-10 group-hover:translate-y-2">
                            <div className="p-4 rounded-xl bg-background/85 dark:bg-background/90 backdrop-blur-md border border-border/60 shadow-lg">
                                <p className="text-muted-foreground text-xs leading-relaxed font-medium">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Footer Bar */}
                    <div className="px-6 py-3 border-t border-border flex items-center justify-between bg-background/90 dark:bg-background/95 backdrop-blur-md z-30 relative mt-auto">
                        <div className="flex items-center gap-2 text-xs font-semibold">
                            <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: project.color }} />
                            <span className="text-muted-foreground">{project.language}</span>
                        </div>

                        <div className="flex gap-2.5 items-center">
                            {hasDemoUrl && (
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


