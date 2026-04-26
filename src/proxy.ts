import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  // Solo aplicamos protección a /admin (excluyendo /admin/login) y /api/admin (excluyendo /api/admin/login)
  const isApiAuth = req.nextUrl.pathname.startsWith('/api/admin/login') || req.nextUrl.pathname.startsWith('/api/admin/logout');
  const isPageAuth = req.nextUrl.pathname.startsWith('/admin/login');

  if (isApiAuth || isPageAuth) {
    return NextResponse.next();
  }

  // Verificar la cookie de sesión
  const sessionCookie = req.cookies.get('admin_session');

  if (!sessionCookie || sessionCookie.value !== 'authenticated') {
    // Si es una petición API, devolver 401
    if (req.nextUrl.pathname.startsWith('/api/admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Si es una página de admin, redirigir al login
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configurar el middleware para que solo se ejecute en las rutas de admin
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
