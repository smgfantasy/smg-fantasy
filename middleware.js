const LOGIN_ROUTE = '/login', SIGN_UP_ROUTE = '/sign-up';
const API_AUTHENTICATE_ROUTE = '/authenticate';
import { NextResponse } from "next/server";

export async function middleware(request) {
    const session = request.cookies.get("session");
    const requestedPath = request.nextUrl.pathname;

    // Return to /login if don't have a session and are not already on /login or /sign-up
    if (!session && requestedPath !== LOGIN_ROUTE && requestedPath !== SIGN_UP_ROUTE) {
        const requestedUrl = requestedPath + request.nextUrl.search;
        const redirectUrl = new URL(`${LOGIN_ROUTE}?redirect=${encodeURIComponent(requestedUrl)}`, request.url);
        return NextResponse.redirect(redirectUrl);
    }

    // Call the authentication endpoint
    const responseAPI = await fetch(`${request.nextUrl.origin}/api/${API_AUTHENTICATE_ROUTE}`, {
        headers: {
            Cookie: `session=${session?.value}`,
        },
    });

    // Return to /login if token is not authorized and are not already on /login or /sign-up
    if (responseAPI.status !== 200 && requestedPath !== LOGIN_ROUTE && requestedPath !== SIGN_UP_ROUTE) {
        const requestedUrl = requestedPath + request.nextUrl.search;
        const redirectUrl = new URL(`${LOGIN_ROUTE}?redirect=${encodeURIComponent(requestedUrl)}`, request.url);
        return NextResponse.redirect(redirectUrl);
    }

    // Redirect authenticated users away from /login and /sign-up to the homepage
    if (responseAPI.status === 200 && (requestedPath === LOGIN_ROUTE || requestedPath === SIGN_UP_ROUTE)) {
        const redirectUrl = new URL('/', request.url);
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

// Add your protected routes
export const config = {
    matcher: ['/login', '/sign-up', '/team'],
};