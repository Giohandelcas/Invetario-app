"use server";

export interface LoginState {
  error?: string;
}

/**
 * `inventario-api` todavía no expone un endpoint de login: `RolesGuard`
 * resuelve todo actor como PUBLICO hasta que exista `JwtStrategy`
 * (requerimientos.md, Próximos Pasos #7). Este action valida el formulario y
 * deja el punto de integración listo — cuando el backend tenga
 * `POST /auth/login`, reemplazar el cuerpo por la llamada real seguida de
 * `createSession()` (lib/auth/session.ts) y `redirect("/")`.
 */
export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email y contraseña son obligatorios." };
  }

  return {
    error:
      "Login no disponible todavía: inventario-api no implementa autenticación real (ver requerimientos.md, Próximos Pasos #7).",
  };
}
