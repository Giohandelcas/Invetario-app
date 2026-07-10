import { requireRole } from "@/lib/auth/dal";

export const metadata = { title: "Órdenes de compra" };

export default async function PurchaseOrdersPage() {
  await requireRole(["ADMIN", "BODEGA"]);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Órdenes de compra
      </h1>
      <p className="text-muted-foreground">
        Ciclo Borrador → Ordenada → (Parcialmente) Recibida (RF-08) —
        /purchase-orders. Recibir mercancía dispara movimientos de inventario
        (COMPRA_ENTRADA) dentro de la misma transacción.
      </p>
    </div>
  );
}
