"use client";

import { motion } from "framer-motion";
import { BrowserWindow } from "@/components/ui/BrowserWindow";
import { projects } from "@/data/projects";
import { ExternalLink, Github, Star } from "lucide-react";

export function GithubShowcase() {
    return (
        <section id="code" className="py-24 container mx-auto px-6 bg-secondary/20">
            <div className="flex flex-col items-center mb-16 space-y-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
                    Selected Projects
                </h2>
                <p className="text-muted-foreground max-w-2xl text-lg">
                    Open source contributions and experiments.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="h-full"
                    >
                        <BrowserWindow url={project.repoUrl} className="h-full min-h-[250px] bg-background">
                            <div className="p-6 flex flex-col h-full" style={{ transformStyle: 'preserve-3d' }}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2 group-hover-3d">
                                        <Github
                                            className="w-5 h-5 transition-transform duration-300"
                                            style={{ transform: 'translateZ(30px)' }}
                                        />
                                        <h3
                                            className="font-semibold text-lg transition-transform duration-300"
                                            style={{ transform: 'translateZ(40px)' }}
                                        >
                                            {project.name}
                                        </h3>
                                    </div>
                                    <div
                                        className="flex items-center text-xs font-medium text-muted-foreground border border-border px-2 py-1 rounded-full transition-transform duration-300"
                                        style={{ transform: 'translateZ(35px)' }}
                                    >
                                        <Star className="w-3 h-3 mr-1 fill-yellow-500 stroke-yellow-500" />
                                        {project.stars}
                                    </div>
                                </div>

                                <p className="text-muted-foreground mb-6 flex-1 leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                                    <div className="flex items-center gap-2 text-xs font-medium">
                                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
                                        {project.language}
                                    </div>

                                    <div className="flex gap-3">
                                        {project.demoUrl && (
                                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline underline-offset-4">
                                                Live Demo
                                            </a>
                                        )}
                                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-medium hover:underline underline-offset-4">
                                            Code <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </BrowserWindow>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
