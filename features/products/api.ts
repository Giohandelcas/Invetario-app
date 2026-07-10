import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { PaginatedResult, Product } from "@/types/api";

export interface ListProductsParams {
  page?: number;
  pageSize?: number;
  categoryId?: string;
  search?: string;
}

/** GET /products — RF-01/RF-14/RF-15. `cost` llega solo si el actor es ADMIN/BODEGA. */
export function listProducts(params: ListProductsParams = {}) {
  const query = new URLSearchParams(
    Object.entries(params).flatMap(([key, value]) =>
      value === undefined ? [] : [[key, String(value)]],
    ),
  ).toString();

  return apiFetch<PaginatedResult<Product>>(
    `${endpoints.products.list()}${query ? `?${query}` : ""}`,
    { next: { tags: ["products"] } },
  );
}

/** GET /products/:id — incluye `images`, `variants`, `category`. */
export function getProduct(id: string) {
  return apiFetch<Product>(endpoints.products.detail(id), {
    next: { tags: [`product:${id}`] },
  });
}
