import { requireRole } from "@/lib/auth/dal";

export const metadata = { title: "Auditoría" };

export default async function AuditLogPage() {
  await requireRole(["ADMIN"]);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">Auditoría</h1>
      <p className="text-muted-foreground">
        Log de cambios críticos (RF-12) — GET /audit-logs. Cobertura actual:
        cambios de rol de usuario y de precio/costo de producto (ver
        &quot;Alcance actual de RF-12&quot; en API-CONTRACTS.md); el movimiento
        de stock ya se audita vía InventoryMovement, no está duplicado acá.
      </p>
    </div>
  );
}
