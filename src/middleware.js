import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // Skip middleware for static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname === '/login' ||
    pathname === '/api/uploadthing' ||
    pathname.startsWith('/api/auth')
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all routes except the specified paths
    '/((?!_next|static|api/auth|login|public|/api/uploadthing).*)',
  ],
};

