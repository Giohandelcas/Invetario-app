import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js 16 renombró Middleware a Proxy (mismo runtime/comportamiento,
 * `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`).
 *
 * Chequeo optimista (solo lee la cookie, sin golpear la API — ver la guía de
 * autenticación de Next.js): si no hay cookie de sesión, cualquier ruta fuera
 * de `(auth)` redirige a `/login`. La verificación real ocurre en
 * `lib/auth/dal.ts` (`verifySession`) dentro de cada Server Component.
 */
const PUBLIC_PATHS = ["/login"];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));
  const hasSessionCookie = request.cookies.has("session");

  if (!isPublicPath && !hasSessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicPath && hasSessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};
