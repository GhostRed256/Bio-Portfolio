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
        description: "An immersive, weather-responsive digital garden featuring real-time atmospheric physics, dynamic theme transformations, 3D interactive tilt cards, and retro arcade mini-games.",
        repoUrl: "https://github.com/GhostRed256/Bio-Portfolio",
        demoUrl: "https://bio-portfolio-seven.vercel.app",
        language: "TypeScript",
        stars: 0,
        color: "#3178c6"
    },
    {
        name: "LinkedInAutomator",
        description: "A high-performance, offline-first automation engine built in Go to effortlessly scale professional networking, connection requests, and lead outreach with sub-millisecond execution.",
        repoUrl: "https://github.com/GhostRed256/LinkedInAutomator",
        language: "Go",
        stars: 0,
        color: "#00ADD8"
    },
    {
        name: "rubiks-cube-solver",
        description: "Real-time 3D Rubik's Cube computer vision solver powered by OpenCV and algorithmic color extraction for instant step-by-step 3D solution tracking via live webcam.",
        repoUrl: "https://github.com/GhostRed256/rubiks-cube-solver",
        language: "Python",
        stars: 0,
        color: "#3572A5"
    },
    {
        name: "MyFriendApp",
        description: "A smart, empathetic AI companion for Android built with Kotlin & Jetpack Compose, leveraging Google's Gemini API for context-aware conversational intelligence.",
        repoUrl: "https://github.com/GhostRed256/MyFriendApp",
        language: "Kotlin",
        stars: 0,
        color: "#A97BFF"
    },
    {
        name: "StayNJoy Homestay",
        description: "A gold-luxury homestay booking platform featuring real-time room reservations, interactive suite showcases, and an enterprise admin & staff operations portal.",
        repoUrl: "https://github.com/GhostRed256/HotelLuxe",
        demoUrl: "https://stay-n-joy-wine.vercel.app",
        language: "TypeScript",
        stars: 0,
        color: "#3178c6"
    },
    {
        name: "Semantic_Segmentation",
        description: "Deep learning medical imaging pipeline for automated brain tumor detection and pixel-level tumor boundary delineation using U-Net semantic segmentation architecture.",
        repoUrl: "https://github.com/GhostRed256/Semantic_Segmentation",
        language: "Jupyter Notebook",
        stars: 0,
        color: "#DA5B0B"
    },
    {
        name: "TravelNJoy",
        description: "A premium second-hand car marketplace platform allowing buyers to explore verified pre-owned vehicles with detailed specs, price estimates, and seamless owner connection.",
        repoUrl: "https://github.com/GhostRed256/TravelNJoy",
        demoUrl: "https://travel-n-joy.vercel.app",
        language: "TypeScript",
        stars: 0,
        color: "#3178c6"
    },
    {
        name: "TradingCourseSellingWebsite",
        description: "An ed-tech trading platform designed for financial mastery, offering high-yield technical analysis courses, interactive video modules, and instant enrollment.",
        repoUrl: "https://github.com/GhostRed256/TradingCourseSellingWebsite",
        demoUrl: "https://emergingtrader80.vercel.app/",
        language: "TypeScript",
        stars: 0,
        color: "#3178c6"
    },
    {
        name: "FoodNJoy",
        description: "A lightning-fast food delivery platform featuring real-time order tracking, interactive menu customization, and an ultra-frictionless checkout experience.",
        repoUrl: "https://github.com/GhostRed256/FoodDelievryApp",
        demoUrl: "https://food-n-joy.vercel.app/",
        language: "TypeScript",
        stars: 0,
        color: "#3178c6"
    }
];

