import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/api";

const currency = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});

export function ProductsTable({
  products,
  showCost,
}: {
  products: Product[];
  showCost: boolean;
}) {
  if (products.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No hay productos para mostrar.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>SKU</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Categoría</TableHead>
          {showCost && <TableHead className="text-right">Costo</TableHead>}
          <TableHead className="text-right">Precio</TableHead>
          <TableHead className="text-right">Stock</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => {
          const totalStock = (product.variants ?? []).reduce(
            (sum, variant) => sum + variant.stock,
            0,
          );
          return (
            <TableRow key={product.id}>
              <TableCell className="font-mono text-xs">{product.sku}</TableCell>
              <TableCell>
                <Link
                  href={`/productos/${product.id}`}
                  className="font-medium hover:underline"
                >
                  {product.name}
                </Link>
              </TableCell>
              <TableCell>{product.category?.name ?? "—"}</TableCell>
              {showCost && (
                <TableCell className="text-right tabular-nums">
                  {product.cost ? currency.format(Number(product.cost)) : "—"}
                </TableCell>
              )}
              <TableCell className="text-right tabular-nums">
                {currency.format(Number(product.basePrice))}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {totalStock}
              </TableCell>
              <TableCell>
                <Badge variant={product.active ? "default" : "secondary"}>
                  {product.active ? "Activo" : "Inactivo"}
                </Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
