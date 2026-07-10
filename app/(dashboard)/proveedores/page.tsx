import { requireRole } from "@/lib/auth/dal";

export const metadata = { title: "Proveedores" };

export default async function SuppliersPage() {
  await requireRole(["ADMIN", "BODEGA"]);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">Proveedores</h1>
      <p className="text-muted-foreground">
        Proveedores y su asociación N:M con productos (RF-07) — GET/POST/PATCH
        /suppliers. Vendedor no tiene acceso a este módulo (ver requerimientos.md
        sección 9).
      </p>
    </div>
  );
}
