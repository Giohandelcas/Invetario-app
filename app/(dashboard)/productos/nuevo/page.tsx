import { requireRole } from "@/lib/auth/dal";

export const metadata = { title: "Nuevo producto" };

export default async function NewProductPage() {
  await requireRole(["ADMIN"]);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">Nuevo producto</h1>
      <p className="text-muted-foreground">
        Formulario de alta (RF-01) — POST /products. Pendiente de implementar:
        campos base + gestión de imágenes y variantes iniciales.
      </p>
    </div>
  );
}
