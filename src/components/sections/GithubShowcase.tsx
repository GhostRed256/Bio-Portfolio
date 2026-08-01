"use client";

import { motion } from "framer-motion";
import { BrowserWindow } from "@/components/ui/BrowserWindow";
import { projects } from "@/data/projects";
import { Github, Star, Globe, Code2 } from "lucide-react";
import { useState } from "react";

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const hasDemoUrl = Boolean(project.demoUrl);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="h-full"
        >
            <BrowserWindow url={project.demoUrl || project.repoUrl} className={`h-full bg-background ${hasDemoUrl ? 'min-h-[380px]' : 'min-h-[280px]'}`}>
                <div className="flex flex-col h-full" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Main content area */}
                    <div className="flex-1 relative overflow-hidden">

                        {/* === BACKGROUND IFRAME (always rendered for demo projects) === */}
                        {hasDemoUrl && (
                            <>
                                {/* Loading skeleton while iframe loads */}
                                {!iframeLoaded && (
                                    <div className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-3 bg-muted/30">
                                        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                                        <span className="text-xs text-muted-foreground">Loading preview...</span>
                                    </div>
                                )}

                                {/* Scaled iframe as card background */}
                                <div className="absolute inset-0 z-0 overflow-hidden">
                                    <div
                                        style={{
                                            width: '250%',
                                            height: '250%',
                                            transform: 'scale(0.4)',
                                            transformOrigin: 'top left',
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        <iframe
                                            src={project.demoUrl}
                                            title={`${project.name} Preview`}
                                            className={`w-full h-full border-0 transition-opacity duration-700 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                                            loading="lazy"
                                            sandbox="allow-scripts allow-same-origin"
                                            onLoad={() => setIframeLoaded(true)}
                                            tabIndex={-1}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* === GLASS OVERLAY with project info (floats on top of iframe) === */}
                        <div
                            className={`relative z-10 p-6 flex flex-col h-full transition-all duration-500 ${
                                hasDemoUrl
                                    ? 'bg-background/70 dark:bg-background/75 backdrop-blur-md hover:bg-background/40 dark:hover:bg-background/40 hover:backdrop-blur-sm'
                                    : ''
                            }`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2.5">
                                    <div
                                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center transition-transform duration-300"
                                        style={{ transform: 'translateZ(30px)' }}
                                    >
                                        <Github className="w-4 h-4" />
                                    </div>
                                    <h3
                                        className="font-bold text-lg tracking-tight transition-transform duration-300"
                                        style={{ transform: 'translateZ(40px)' }}
                                    >
                                        {project.name}
                                    </h3>
                                </div>
                                <div
                                    className="flex items-center text-xs font-medium text-muted-foreground border border-border/50 bg-background/50 px-2.5 py-1 rounded-full transition-transform duration-300"
                                    style={{ transform: 'translateZ(35px)' }}
                                >
                                    <Star className="w-3 h-3 mr-1 fill-yellow-500 stroke-yellow-500" />
                                    {project.stars}
                                </div>
                            </div>

                            <p className="text-muted-foreground mb-4 flex-1 leading-relaxed text-sm">
                                {project.description}
                            </p>

                            {/* Live indicator */}
                            {hasDemoUrl && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground/70 mt-auto">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    Live Preview
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer bar - always visible */}
                    <div className="px-6 py-3.5 border-t border-border flex items-center justify-between bg-background/90 backdrop-blur-sm z-20 relative">
                        <div className="flex items-center gap-2 text-xs font-medium">
                            <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: project.color }} />
                            {project.language}
                        </div>

                        <div className="flex gap-3 items-center">
                            {project.demoUrl && (
                                <a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                                >
                                    <Globe size={12} />
                                    View Website
                                </a>
                            )}
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Code2 size={12} />
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
                    Open source contributions and experiments.
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
