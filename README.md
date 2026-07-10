# inventario-app — Panel de Administración (Backoffice)

Panel de administración (backoffice) del sistema de Inventario + Tienda en Línea: gestión de inventario, productos, ventas, proveedores, órdenes de compra y usuarios internos.

Parte de un sistema de 3 repos separados:

- **inventario-app** (este repo) — panel de administración (Next.js).
- [`inventario-api`](../inventario-api) — backend API (NestJS + PostgreSQL/Prisma), fuente única de verdad para inventario y órdenes.
- [`inventario-tienda`](../inventario-tienda) — tienda pública (Next.js), consume la misma API.

Ver [`requerimientos.md`](./requerimientos.md) para el detalle completo de requerimientos funcionales, no funcionales, arquitectura y entidades.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
