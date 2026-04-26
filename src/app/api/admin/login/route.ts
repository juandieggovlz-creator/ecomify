import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const expectedUser = process.env.ADMIN_USER || 'admin';
    const expectedPwd = process.env.ADMIN_PASS || 'admin123';

    if (username === expectedUser && password === expectedPwd) {
      // Credenciales correctas, creamos una respuesta
      const response = NextResponse.json({ success: true });
      
      // Establecemos una cookie de sesión (sencilla para este caso)
      response.cookies.set({
        name: 'admin_session',
        value: 'authenticated',
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 // 1 día
      });

      return response;
    }

    return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
