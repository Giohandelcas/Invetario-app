/**
 * Tipos compartidos que reflejan `inventario-api/prisma/schema.prisma` y los
 * contratos documentados en `inventario-api/docs/API-CONTRACTS.md`.
 *
 * Estos son los DTOs de *salida* que devuelve la API (JSON: los `Decimal` de
 * Prisma llegan serializados como `string`). No son los modelos de Prisma en
 * sí — mantenerlos en el frontend evita depender de `@prisma/client` fuera de
 * `inventario-api`. Si el schema cambia, actualizar aquí a mano.
 */

// ─── Enums (idénticos a schema.prisma) ─────────────────────────────────────

export type Role = "ADMIN" | "VENDEDOR" | "BODEGA";

export type OrderStatus =
  | "PENDIENTE"
  | "CONFIRMADO"
  | "PAGADO"
  | "ENVIADO"
  | "ENTREGADO"
  | "CANCELADO";

export type PurchaseOrderStatus =
  | "BORRADOR"
  | "ORDENADA"
  | "PARCIALMENTE_RECIBIDA"
  | "RECIBIDA"
  | "CANCELADA";

export type InventoryMovementType =
  | "COMPRA_ENTRADA"
  | "VENTA_SALIDA"
  | "AJUSTE_ENTRADA"
  | "AJUSTE_SALIDA"
  | "DEVOLUCION_ENTRADA"
  | "DEVOLUCION_SALIDA";

export type AuditAction = "CREATE" | "UPDATE" | "DELETE";

// ─── Paginación (común a todos los listados, ver API-CONTRACTS.md) ─────────

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// ─── Usuarios internos (RF-09) y clientes (RF-19) ──────────────────────────

export interface InternalUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  // passwordHash nunca se expone (ver API-CONTRACTS.md, GET /users).
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Catálogo ───────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  parent?: Category | null;
  children?: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText: string | null;
  position: number;
  createdAt: string;
}

/** `attributes` es JSON abierto (talla/color/presentación, etc. según categoría). */
export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  attributes: Record<string, unknown>;
  priceOverride: string | null;
  stock: number;
  lowStockThreshold: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  categoryId: string;
  category?: Category;
  /** Omitido por la API salvo actor ADMIN/BODEGA (a nivel de campo, no de ruta). */
  cost?: string;
  basePrice: string;
  active: boolean;
  images?: ProductImage[];
  variants?: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

// ─── Proveedores y compras (RF-07, RF-08) ──────────────────────────────────

export interface Supplier {
  id: string;
  name: string;
  contactName: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductSupplier {
  productId: string;
  supplierId: string;
  supplierSku: string | null;
  cost: string | null;
}

export interface PurchaseOrderItem {
  id: string;
  purchaseOrderId: string;
  productVariantId: string;
  productVariant?: ProductVariant;
  quantityOrdered: number;
  quantityReceived: number;
  unitCost: string;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplier?: Supplier;
  orderedById: string;
  orderedBy?: InternalUser;
  status: PurchaseOrderStatus;
  orderDate: string;
  expectedDate: string | null;
  notes: string | null;
  items?: PurchaseOrderItem[];
  createdAt: string;
  updatedAt: string;
}

// ─── Inventario (RF-03, RF-04, RF-05, RF-12) ───────────────────────────────

export interface InventoryMovement {
  id: string;
  productVariantId: string;
  productVariant?: ProductVariant;
  type: InventoryMovementType;
  quantity: number;
  reason: string | null;
  purchaseOrderId: string | null;
  orderId: string | null;
  performedById: string | null;
  createdAt: string;
}

/** Variante con `stock <= lowStockThreshold` (RF-05, GET /inventory/low-stock-alerts). */
export type LowStockAlert = ProductVariant & { product?: Product };

// ─── Pedidos de la tienda (RF-10, RF-17, RF-18) ────────────────────────────

export interface OrderItem {
  id: string;
  orderId: string;
  productVariantId: string;
  productVariant?: ProductVariant;
  quantity: number;
  unitPrice: string;
  subtotal: string;
}

export interface Order {
  id: string;
  customerId: string;
  customer?: Customer;
  status: OrderStatus;
  subtotal: string;
  total: string;
  contactEmail: string;
  contactPhone: string | null;
  shippingAddress: Record<string, unknown> | null;
  notes: string | null;
  items?: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

// ─── Auditoría (RF-12) ──────────────────────────────────────────────────────

export interface AuditLog {
  id: string;
  userId: string | null;
  entityType: string;
  entityId: string;
  action: AuditAction;
  changes: Record<string, unknown> | null;
  createdAt: string;
}

// ─── Reportes (RF-11) ───────────────────────────────────────────────────────

export interface TopProductRow {
  productVariantId: string;
  productName: string;
  variantSku: string;
  unitsSold: number;
  revenue: string;
}

export interface InventoryValueReport {
  totalValue: string;
  variantCount: number;
}

export interface SalesByPeriodRow {
  period: string;
  orderCount: number;
  total: string;
}

export interface InventoryTurnoverReport {
  unitsSold: number;
  currentStock: number;
  turnover: number;
}
