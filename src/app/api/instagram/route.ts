import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");

    if (!url) {
        return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    try {
        // Method: Instagram allows getting the high-res image by appending /media/?size=l
        // We let fetch follow the redirect and then take the final URL.
        const cleanPostUrl = url.split("?")[0].replace(/\/+$/, "");
        const mediaUrl = `${cleanPostUrl}/media/?size=l`;

        const response = await fetch(mediaUrl, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
            }
        });

        // The response URL is the final URL after following redirects
        const finalImageUrl = response.url;

        if (finalImageUrl && finalImageUrl.includes("cdninstagram.com")) {
            return NextResponse.json({ imageUrl: finalImageUrl });
        }

        // Second fallback: Try to scrape og:image if redirect didn't work as expected
        const html = await response.text();
        const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
        const imageUrl = ogImageMatch?.[1]?.replace(/&amp;/g, "&");

        if (imageUrl) {
            return NextResponse.json({ imageUrl });
        }

        return NextResponse.json({ error: "Unable to find media source" }, { status: 404 });
    } catch (error) {
        console.error("Instagram proxy error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
