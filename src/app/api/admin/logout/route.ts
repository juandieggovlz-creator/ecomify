import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Limpiar la cookie de sesión
  response.cookies.set({
    name: 'admin_session',
    value: '',
    httpOnly: true,
    path: '/',
    expires: new Date(0) // Expira inmediatamente
  });

  return response;
}
