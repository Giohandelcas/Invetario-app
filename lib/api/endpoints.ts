/**
 * Rutas de `inventario-api`, una constante por endpoint documentado en
 * `inventario-api/docs/API-CONTRACTS.md`. Centralizar los paths acá evita que
 * un typo en un string literal rompa una llamada silenciosamente.
 */

export const endpoints = {
  auth: {
    login: () => `/auth/login`,
  },
  users: {
    list: () => `/users`,
    detail: (id: string) => `/users/${id}`,
  },
  customers: {
    register: () => `/customers/register`,
    me: () => `/customers/me`,
    list: () => `/customers`,
    detail: (id: string) => `/customers/${id}`,
  },
  categories: {
    list: () => `/categories`,
    detail: (id: string) => `/categories/${id}`,
  },
  products: {
    list: () => `/products`,
    detail: (id: string) => `/products/${id}`,
    images: (id: string) => `/products/${id}/images`,
    image: (id: string, imageId: string) => `/products/${id}/images/${imageId}`,
    variants: (id: string) => `/products/${id}/variants`,
    variant: (id: string, variantId: string) =>
      `/products/${id}/variants/${variantId}`,
  },
  suppliers: {
    list: () => `/suppliers`,
    detail: (id: string) => `/suppliers/${id}`,
    products: (id: string) => `/suppliers/${id}/products`,
    product: (id: string, productId: string) =>
      `/suppliers/${id}/products/${productId}`,
  },
  inventory: {
    movements: () => `/inventory/movements`,
    adjustments: () => `/inventory/adjustments`,
    lowStockAlerts: () => `/inventory/low-stock-alerts`,
  },
  purchaseOrders: {
    list: () => `/purchase-orders`,
    detail: (id: string) => `/purchase-orders/${id}`,
    markOrdered: (id: string) => `/purchase-orders/${id}/mark-ordered`,
    cancel: (id: string) => `/purchase-orders/${id}/cancel`,
    receive: (id: string) => `/purchase-orders/${id}/receive`,
  },
  orders: {
    list: () => `/orders`,
    detail: (id: string) => `/orders/${id}`,
    confirm: (id: string) => `/orders/${id}/confirm`,
    markPaid: (id: string) => `/orders/${id}/mark-paid`,
    ship: (id: string) => `/orders/${id}/ship`,
    deliver: (id: string) => `/orders/${id}/deliver`,
    cancel: (id: string) => `/orders/${id}/cancel`,
  },
  reports: {
    topProducts: () => `/reports/top-products`,
    inventoryValue: () => `/reports/inventory-value`,
    salesByPeriod: () => `/reports/sales-by-period`,
    inventoryTurnover: () => `/reports/inventory-turnover`,
  },
  auditLogs: {
    list: () => `/audit-logs`,
  },
} as const;
