import { requireRole } from "@/lib/auth/dal";

export const metadata = { title: "Alertas de stock bajo" };

export default async function LowStockAlertsPage() {
  await requireRole(["ADMIN", "BODEGA"]);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Alertas de stock bajo
      </h1>
      <p className="text-muted-foreground">
        Variantes con stock ≤ umbral configurable (RF-05) — GET
        /inventory/low-stock-alerts.
      </p>
    </div>
  );
}
