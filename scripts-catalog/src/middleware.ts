import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This is a simple authentication check.
// In a production environment, you should use a proper authentication system.
export function middleware(request: NextRequest) {
  // Only protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authToken = request.cookies.get('auth_token');
    
    if (!authToken || authToken.value !== process.env.ADMIN_TOKEN) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
} 