
export type ArtPiece = {
    id: string;
    instagramUrl: string; // direct link format
    thumbnail?: string;   // local thumbnail path
};

export const artPieces: ArtPiece[] = [
    {
        id: "1",
        instagramUrl: "https://www.instagram.com/p/DIvynPcuDev/",
        thumbnail: "/art/art1.jpg"
    },
    {
        id: "2",
        instagramUrl: "https://www.instagram.com/p/CxYhMCJv4pa/",
        thumbnail: "/art/art2.jpg"
    },
    {
        id: "3",
        instagramUrl: "https://www.instagram.com/p/CwsziD_PAqO/",
        thumbnail: "/art/art3.jpg"
    },
    {
        id: "4",
        instagramUrl: "https://www.instagram.com/p/CO0cKBNniZN/",
        thumbnail: "/art/art4.jpg"
    },
    {
        id: "5",
        instagramUrl: "https://www.instagram.com/p/CaNfKJBvxXK/",
        thumbnail: "/art/art5.jpg"
    }
];

// Instagram profile URL
export const instagramProfileUrl = "https://www.instagram.com/mr.riteshdey?igsh=OWNtdGVkYTczaHZ5";
