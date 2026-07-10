import { notFound } from "next/navigation";

import { verifySession } from "@/lib/auth/dal";
import { ApiError } from "@/lib/api/client";
import { getProduct } from "@/features/products/api";

export const metadata = { title: "Detalle de producto" };

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await verifySession();
  const { id } = await params;

  const product = await getProduct(id).catch((error: unknown) => {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">{product.name}</h1>
      <p className="text-muted-foreground">
        SKU {product.sku} · {product.variants?.length ?? 0} variante(s)
      </p>
      {/* TODO: tabs de detalle (variantes, imágenes, proveedores) — RF-02, RF-07 */}
    </div>
  );
}
