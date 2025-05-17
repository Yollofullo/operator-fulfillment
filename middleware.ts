import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function middleware(req: NextRequest) {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = req.nextUrl.clone();

  if (!session) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  const userRole = session.user?.user_metadata?.role;

  if (url.pathname.startsWith('/portal') && userRole !== 'client') {
    url.pathname = '/access-denied';
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith('/operator') && userRole !== 'operator') {
    url.pathname = '/access-denied';
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith('/client') && userRole !== 'client') {
    url.pathname = '/access-denied';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/portal/:path*', '/operator/:path*', '/client/:path*'],
};
