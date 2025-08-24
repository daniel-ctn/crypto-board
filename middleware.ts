import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if user is trying to access dashboard routes
  if (pathname.startsWith('/dashboard')) {
    // Get the session token from cookies
    const sessionToken = request.cookies.get('better-auth.session_token')

    if (!sessionToken) {
      // Redirect to login if no session
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect authenticated users away from auth pages
  if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    const sessionToken = request.cookies.get('better-auth.session_token')

    if (sessionToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
}
