import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Basic Rate Limiter config
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // 100 requests per minute per IP

// In-memory store (Note: This is per-instance in Edge/Serverless)
const ipCache = new Map<string, { count: number; lastReset: number }>();

export function middleware(request: NextRequest) {
    const ip = (request as any).ip || request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const now = Date.now();

    // Get current rate data
    const data = ipCache.get(ip) || { count: 0, lastReset: now };

    // Reset window if needed
    if (now - data.lastReset > RATE_LIMIT_WINDOW) {
        data.count = 0;
        data.lastReset = now;
    }

    data.count++;
    ipCache.set(ip, data);

    // Check limit
    if (data.count > MAX_REQUESTS) {
        return new NextResponse('Too Many Requests', {
            status: 429,
            headers: {
                'Retry-After': '60'
            }
        });
    }

    // Add security headers
    const response = NextResponse.next();
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Content-Security-Policy', "default-src 'self'; img-src 'self' https: data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' data:; connect-src 'self' https:;");

    return response;
}

// Only apply to API and main pages
export const config = {
    matcher: ['/api/:path*', '/((?!_next/static|_next/image|favicon.ico).*)'],
};
