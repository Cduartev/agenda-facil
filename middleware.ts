import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token"); // ou o nome do cookie que você usa para autenticação

  const { pathname } = request.nextUrl;

  // Define rotas públicas que não precisam de autenticação
  const publicPaths = ["/", "/login", "/sign-up"];

  // Se for rota pública, deixa passar
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Se não tem token e está tentando acessar rota privada, redireciona para login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Permite seguir normalmente para rotas privadas quando tem token
  return NextResponse.next();
}

// Configura o middleware para rodar em rotas específicas
export const config = {
  matcher: ["/dashboard/:path*", "/barbearia/:path*", "/perfil/:path*", "/outra-rota-privada/:path*"],
};
