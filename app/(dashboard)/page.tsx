import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { verifySession } from "@/lib/auth/dal";
import { ROLE_LABELS } from "@/lib/roles";

export default async function OverviewPage() {
  const session = await verifySession();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Hola, {session.name}
        </h1>
        <p className="text-muted-foreground">
          Sesión iniciada como {ROLE_LABELS[session.role]}.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Alertas de stock bajo</CardDescription>
            <CardTitle className="text-3xl">—</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Pedidos pendientes</CardDescription>
            <CardTitle className="text-3xl">—</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Órdenes de compra abiertas</CardDescription>
            <CardTitle className="text-3xl">—</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Valor de inventario (RF-11)</CardDescription>
            <CardTitle className="text-3xl">—</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <p className="text-sm text-muted-foreground">
        Los datos reales de estas tarjetas llegan de{" "}
        <code className="rounded bg-muted px-1 py-0.5">GET /reports/*</code> y{" "}
        <code className="rounded bg-muted px-1 py-0.5">
          GET /inventory/low-stock-alerts
        </code>{" "}
        una vez que <code className="rounded bg-muted px-1 py-0.5">inventario-api</code>{" "}
        tenga JWT real (requerimientos.md, Próximos Pasos #7).
      </p>
    </div>
  );
}
