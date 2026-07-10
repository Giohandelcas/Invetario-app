import { requireRole } from "@/lib/auth/dal";

export const metadata = { title: "Reportes" };

export default async function ReportsPage() {
  await requireRole(["ADMIN"]);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">Reportes</h1>
      <p className="text-muted-foreground">
        Top productos, valor de inventario, ventas por período y rotación
        (RF-11) — /reports/*. Solo Admin.
      </p>
    </div>
  );
}
