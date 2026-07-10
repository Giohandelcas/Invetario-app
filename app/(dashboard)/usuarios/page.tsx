import { requireRole } from "@/lib/auth/dal";

export const metadata = { title: "Usuarios internos" };

export default async function UsersPage() {
  await requireRole(["ADMIN"]);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Usuarios internos
      </h1>
      <p className="text-muted-foreground">
        Admin, Vendedor, Bodega (RF-09) — /users. Cambiar el rol de un usuario
        dispara un AuditLog (RF-12).
      </p>
    </div>
  );
}
