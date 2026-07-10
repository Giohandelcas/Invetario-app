import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

import type { Role } from "@/types/api";

const COOKIE_NAME = "session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Sesión local de `inventario-app`, distinta del JWT que emitirá
 * `inventario-api` (requerimientos.md, Próximos Pasos #7). `token` guarda ese
 * JWT tal cual, para reenviarlo como `Authorization: Bearer` en
 * `lib/api/client.ts`; `role`/`id`/`name` son un espejo de solo-lectura para
 * no tener que decodificar el JWT en cada Server Component.
 */
export interface SessionPayload {
  userId: string;
  name: string;
  role: Role;
  token: string;
  expiresAt: number;
}

const secretKey = process.env.SESSION_SECRET;
const encodedKey = secretKey ? new TextEncoder().encode(secretKey) : null;

async function encrypt(payload: SessionPayload) {
  if (!encodedKey) {
    throw new Error("SESSION_SECRET no está configurado (ver .env.example).");
  }
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

async function decrypt(session: string | undefined) {
  if (!session || !encodedKey) return null;
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

/**
 * Se invoca desde el Server Action de login una vez que `inventario-api`
 * exponga un endpoint de autenticación real (hoy no existe: Próximos Pasos
 * #7). Recibe el JWT del backend y lo envuelve en la cookie de sesión local.
 */
export async function createSession(
  user: Pick<SessionPayload, "userId" | "name" | "role" | "token">,
) {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const session = await encrypt({ ...user, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(expiresAt),
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = await decrypt(cookieStore.get(COOKIE_NAME)?.value);
  if (!session || session.expiresAt < Date.now()) return null;
  return session;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
