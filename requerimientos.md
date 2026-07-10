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

### 2.1 Estructura de Repos (decidido)

Se optó por **3 repos separados** (no monorepo), como carpetas hermanas en `Desktop/`:

| Repo | Rol | Stack |
|------|-----|-------|
| `inventario-app` | Panel de administración (Backoffice) — **este repo** | Next.js (TypeScript) |
| `inventario-api` | Backend API, fuente única de verdad | NestJS + PostgreSQL/Prisma |
| `inventario-tienda` | Tienda pública (Storefront) | Next.js (TypeScript) |

`inventario-api` y `inventario-tienda` fueron inicializados con `git init` local (sin remoto en GitHub todavía).

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

## 6. Entidades Principales (modelo detallado)

- **Usuario** (interno: admin/vendedor/bodega)
- **Cliente** (usuario de la tienda)
- **Categoría** (auto-referencial, soporta subcategorías)
- **Producto**
- **Imagen de Producto**
- **Variante de Producto** (stock independiente, atributos en JSON)
- **Proveedor**
- **Producto-Proveedor** (asociación N:M con SKU/costo por proveedor)
- **Orden de Compra** (a proveedor) + **Detalle de Orden de Compra**
- **Movimiento de Inventario** (entrada/salida/ajuste, append-only)
- **Pedido** (de cliente, en la tienda) + **Detalle de Pedido**
- **Log de Auditoría** (genérico vía entityType/entityId)

Modelo implementado como schema de Prisma en [`inventario-api/prisma/schema.prisma`](../inventario-api/prisma/schema.prisma) (validado con `prisma validate`, cliente generado con `prisma generate`). Diagrama ER completo y decisiones de diseño en [`inventario-api/prisma/ER-DIAGRAM.md`](../inventario-api/prisma/ER-DIAGRAM.md).

**Decidido:**

- RF-18 — reserva de stock en checkout: **decremento inmediato** al confirmar el pedido (no reserva con expiración/carritos abandonados). Se ejecuta dentro de la misma transacción que crea el `Order`, sus `OrderItem` y el `InventoryMovement` de tipo `VENTA_SALIDA` (RNF-01). No se necesita una tabla de reservas con TTL.

Matriz de permisos por rol: ver sección 9.

---

## 7. Fuera de Alcance (v1)

- Pasarela de pago en línea (se contempla para una fase posterior).
- Multi-sucursal / múltiples bodegas.
- Aplicación móvil nativa.

---

## 8. Próximos Pasos

1. ~~Definir el modelo de datos detallado (diagrama ER).~~ ✅ Ver sección 6.
2. ~~Resolver mecanismo de reserva de stock en checkout.~~ ✅ Decremento inmediato — ver sección 6.
3. ~~Definir roles y permisos exactos por endpoint.~~ ✅ Ver sección 9.
4. Definir estructura de carpetas del backend (NestJS) y frontend (Next.js).
5. Diseñar contratos de API (endpoints REST) para inventario, productos y pedidos — al definirlos, aplicar los guards de rol según la matriz de la sección 9.

---

## 9. Matriz de Permisos por Rol

Actores del sistema (RF-09, RF-21):

- **Admin**, **Vendedor**, **Bodega** — usuarios internos (`User.role`, backoffice). Todas las rutas de backoffice requieren estar autenticado como alguno de estos tres (RNF-02); la tabla de abajo especifica *cuáles* de los tres, no si se requiere login (siempre se requiere).
- **Cliente** — usuario de la tienda, autenticado o invitado (RF-19). "Propio" significa que solo puede operar sobre sus propios recursos (su perfil, sus pedidos), nunca los de otro cliente.
- **Público** — sin autenticación (visitantes del storefront).

**Supuestos de negocio** (confirmados): Vendedor no ve costo/margen de productos, solo Admin. Vendedor no edita productos (solo lectura); cualquier alta/edición de catálogo pasa por Admin.

| Recurso | Acción | Admin | Vendedor | Bodega | Cliente | Público |
|---|---|:---:|:---:|:---:|:---:|:---:|
| **Usuarios internos** (RF-09) | Crear / Editar / Eliminar | ✅ | ❌ | ❌ | ❌ | ❌ |
| | Ver listado/detalle | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Clientes** | Registrarse | — | — | — | ✅ (self) | ✅ |
| | Ver / editar propio perfil | ✅ | ✅ (lectura) | ❌ | ✅ propio | ❌ |
| | Ver listado de clientes | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Categorías** (RF-06) | Crear / Editar / Eliminar | ✅ | ❌ | ❌ | ❌ | ❌ |
| | Ver | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Productos** (RF-01) | Crear / Editar / Eliminar | ✅ | ❌ | ❌ | ❌ | ❌ |
| | Ver (con costo) | ✅ | ❌ | ✅ | ❌ | ❌ |
| | Ver (sin costo, precio + stock) | ✅ | ✅ | ✅ | — | — |
| | Ver catálogo público (sin costo) | — | — | — | ✅ | ✅ |
| **Variantes de producto** (RF-02) | Crear / Editar / Eliminar definición | ✅ | ❌ | ❌ | ❌ | ❌ |
| | Editar umbral de stock bajo (RF-05) | ✅ | ❌ | ❌ | ❌ | ❌ |
| | Ver stock | ✅ | ✅ | ✅ | ✅ (disponibilidad) | ✅ (disponibilidad) |
| **Movimientos de inventario** (RF-03/04) | Crear ajuste manual / devolución | ✅ | ❌ | ✅ | ❌ | ❌ |
| | Crear por recepción de compra | ✅ | ❌ | ✅ | ❌ | ❌ |
| | Crear por venta (`VENTA_SALIDA`) | *(automático al confirmar `Order`, no vía endpoint directo)* | | | | |
| | Ver historial | ✅ | ✅ (lectura) | ✅ | ❌ | ❌ |
| **Alertas de stock bajo** (RF-05, RF-23) | Ver / recibir notificación | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Proveedores** (RF-07) | Crear / Editar / Eliminar | ✅ | ❌ | ❌ | ❌ | ❌ |
| | Ver | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Órdenes de compra** (RF-08) | Crear / Editar (en Borrador) | ✅ | ❌ | ✅ | ❌ | ❌ |
| | Marcar Ordenada / Cancelada | ✅ | ❌ | ✅ | ❌ | ❌ |
| | Recibir mercancía (dispara movimiento) | ✅ | ❌ | ✅ | ❌ | ❌ |
| | Ver | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Pedidos de clientes** (RF-10, RF-17, RF-18) | Crear (checkout) | — | — | — | ✅ propio (incl. invitado) | ✅ (checkout invitado) |
| | Ver propio pedido / historial | ✅ | ✅ | ✅ (solo lectura logística) | ✅ propio | ❌ |
| | Ver todos los pedidos | ✅ | ✅ | ✅ | ❌ | ❌ |
| | Cambiar estado: Pendiente → Confirmado → Pagado | ✅ | ✅ | ❌ | ❌ | ❌ |
| | Cambiar estado: Pagado → Enviado → Entregado | ✅ | ❌ | ✅ | ❌ | ❌ |
| | Cancelar pedido | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Reportes** (RF-11) | Ver | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Log de auditoría** (RF-12) | Ver | ✅ | ❌ | ❌ | ❌ | ❌ |
| | Crear / Editar / Eliminar | *(no existe endpoint de escritura — se genera automáticamente en cada acción auditada)* | | | | |

### Notas de implementación

- Toda ruta de backoffice exige estar autenticado como uno de los tres roles internos; toda ruta de cliente autenticada exige sesión de cliente. El catálogo público (`GET /products`, `GET /categories`) no exige autenticación.
- Los pedidos con checkout de invitado no requieren sesión de cliente: el `Customer` se crea/reutiliza por email en el momento del checkout (ver sección 6, "Decisiones de diseño" en `inventario-api/prisma/ER-DIAGRAM.md`), y el pedido queda asociado a ese `Customer` aunque no haya sesión.
- La restricción "Ver productos sin costo" para Vendedor es a nivel de campo, no de endpoint completo — el mismo `GET /products/:id` debe omitir `cost` según el rol de quien lo llama, no ser una ruta separada.
