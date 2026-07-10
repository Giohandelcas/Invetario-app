# Requerimientos del Proyecto: Sistema de Inventario + Tienda en Línea

## 1. Descripción General

El proyecto consiste en dos módulos que comparten información de inventario en tiempo real:

1. **Panel de Administración (Backoffice)**: sistema interno para la gestión de inventario, productos, ventas y usuarios.
2. **Tienda en Línea (Storefront)**: sitio público donde los clientes pueden ver y pedir productos.

Ambos módulos consumen la misma base de datos a través de un **backend independiente (API)**, garantizando que el stock se mantenga consistente entre ambos.

---

## 2. Arquitectura General

```
┌─────────────────────┐        ┌──────────────────────┐        ┌───────────────┐
│  Next.js (Admin)     │        │                       │        │                │
│  Panel de inventario │───────▶│                       │        │                │
└─────────────────────┘        │   Backend API (NestJS)│───────▶│  PostgreSQL    │
┌─────────────────────┐        │   REST / tRPC         │        │  (Prisma ORM)  │
│  Next.js (Storefront)│───────▶│                       │        │                │
│  Tienda pública       │        │                       │        │                │
└─────────────────────┘        └──────────────────────┘        └───────────────┘
```

- **Frontend Admin** y **Frontend Tienda** pueden ser dos aplicaciones Next.js separadas (o dos secciones de una misma app con rutas y permisos distintos).
- **Backend**: NestJS, expone una API REST (o tRPC) consumida por ambos frontends.
- **Base de datos**: PostgreSQL, única fuente de verdad para inventario, productos y órdenes.

---

## 3. Requisitos Funcionales

### 3.1 Módulo de Inventario (Backoffice)

| ID | Requisito |
|----|-----------|
| RF-01 | Crear, editar, eliminar y consultar productos (nombre, descripción, precio, costo, SKU, categoría, imágenes). |
| RF-02 | Gestionar variantes de producto (talla, color, presentación, etc.) con stock independiente por variante. |
| RF-03 | Registrar entradas y salidas de inventario (compras, ventas, ajustes, devoluciones). |
| RF-04 | Mostrar historial de movimientos de stock por producto. |
| RF-05 | Generar alertas cuando el stock de un producto esté por debajo de un umbral configurable. |
| RF-06 | Gestionar categorías y subcategorías de productos. |
| RF-07 | Gestionar proveedores y asociarlos a productos. |
| RF-08 | Registrar y gestionar órdenes de compra a proveedores. |
| RF-09 | Gestionar usuarios internos con roles (Administrador, Vendedor, Bodega). |
| RF-10 | Ver y gestionar los pedidos realizados desde la tienda pública, actualizando su estado (pendiente, confirmado, pagado, enviado, entregado, cancelado). |
| RF-11 | Generar reportes: productos más vendidos, valor total de inventario, ventas por período, rotación de inventario. |
| RF-12 | Registrar auditoría de cambios críticos (quién y cuándo modificó stock, precios, etc.). |

### 3.2 Tienda en Línea (Storefront)

| ID | Requisito |
|----|-----------|
| RF-13 | Mostrar catálogo de productos con imágenes, precio y disponibilidad. |
| RF-14 | Filtrar y buscar productos por categoría, nombre y rango de precio. |
| RF-15 | Ver ficha de producto con detalle, variantes disponibles y stock en tiempo real. |
| RF-16 | Agregar productos al carrito de compras. |
| RF-17 | Finalizar pedido (checkout) sin pago en línea; el pedido queda como "pendiente de pago". |
| RF-18 | Reservar/descontar stock automáticamente al confirmar un pedido, evitando sobreventa. |
| RF-19 | Registro y login de cliente (opcional en v1, para ver historial de pedidos). |
| RF-20 | Notificar al cliente (email) el estado de su pedido. |

### 3.3 Compartidos

| ID | Requisito |
|----|-----------|
| RF-21 | Autenticación y autorización con roles diferenciados (admin interno vs cliente). |
| RF-22 | Sincronización en tiempo real (o casi real) del stock entre backoffice y tienda. |
| RF-23 | Notificaciones internas de stock bajo y nuevos pedidos. |

---

## 4. Requisitos No Funcionales

| ID | Requisito |
|----|-----------|
| RNF-01 | El stock debe mantenerse consistente ante ventas simultáneas (uso de transacciones a nivel de base de datos). |
| RNF-02 | Las rutas del panel de administración deben estar protegidas y no accesibles públicamente. |
| RNF-03 | Todas las entradas de usuario deben validarse en backend, no solo en frontend. |
| RNF-04 | El catálogo público debe ser responsive (mobile-first). |
| RNF-05 | Las imágenes de producto deben optimizarse (compresión, lazy loading) para buen rendimiento. |
| RNF-06 | El sistema debe soportar crecimiento del catálogo sin degradar el rendimiento de búsqueda/listado (uso de paginación e índices en BD). |
| RNF-07 | La API debe estar documentada (Swagger/OpenAPI) para facilitar el consumo desde ambos frontends. |
| RNF-08 | Los datos sensibles (contraseñas, tokens) deben almacenarse cifrados/hasheados. |
| RNF-09 | El sistema debe registrar logs suficientes para diagnosticar errores en producción. |

---

## 5. Stack Tecnológico Propuesto

| Capa | Tecnología |
|------|-----------|
| Frontend (Admin + Tienda) | Next.js (TypeScript) |
| Backend / API | NestJS (TypeScript), independiente del frontend |
| Base de datos | PostgreSQL |
| ORM | Prisma |
| Autenticación | JWT + Passport (backend), roles diferenciados |
| Almacenamiento de imágenes | Cloudinary o S3-compatible (ej. Supabase Storage) |
| Documentación de API | Swagger (OpenAPI) |
| Hosting Frontend | Vercel |
| Hosting Backend + BD | Railway / Render / Fly.io |

---

## 6. Entidades Principales (borrador inicial)

- **Usuario** (interno: admin/vendedor/bodega)
- **Cliente** (usuario de la tienda)
- **Producto**
- **Variante de Producto**
- **Categoría**
- **Proveedor**
- **Orden de Compra** (a proveedor)
- **Movimiento de Inventario** (entrada/salida/ajuste)
- **Pedido** (de cliente, en la tienda)
- **Detalle de Pedido**
- **Log de Auditoría**

*(Este modelo se detallará en un diagrama entidad-relación en una siguiente etapa.)*

---

## 7. Fuera de Alcance (v1)

- Pasarela de pago en línea (se contempla para una fase posterior).
- Multi-sucursal / múltiples bodegas.
- Aplicación móvil nativa.

---

## 8. Próximos Pasos

1. Definir el modelo de datos detallado (diagrama ER).
2. Definir estructura de carpetas del backend (NestJS) y frontend (Next.js).
3. Diseñar contratos de API (endpoints REST) para inventario, productos y pedidos.
4. Definir roles y permisos exactos por endpoint.
