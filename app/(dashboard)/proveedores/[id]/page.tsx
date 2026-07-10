import { requireRole } from "@/lib/auth/dal";

export const metadata = { title: "Detalle de proveedor" };

export default async function SupplierDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRole(["ADMIN", "BODEGA"]);
  const { id } = await params;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Proveedor {id}
      </h1>
      <p className="text-muted-foreground">
        Detalle + productos asociados — GET /suppliers/:id (RF-07).
      </p>
    </div>
  );
}
