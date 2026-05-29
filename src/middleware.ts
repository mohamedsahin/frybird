import { NextResponse } from 'next/server';

const SESSION_TOKEN = process.env.ADMIN_SESSION_TOKEN || 'frybird-dev-session-change-me';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  const isLogin = pathname === '/admin/login';
  const isLoginApi = pathname === '/api/admin/login';
  const guardPage = pathname.startsWith('/admin') && !isLogin;
  const guardApi = pathname.startsWith('/api/admin') && !isLoginApi;

  if (guardPage || guardApi) {
    const token = req.cookies.get('frybird_admin')?.value;
    if (token !== SESSION_TOKEN) {
      if (guardApi) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'content-type': 'application/json' },
        });
      }
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
