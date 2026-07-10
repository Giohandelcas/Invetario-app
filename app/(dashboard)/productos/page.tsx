import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { verifySession } from "@/lib/auth/dal";
import { listProducts } from "@/features/products/api";
import { ProductsTable } from "@/features/products/components/products-table";

export const metadata = { title: "Productos" };

export default async function ProductsPage() {
  const session = await verifySession();
  const showCost = session.role === "ADMIN" || session.role === "BODEGA";

  let productsResult;
  let connectionError: string | null = null;
  try {
    productsResult = await listProducts();
  } catch {
    connectionError =
      "No se pudo conectar con inventario-api. Verificá que esté corriendo y que API_URL apunte a él.";
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Productos</h1>
          <p className="text-muted-foreground">
            Catálogo, variantes e imágenes (RF-01, RF-02, RF-14, RF-15).
          </p>
        </div>
        {session.role === "ADMIN" && (
          <Button render={<Link href="/productos/nuevo" />}>
            Nuevo producto
          </Button>
        )}
      </div>

      {connectionError ? (
        <Card>
          <CardContent className="py-6 text-sm text-muted-foreground">
            {connectionError}
          </CardContent>
        </Card>
      ) : (
        <ProductsTable products={productsResult!.data} showCost={showCost} />
      )}
    </div>
  );
}
