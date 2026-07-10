import { verifySession } from "@/lib/auth/dal";

export const metadata = { title: "Pedidos" };

export default async function OrdersPage() {
  await verifySession();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">Pedidos</h1>
      <p className="text-muted-foreground">
        Pedidos de la tienda y su estado (RF-10, RF-17, RF-18) — /orders.
        Bodega ve el listado con acceso de solo lectura logística; los cambios
        de estado Pendiente→Confirmado→Pagado son de Admin/Vendedor, y
        Pagado→Enviado→Entregado de Admin/Bodega.
      </p>
    </div>
  );
}
