import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");

    if (!url) {
        return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    try {
        // Method: Instagram allows getting the high-res image by appending /media/?size=l
        // We follow the redirect to get the actual CDN URL.
        const cleanPostUrl = url.split("?")[0]; // remove existing query params
        const mediaUrl = `${cleanPostUrl.endsWith("/") ? cleanPostUrl : cleanPostUrl + "/"}media/?size=l`;

        const response = await fetch(mediaUrl, {
            method: "HEAD",
            redirect: "manual",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
            }
        });

        // The URL is in the 'location' header (302 redirect)
        const finalImageUrl = response.headers.get("location");

        if (finalImageUrl) {
            return NextResponse.json({ imageUrl: finalImageUrl });
        }

        // Fallback for some Reels or specific post types: check if it's already a 200 (direct image link returned)
        if (response.status === 200 && response.url.includes("cdninstagram")) {
            return NextResponse.json({ imageUrl: response.url });
        }

        return NextResponse.json({ error: "Unable to find media location" }, { status: 404 });
    } catch (error) {
        console.error("Instagram proxy error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
