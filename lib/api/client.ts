import "server-only";

import { getSession } from "@/lib/auth/session";

/**
 * `inventario-api` corre en un proceso/host separado (ver requerimientos.md
 * sección 2.1 — repos hermanos). Nunca se expone al bundle del cliente:
 * todo el fetching pasa por Server Components / Server Actions, así que la
 * variable de entorno no lleva prefijo `NEXT_PUBLIC_`.
 */
const API_URL = process.env.API_URL ?? "http://localhost:3001";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface ApiFetchOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  /** Pasar `false` para llamadas públicas de catálogo (GET /products, /categories). */
  withAuth?: boolean;
  /** Se reenvía a `fetch`'s `next` option para revalidación/tags de cache. */
  next?: NextFetchRequestConfig;
}

/**
 * Wrapper delgado sobre `fetch` para llamar a `inventario-api`. Hoy el
 * backend no tiene JWT real (requerimientos.md, Próximos Pasos #7): mientras
 * `getSession()` devuelva `null`, cualquier ruta no pública responderá 403
 * (fail-closed, ver API-CONTRACTS.md) — este cliente no lo enmascara, deja
 * que `ApiError` suba para que la página lo maneje.
 */
export async function apiFetch<T>(
  path: string,
  { body, withAuth = true, headers, next, ...init }: ApiFetchOptions = {},
): Promise<T> {
  const requestHeaders = new Headers(headers);
  requestHeaders.set("Content-Type", "application/json");

  if (withAuth) {
    const session = await getSession();
    if (session) {
      requestHeaders.set("Authorization", `Bearer ${session.token}`);
    }
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    next,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new ApiError(
      `${init.method ?? "GET"} ${path} → ${response.status}`,
      response.status,
      errorBody,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
