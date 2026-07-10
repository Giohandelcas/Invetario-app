"use client";

import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
      <p className="text-lg font-medium">Algo salió mal</p>
      <p className="max-w-md text-sm text-muted-foreground">{error.message}</p>
      <Button onClick={reset}>Reintentar</Button>
    </div>
  );
}
