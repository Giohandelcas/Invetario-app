import type { Role } from "@/types/api";

export const ROLES = ["ADMIN", "VENDEDOR", "BODEGA"] as const satisfies readonly Role[];

export const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Administrador",
  VENDEDOR: "Vendedor",
  BODEGA: "Bodega",
};

export function hasRole(role: Role, allowed: readonly Role[]): boolean {
  return allowed.includes(role);
}
