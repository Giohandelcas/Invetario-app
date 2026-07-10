import { requireRole } from "@/lib/auth/dal";

export const metadata = { title: "Detalle de orden de compra" };

export default async function PurchaseOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRole(["ADMIN", "BODEGA"]);
  const { id } = await params;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Orden de compra {id}
      </h1>
      <p className="text-muted-foreground">
        Items, estado y acciones (marcar ordenada, recibir, cancelar) —
        /purchase-orders/:id/* (RF-08).
      </p>
    </div>
  );
}
