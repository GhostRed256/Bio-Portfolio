"use client";

import { motion } from "framer-motion";

export function Contact() {
    return (
        <section id="contact" className="py-24 container mx-auto px-6 border-t border-border">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto text-center"
            >
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
                    Let's Work Together
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                    I'm always interested in new projects and collaborations.
                    Whether you have a question or just want to say hi, feel free to drop me a message.
                </p>

                <a
                    href="mailto:contact@example.com"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-background bg-foreground rounded-full hover:opacity-90 transition-opacity"
                >
                    Say Hello
                </a>
            </motion.div>
        </section>
    );
}
