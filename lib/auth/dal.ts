import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/session";
import type { Role } from "@/types/api";

/**
 * Data Access Layer: punto único para verificar sesión (patrón recomendado
 * en la guía de autenticación de Next.js). `cache()` evita repetir la
 * decodificación de la cookie dentro del mismo render.
 *
 * Mientras `inventario-api` no tenga JWT real (requerimientos.md, Próximos
 * Pasos #7), `getSession()` siempre devuelve `null` y esto siempre redirige a
 * `/login` — es el reflejo correcto del backend, que hoy responde 403
 * fail-closed a todo actor no público (ver API-CONTRACTS.md).
 */
export const verifySession = cache(async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return session;
});

export async function requireRole(allowed: readonly Role[]) {
  const session = await verifySession();
  if (!allowed.includes(session.role)) {
    redirect("/");
  }
  return session;
}
