export type Project = {
    name: string;
    description: string;
    repoUrl: string;
    demoUrl?: string;
    previewImage?: string; // static screenshot for fast card background
    language: string;
    stars: number;
    color: string; // language color
};

export const projects: Project[] = [
    {
        name: "Bio-Portfolio",
        description: "Yo dawg, we heard you like portfolios, so we put a portfolio preview inside your portfolio so you can view your portfolio while viewing your portfolio!",
        repoUrl: "https://github.com/GhostRed256/Bio-Portfolio",
        demoUrl: "https://bio-portfolio-seven.vercel.app",
        previewImage: "/previews/portfolio.jpg",
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
        name: "StayNJoy Homestay",
        description: "A premium gold-luxury themed booking homestay web application allowing guests to reserve cozy rooms and suites, complete with a comprehensive modern admin and staff portal.",
        repoUrl: "https://github.com/GhostRed256/HotelLuxe",
        demoUrl: "https://stay-n-joy-wine.vercel.app",
        previewImage: "/previews/staynjoy.jpg",
        language: "TypeScript",
        stars: 0,
        color: "#3178c6"
    },
    {
        name: "Semantic_Segmentation",
        description: "Brain tumor detection using semantic segmentation techniques, implemented in Jupyter Notebooks with Python.",
        repoUrl: "https://github.com/GhostRed256/Semantic_Segmentation",
        language: "Jupyter Notebook",
        stars: 0,
        color: "#DA5B0B"
    },
    {
        name: "TravelNJoy",
        description: "A premium used car marketplace with verified listings, 150-point inspections, transparent pricing, and a sleek modern UI.",
        repoUrl: "https://github.com/GhostRed256/TravelNJoy",
        previewImage: "/previews/travelnjoy.jpg",
        language: "TypeScript",
        stars: 0,
        color: "#3178c6"
    },
    {
        name: "TradingCourseSellingWebsite",
        description: "A website for selling trading courses and educational content.",
        repoUrl: "https://github.com/GhostRed256/TradingCourseSellingWebsite",
        demoUrl: "https://emergingtrader80.vercel.app/",
        previewImage: "/previews/trading.jpg",
        language: "TypeScript",
        stars: 0,
        color: "#3178c6"
    },
    {
        name: "FoodNJoy",
        description: "A modern food delivery web app with a sleek UI, real-time order tracking, and a smooth checkout experience.",
        repoUrl: "https://github.com/GhostRed256/FoodDelievryApp",
        demoUrl: "https://food-n-joy.vercel.app/",
        previewImage: "/previews/foodnjoy.jpg",
        language: "TypeScript",
        stars: 0,
        color: "#3178c6"
    }
];
