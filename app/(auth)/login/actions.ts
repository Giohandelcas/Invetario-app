"use server";

import { redirect } from "next/navigation";
import { ApiError, apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { createSession } from "@/lib/auth/session";
import type { Role } from "@/types/api";

export interface LoginState {
  error?: string;
}

interface LoginResponse {
  accessToken: string;
  user: { id: string; name: string; role: Role };
}

/** POST /auth/login (inventario-api/src/auth) — ver API-CONTRACTS.md. */
export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email y contraseña son obligatorios." };
  }

  let response: LoginResponse;
  try {
    response = await apiFetch<LoginResponse>(endpoints.auth.login(), {
      method: "POST",
      body: { email, password },
      withAuth: false,
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return { error: "Email o contraseña incorrectos." };
    }
    return {
      error:
        "No se pudo conectar con inventario-api. Verificá que esté corriendo y que API_URL apunte a él.",
    };
  }

  await createSession({
    userId: response.user.id,
    name: response.user.name,
    role: response.user.role,
    token: response.accessToken,
  });

  redirect("/");
}
