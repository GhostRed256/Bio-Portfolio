export type ArtPiece = {
    id: string;
    title: string;
    caption: string; // simpler text for hover
    instagramUrl: string; // external link
    gradient: string; // CSS gradient for placeholder
};

export const artPieces: ArtPiece[] = [
    {
        id: "1",
        title: "Abstract Flow",
        caption: "Exploration of fluid dynamics in digital ease.",
        instagramUrl: "https://instagram.com",
        gradient: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500",
    },
    {
        id: "2",
        title: "Neon Nights",
        caption: "Cyberpunk inspired cityscapes.",
        instagramUrl: "https://instagram.com",
        gradient: "bg-gradient-to-tr from-blue-400 via-indigo-500 to-purple-500",
    },
    {
        id: "3",
        title: "Minimalist Structure",
        caption: "Architectural lines and shadows.",
        instagramUrl: "https://instagram.com",
        gradient: "bg-gradient-to-bl from-gray-200 via-gray-400 to-gray-600",
    },
    {
        id: "4",
        title: "Nature's Pattern",
        caption: "Fractals found in leaves.",
        instagramUrl: "https://instagram.com",
        gradient: "bg-gradient-to-r from-green-300 via-emerald-500 to-teal-600",
    },
    {
        id: "5",
        title: "Digital Horizon",
        caption: "Where sky meets the pixel.",
        instagramUrl: "https://instagram.com",
        gradient: "bg-gradient-to-tl from-orange-300 via-amber-400 to-yellow-200",
    },
    {
        id: "6",
        title: " Monochrome Dream",
        caption: "Studies in contrast.",
        instagramUrl: "https://instagram.com",
        gradient: "bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500",
    },
];
