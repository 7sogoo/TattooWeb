import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const allowedOrigins = ['*'] // Add your allowed origins here

export function middleware(request: NextRequest) {
    // Check if the origin is allowed
    const origin = request.headers.get('origin')
    const isAllowedOrigin = origin && allowedOrigins.includes(origin)

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
        })
    }

    // Handle actual requests
    const response = NextResponse.next()

    if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin)
        response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
    }

    return response
}

// Configure which routes should be handled by this middleware
export const config = {
    matcher: '/api/:path*',
}