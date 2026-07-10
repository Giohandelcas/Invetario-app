import { verifySession } from "@/lib/auth/dal";

export const metadata = { title: "Movimientos de inventario" };

export default async function InventoryMovementsPage() {
  await verifySession();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Movimientos de inventario
      </h1>
      <p className="text-muted-foreground">
        Historial append-only por variante (RF-03/RF-04) — GET
        /inventory/movements. Ajustes manuales (POST /inventory/adjustments)
        solo para Admin y Bodega; Vendedor tiene acceso de solo lectura.
      </p>
    </div>
  );
}
