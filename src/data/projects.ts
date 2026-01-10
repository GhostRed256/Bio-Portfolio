export type Project = {
    name: string;
    description: string;
    repoUrl: string;
    demoUrl?: string;
    language: string;
    stars: number;
    color: string; // language color
};

export const projects: Project[] = [
    {
        name: "Bio-Portfolio",
        description: "My personal portfolio website built with Next.js, React, and Tailwind CSS. Features smooth animations and a premium design.",
        repoUrl: "https://github.com/GhostRed256/Bio-Portfolio", // Assuming repo name
        language: "TypeScript",
        stars: 0,
        color: "#3178c6"
    },
    {
        name: "LinkedInAutomator",
        description: "A LinkedIn automation tool designed for offline use, built with Golang to streamline professional networking tasks.",
        repoUrl: "https://github.com/GhostRed256/LinkedInAutomator",
        language: "Go",
        stars: 0, // Placeholder, assuming 0 or hidden if unknown
        color: "#00ADD8"
    },
    {
        name: "rubiks-cube-solver",
        description: "Real-time Rubik's Cube solver using Python and webcam computer vision techniques.",
        repoUrl: "https://github.com/GhostRed256/rubiks-cube-solver",
        language: "Python",
        stars: 0,
        color: "#3572A5"
    },
    {
        name: "MyFriendApp",
        description: "AI companion app powered by the Gemini API, developed using Jetpack Compose and Kotlin for a modern Android experience.",
        repoUrl: "https://github.com/GhostRed256/MyFriendApp",
        language: "Kotlin",
        stars: 0,
        color: "#A97BFF"
    },
    {
        name: "Semantic_Segmentation",
        description: "Brain tumor detection using semantic segmentation techniques, implemented in Jupyter Notebooks with Python.",
        repoUrl: "https://github.com/GhostRed256/Semantic_Segmentation",
        language: "Jupyter Notebook",
        stars: 0,
        color: "#DA5B0B"
    }
];
