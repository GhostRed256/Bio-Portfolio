import { NextRequest, NextResponse } from "next/server";
// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";

// NOTE: In a real deployment, you would set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in your environment variables.
// For now, if these are missing, we will bypass rate limiting or use a simple in-memory fallback (simulated here by just checking environment).

// Rate Limiting Logic (Requires Redis Env Vars)
// const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
//   ? Redis.fromEnv()
//   : null;

// const ratelimit = redis
//   ? new Ratelimit({
//       redis: redis,
//       limiter: Ratelimit.slidingWindow(10, "10 s"),
//       analytics: true,
//     })
//   : null;

export async function proxy(request: NextRequest) {
    const response = NextResponse.next();

    // Security Headers
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:; font-src 'self' data:;"
    );

    // Rate Limiting (Disabled for now as no keys are present)
    // if (ratelimit) {
    //     const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    //     const { success } = await ratelimit.limit(ip);
    //     if (!success) {
    //         return new NextResponse("Too Many Requests", { status: 429 });
    //     }
    // }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
