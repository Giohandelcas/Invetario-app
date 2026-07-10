import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Truck,
  ClipboardList,
  Boxes,
  AlertTriangle,
  ShoppingCart,
  Users,
  BarChart3,
  History,
} from "lucide-react";

import type { NavKey } from "@/lib/auth/permissions";

export interface NavItem {
  key: NavKey;
  href: string;
  label: string;
  icon: LucideIcon;
}

/** Un item por módulo de dominio (mismo agrupamiento que `inventario-api/src/*`). */
export const NAV_ITEMS: NavItem[] = [
  { key: "overview", href: "/", label: "Resumen", icon: LayoutDashboard },
  { key: "products", href: "/productos", label: "Productos", icon: Package },
  {
    key: "categories",
    href: "/categorias",
    label: "Categorías",
    icon: FolderTree,
  },
  { key: "suppliers", href: "/proveedores", label: "Proveedores", icon: Truck },
  {
    key: "purchaseOrders",
    href: "/ordenes-compra",
    label: "Órdenes de compra",
    icon: ClipboardList,
  },
  {
    key: "inventoryMovements",
    href: "/inventario/movimientos",
    label: "Movimientos de stock",
    icon: Boxes,
  },
  {
    key: "lowStockAlerts",
    href: "/inventario/alertas",
    label: "Alertas de stock bajo",
    icon: AlertTriangle,
  },
  { key: "orders", href: "/pedidos", label: "Pedidos", icon: ShoppingCart },
  { key: "users", href: "/usuarios", label: "Usuarios internos", icon: Users },
  { key: "reports", href: "/reportes", label: "Reportes", icon: BarChart3 },
  { key: "auditLog", href: "/auditoria", label: "Auditoría", icon: History },
];
