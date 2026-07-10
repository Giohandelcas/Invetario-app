import { verifySession } from "@/lib/auth/dal";

export const metadata = { title: "Detalle de pedido" };

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await verifySession();
  const { id } = await params;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">Pedido {id}</h1>
      <p className="text-muted-foreground">
        Items, cliente y transiciones de estado — /orders/:id/* (RF-10).
      </p>
    </div>
  );
}
