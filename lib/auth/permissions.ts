import type { Role } from "@/types/api";

/**
 * Gating de *navegación* únicamente (qué links mostrar en el sidebar según
 * el rol). No es la fuente de verdad de autorización — eso vive en
 * `inventario-api/src/auth/permissions.matrix.ts` y se re-verifica en cada
 * endpoint (RolesGuard). Ocultar un link acá es UX, no seguridad: ver
 * requerimientos.md sección 9 para la matriz completa por recurso/acción.
 */
export const NAV_PERMISSIONS = {
  overview: ["ADMIN", "VENDEDOR", "BODEGA"],
  products: ["ADMIN", "VENDEDOR", "BODEGA"],
  categories: ["ADMIN", "VENDEDOR", "BODEGA"],
  suppliers: ["ADMIN", "BODEGA"],
  purchaseOrders: ["ADMIN", "BODEGA"],
  inventoryMovements: ["ADMIN", "VENDEDOR", "BODEGA"],
  lowStockAlerts: ["ADMIN", "BODEGA"],
  orders: ["ADMIN", "VENDEDOR", "BODEGA"],
  users: ["ADMIN"],
  reports: ["ADMIN"],
  auditLog: ["ADMIN"],
} as const satisfies Record<string, readonly Role[]>;

export type NavKey = keyof typeof NAV_PERMISSIONS;

export function canAccessNav(role: Role, key: NavKey): boolean {
  return (NAV_PERMISSIONS[key] as readonly Role[]).includes(role);
}
