import { verifySession } from "@/lib/auth/dal";

export const metadata = { title: "Categorías" };

export default async function CategoriesPage() {
  await verifySession();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">Categorías</h1>
      <p className="text-muted-foreground">
        Categorías y subcategorías de productos (RF-06) — GET/POST/PATCH/DELETE
        /categories. Alta/edición solo ADMIN; lectura para todos los roles
        internos.
      </p>
    </div>
  );
}
