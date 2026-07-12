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
4. ~~Definir estructura de carpetas del backend (NestJS).~~ ✅ 10 módulos de dominio implementados — ver sección 10.
5. ~~Diseñar contratos de API (endpoints REST) para inventario, productos y pedidos.~~ ✅ Implementados y probados end-to-end — ver `inventario-api/docs/API-CONTRACTS.md`.
6. ~~Definir estructura de carpetas del frontend (Next.js) en `inventario-app` e `inventario-tienda`.~~ ✅ Ver secciones 11 y 12.
7. ~~Implementar el módulo de autenticación (JWT + Passport) para actores internos y clientes.~~ ✅ `POST /auth/login` (internos) y `POST /customers/login` (RF-19, clientes) en `inventario-api/src/auth`/`src/customers` — mismo `JwtStrategy`/`OptionalJwtAuthGuard`, payload `{ actorType: 'internal'|'customer', ... }`. Ver `inventario-api/docs/API-CONTRACTS.md` y sección 12 (frontend de `inventario-tienda`).
8. Conectar `DATABASE_URL` a una instancia persistente de PostgreSQL (Railway/Render/Fly.io, sección 5) y correr `prisma migrate dev` para tener historial real de migraciones — lo probado hasta ahora corrió contra un Postgres local efímero (`npx prisma dev`) con el schema aplicado vía `prisma db push`, que no genera migraciones versionadas.
9. Implementar notificaciones (RF-20, RF-23) — no hay módulo de email ni de notificaciones internas todavía; los cambios de estado de pedido no notifican a nadie.
10. Extender `AuditLog` (RF-12) más allá de rol de usuario y precio/costo de producto — ver "Alcance actual de RF-12" en `inventario-api/docs/API-CONTRACTS.md`.

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

- No hay un prefijo `/admin/*` separado — cada ruta individual declara `@RequirePermission(resource, action)` (o `@Public()`), y `RolesGuard` la resuelve contra la matriz en tiempo real. Toda ruta no marcada `@Public()` exige un actor autenticado que la matriz permita para ese resource+action; el catálogo público (`GET /products`, `GET /categories`) es la excepción explícita.
- Los pedidos con checkout de invitado no requieren JWT de cliente: el `Customer` se crea/reutiliza por email en el momento del checkout (ver sección 6, "Decisiones de diseño" en `inventario-api/prisma/ER-DIAGRAM.md`), y el pedido queda asociado a ese `Customer` aunque no haya sesión.
- La restricción "Ver productos sin costo" para Vendedor es a nivel de campo, no de endpoint completo — el mismo `GET /products/:id` omite `cost` según el actor que llama, no es una ruta separada.
- La matriz vive también como constantes tipadas en [`inventario-api/src/auth/permissions.matrix.ts`](../inventario-api/src/auth/permissions.matrix.ts), y `RolesGuard` (`inventario-api/src/auth/guards/roles.guard.ts`) la consume directamente en cada request — implementado y probado, no solo diseñado. Ver el detalle completo de cada endpoint en [`inventario-api/docs/API-CONTRACTS.md`](../inventario-api/docs/API-CONTRACTS.md).

---

## 10. Estructura del Backend (implementado)

`inventario-api` está organizado en 10 módulos de dominio NestJS, cada uno con `*.module.ts` + `*.controller.ts` + `*.service.ts` + `dto/`, todos usando Prisma directamente (sin capa de repositorio intermedia — no había necesidad real de esa abstracción sobre un solo ORM):

```text
src/
├── prisma/          PrismaService (wrap de PrismaClient con driver adapter @prisma/adapter-pg — ver nota abajo)
├── auth/             permissions.matrix.ts, RolesGuard, decoradores @RequirePermission/@Public/@CurrentUser
├── audit/            AuditLog (RF-12) — módulo global, otros services lo inyectan
├── users/             Usuarios internos (RF-09)
├── customers/         Clientes de la tienda (RF-19)
├── categories/         Categorías y subcategorías (RF-06)
├── products/           Productos, imágenes, variantes (RF-01/02/14/15)
├── suppliers/           Proveedores (RF-07)
├── inventory/            Movimientos de stock, ajustes, alertas (RF-03/04/05) — el único punto que muta ProductVariant.stock
├── purchase-orders/       Órdenes de compra a proveedor (RF-08)
├── orders/                 Pedidos de la tienda, checkout (RF-10/17/18)
└── reports/                 Reportes agregados (RF-11)
```

Detalle de cada endpoint (método, ruta, actor permitido, DTO) en [`inventario-api/docs/API-CONTRACTS.md`](../inventario-api/docs/API-CONTRACTS.md).

**Nota sobre Prisma 7**: esta versión de Prisma rompe con lo que dice el entrenamiento del asistente — `PrismaClient` ya no acepta una connection string embebida en el schema, exige un *driver adapter* explícito (`@prisma/adapter-pg` para Postgres) pasado al constructor. `prisma.config.ts` (generado por `prisma init`) solo lo lee el CLI (`migrate`, `generate`, `db push`), nunca el `PrismaClient` en runtime — por eso `PrismaService` arma su propio adapter desde `process.env.DATABASE_URL`. También, por defecto el generador emite el cliente como ESM (`import.meta.url` en el código generado), lo que rompe al cargarse desde un proyecto NestJS en CommonJS — se fijó con `moduleFormat = "cjs"` en el bloque `generator client` de `schema.prisma`.

---

## 11. Estructura del Frontend — `inventario-app` (implementado)

App Router (Next.js 16) organizado por route groups, con el layout del panel protegido por sesión y navegación filtrada por rol:

```text
app/
├── (auth)/login/          Login (Server Action stub — ver nota JWT abajo)
├── (dashboard)/           Requiere sesión (lib/auth/dal.ts → verifySession)
│   ├── layout.tsx          AppSidebar (nav filtrada por rol) + header
│   ├── page.tsx             Resumen
│   ├── productos/            RF-01/02/14/15 — único módulo con fetch+tabla real (referencia)
│   ├── categorias/            RF-06
│   ├── proveedores/            RF-07 (ADMIN, BODEGA)
│   ├── ordenes-compra/          RF-08 (ADMIN, BODEGA)
│   ├── inventario/               movimientos (RF-03/04) + alertas (RF-05, ADMIN/BODEGA)
│   ├── pedidos/                   RF-10/17/18
│   ├── usuarios/                   RF-09 (ADMIN)
│   ├── reportes/                    RF-11 (ADMIN)
│   └── auditoria/                    RF-12 (ADMIN)
├── layout.tsx             Root layout (fuentes, Toaster, TooltipProvider)
proxy.ts                  Redirect optimista a /login sin cookie de sesión (Next 16 renombró Middleware → Proxy)
lib/
├── auth/                  session.ts (cookie cifrada con jose), dal.ts (verifySession/requireRole), permissions.ts (nav por rol), actions.ts (logout)
├── api/                   client.ts (fetch wrapper server-only + Bearer), endpoints.ts (paths de API-CONTRACTS.md)
└── roles.ts, utils.ts
features/<módulo>/         api.ts + components/ por módulo de dominio (hoy solo `products` completo; el resto son placeholders con la ruta y el rol ya resueltos)
types/api.ts               DTOs espejo de inventario-api/prisma/schema.prisma
components/ui/             shadcn/ui (style "base-nova", sobre @base-ui/react — usa prop `render`, no `asChild` de Radix)
```

Decisiones registradas:

- **JWT real** (punto 7 de esta lista, resuelto): el login llama a `POST /auth/login` y, si funciona, envuelve el `accessToken` en una cookie de sesión local (HttpOnly, cifrada con `jose`) vía `createSession()`. `proxy.ts` + `verifySession()` redirigen a `/login` cuando no hay cookie — mismo comportamiento fail-closed que `RolesGuard` en el backend.
- El gating de navegación (`lib/auth/permissions.ts`) es solo UX (qué links mostrar); la autorización real vive y se re-verifica en `inventario-api` (`permissions.matrix.ts` + `RolesGuard`).
- shadcn/ui se inicializó con su versión actual (`style: "base-nova"`, sobre `@base-ui/react` en vez de Radix): la composición polimórfica usa `render={<Link .../>}` en lugar de `asChild` + hijo — revisar `node_modules/@base-ui/react/docs/react/utils/use-render.md` antes de asumir la API de Radix.
- Paleta y tipografía (slate + verde stock, Fira Sans/Fira Code) elegidas con `ui-ux-pro-max` para un dashboard denso en datos; tokens en `app/globals.css`.

---

## 12. Estructura del Frontend — `inventario-tienda` (implementado)

App Router sin route groups (a diferencia de `inventario-app`, todo acá es público — no hay distintos layouts que segmentar):

```text
app/
├── page.tsx                Landing simple → /productos
├── productos/               RF-13/14/15 — único módulo con fetch+tabla real (referencia)
│   ├── page.tsx              Catálogo con filtro por nombre/categoría vía <form method="get"> (sin JS)
│   └── [id]/page.tsx          Ficha de producto + selector de variante + agregar al carrito
├── checkout/                RF-17/18 — Client Component (necesita el carrito) que llama a un
│   ├── page.tsx                Server Action directamente (no <form action=fn>, para poder
│   ├── actions.ts               limpiar el carrito y mostrar la confirmación sin round-trip extra)
│   └── order-confirmation.tsx    Adjunta el Bearer si hay sesión (apiFetch, default withAuth) —
│                                  el pedido queda asociado a la cuenta en vez de crear un guest
├── cuenta/                  RF-19 — login/registro de cliente, funcional
│   ├── page.tsx               Resumen (nombre/email + logout) o prompt de login/registro
│   ├── login/                   POST /customers/login → createSession()
│   ├── registro/                 POST /customers/register + login encadenado (misma sesión)
│   └── pedidos/page.tsx           Historial — requireSession(), GET /orders (propios)
├── pedidos/[id]/page.tsx     requireSession() + GET /orders/:id (403/404 → notFound())
└── layout.tsx                Root layout (fuentes, SiteHeader/Footer, CartProvider, Toaster);
                               async — lee la sesión para pasarle el nombre al header
lib/
├── api/                     client.ts (fetch wrapper server-only; adjunta Authorization por
│                              default si hay sesión — withAuth:false para login/registro),
│                              endpoints.ts
├── auth/                    session.ts (cookie cifrada con jose, mismo patrón que
│                              inventario-app), dal.ts (requireSession → redirect a
│                              /cuenta/login), actions.ts (logout)
├── cart/cart-context.tsx     Carrito 100% client-side (Context + localStorage) — no hay
│                              endpoint de carrito en la API, se manda como items[] recién en
│                              POST /orders al confirmar
└── order-status.ts           Labels en español de OrderStatus
features/<módulo>/           api.ts + components/ (`products` completo; `categories`/`orders` solo api.ts)
types/api.ts                 Subset de DTOs relevante al storefront — sin `cost` (el actor
                              PUBLICO/CLIENTE nunca lo recibe, ni siquiera como campo opcional).
                              OrderItem sin variante/producto anidados: GET /orders/:id
                              devuelve solo productVariantId (verificado contra la API real)
```

Decisiones registradas:

- **Login de clientes** (RF-19, resuelto): mismo patrón que `inventario-app` — `POST /customers/login` en `inventario-api` (`AuthService.loginCustomer`, comparte `JwtStrategy`/`OptionalJwtAuthGuard` con el login interno, payload `{ actorType: 'customer', id }`) y `lib/auth/session.ts` envuelve ese JWT en una cookie local. Un cliente creado solo por checkout de invitado (sin `passwordHash`) no puede loguearse hasta registrar contraseña.
- El registro (`/cuenta/registro`) encadena un login automático con las mismas credenciales — no le pide al usuario que las tipee dos veces.
- El checkout adjunta el Bearer del cliente automáticamente si está logueado (comportamiento por default de `apiFetch`, no hace falta código extra): `inventario-api` (`OrdersService.resolveCustomerId`) asocia el pedido a esa cuenta en vez de crear un guest. `order-confirmation.tsx` muestra un mensaje distinto según `loggedIn` (link a "Mis pedidos" vs. aviso de guardar el número).
- El precio y subtotal de cada línea del pedido los calcula `inventario-api` a partir de `productVariantId` — el carrito del cliente nunca manda un precio, solo cantidades.
- Paleta y tipografía (azul + naranja CTA, Rubik/Nunito Sans) elegidas con `ui-ux-pro-max` para un catálogo e-commerce mobile-first (RNF-04); `next.config.ts` permite cualquier host `https` para `next/image` hasta que se elija Cloudinary/S3 (sección 5) — restringir apenas se decida (RNF-05).

Probado end-to-end contra un Postgres local con datos reales: catálogo lista y filtra por categoría; checkout de invitado y logueado (el logueado asocia el pedido a la cuenta, verificado comparando `customerId`); login rechaza password incorrecta y guests sin contraseña registrada (401); historial de pedidos y detalle muestran datos reales y redirigen a login si no hay sesión; un pedido ajeno/inexistente en `/pedidos/:id` da 404.
