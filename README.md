# DevCourses Store 🛒

**DevCourses Store** es un proyecto **full-stack e-commerce** para la venta de **cursos de programación online**.  
Está desarrollado como **trabajo final** del curso Fullstack Nivel 2 en **Academia ForIT**.

El proyecto implementa una **arquitectura limpia**, separación de capas de dominio, infraestructura y aplicación, y aplica **principios de TDD** en el dominio. Incluye **autenticación**, carrito de compras, flujo completo de **checkout real** con **MercadoPago**, y está construido con T**ypeScript en todo el stack**.

---

## 🚀 Características principales
- 🟦 **TypeScript** en todo el stack
- 🧩 **Clean Architecture** para un código escalable y mantenible
- ✅ **TDD (Test-Driven Development)** con Vitest en el Dominio
- 🔐 **Autenticación con JWT** y **roles de usuario** (admin, student, instructor)
- 🛍️ **Carrito de compras** y gestión de cursos seleccionados con persistencia
- 💳 **Checkout completo con MercadoPago**:
  - Creación de órdenes
  - Generación de preferencias MP
  - Pagos reales
  - **Webhooks funcionales** para actualizar orden y pago
- 🌐 **API REST** construida con **Node.js + Express + Prisma + PostgreSQL**
- ⚛️ **Frontend independiente**: SPA con **React + Vite + TypeScript**
- 🐳 **Docker** y **Docker Compose** para contenedorización y despliegue consistente
- 🧱 **Tests unitarios y de integración** en el dominio


> ⚠️ Este proyecto es **académico**
Su objetivo principal es mostrar una **implementación escalable y mantenible de un e-commerce educativo**, no una plataforma completa de dictado de cursos.

---

## 📦 Flujo de Checkout implementado

El flujo completo ya está funcionando con MercadoPago:

1. **El usuario confirma la compra**  
2. **El backend crea la orden** y genera la preferencia de pago en MP  
3. **MercadoPago redirige al usuario al checkout**  
4. Al finalizar, MP envía **webhooks** a tu endpoint  
5. El backend:
   - Verifica el pago  
   - Ejecuta `completePayment` (dominio)  
   - Actualiza la orden → `paid`  
   - Marca el pago → `completed`  
6. El frontend puede consultar el estado actualizado

Toda la lógica de negocio está implementada dentro del **dominio**, manteniendo las dependencias aisladas con interfaces.

---


## 📂 Estructura del proyecto

```

devcourses-store/
├── domain/
|   ├── package.json
|   ├── src/
|   |   ├── entities/
|   |   ├── use-cases/
|   |   ├── services/
|   |   └── utils/
├── apps/
|   ├── backend/                → API REST + infraestructura
|   |   ├── package.json
│   │   ├── tsconfig.json 
|   |   └── prisma/
│   │   │   └── schema.prisma
|   |   └── src/
│   │   │   ├── lib/ 
│   │   │   ├── routes/  
│   │   │   ├── controllers/
│   │   │   ├── services/  
│   │   │   ├── middlewares/
│   │   │   ├── validators/    
│   │   │   ├── tests-collection-postman/  
│   │   │   ├── server.ts  
│   │   │   └── app.ts  
|   ├── frontend/               → SPA React + Vite
│   │   ├── tsconfig.json 
│   │   ├── package.json 
│   |   └── src/
│   │   │  ├── components/ 
│   │   │  ├── contexts/ 
│   │   │  ├── features/ 
│   │   │  ├── mocks/ 
│   │   │  ├── routes/ 
│   │   │  ├── services/ 
│   │   │  ├── pages/ 
│   │   │  ├── styles/ 
│   │   │  ├── utils/ 
│   │   │  ├── App.tsx 
│   │   │  └── main.tsx
├── backend-conatiner.dockerfile
├── frontend-conatiner.dockerfile
├── docker-compose.yml
├── .gitignore
├── tsconfig.json
├── package.json
└── README.md

```

---

## 🛠️ Tecnologías

- **Dominio:** TypeScript + TDD + Clean Architecture  
- **Backend:** Node.js + Express + Prisma + PostgreSQL
- **Pagos:** MercadoPago (checkout + webhooks)  
- **Frontend:** React + Vite + TypeScript
- **Testing:** Vitest 
- **Contenedores:** Docker & Docker Compose
- **Arquitectura:** Clean Architecture


---


## 🎨 Vista previa del Frontend

A continuación algunas capturas principales de la aplicación:


| Home | Cursos | Carrito |
|------|--------|---------|
| ![](apps/frontend/public/home.png) | ![](apps/frontend/public/courses.png) | ![](apps/frontend/public/cart.png) |

| Checkout | Register | Panel Admin |
|----------|--------|--------------|
| ![](apps/frontend/public/payment-successful.png) | ![](apps/frontend/public/register.png) | ![](apps/frontend/public/admin-panel.png) |


---


## 🧩 Funcionalidades del Frontend

- SPA construida con React + Vite + TypeScript

- Navegación con React Router

- Gestión del carrito con estado global + persistencia

- Render dinámico de cursos agrupados por nivel

- Protección de rutas según rol (admin / student / instructor)

- Manejo de errores y loaders

- Diseño responsive mobile → desktop

- Panel de Administración de cursos y usuarios 

- Integración completa con el backend (login, cursos, carrito, checkout)


---


## ⚙️ Cómo ejecutar el proyecto localmente

🔸 1. Clonar el repositorio

```
git clone https://github.com/Sil-Palaoro/devcourses-store.git
cd devcourses-store
```

🔸 2. Levantar la base de datos PostgreSQL

Si tenés Docker Compose, podés levantar el servicio de base de datos fácilmente:

```
docker-compose up -d
```

Esto iniciará un contenedor con PostgreSQL usando las variables de entorno definidas en .env.

Si preferís levantarlo manualmente:

```
docker run --name devcourses-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=<tu-password> -e POSTGRES_DB=devcourses -p 5432:5432 -d postgres
```

🔸 3. Instalar dependencias manualmente (sin Docker compose)

Instalá las dependencias de la raíz y de cada paquete:

```
npm install
cd apps/backend && npm install
cd ../frontend/devcourses && npm install
```

🔸 4. Configurar Prisma y la base de datos

Asegurate de tener un archivo .env dentro de apps/backend/ con la URL de conexión a tu base de datos:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/devcourses"
JWT_SECRET="tu_clave_secreta"
```

Luego ejecutá las migraciones:

```
cd apps/backend
npm run prisma:migrate
```

Y opcionalmente, generá el cliente de Prisma:

```
npx prisma generate
```

🔸 5. Ejecutar el backend

```
npm run dev
```

Por defecto se levanta en http://localhost:4000

🔸 6. Ejecutar el frontend

En otra terminal:

```
cd apps/frontend
npm run dev
```

Por defecto se levanta en http://localhost:5173


---

## 🧠 Arquitectura limpia aplicada

El proyecto sigue los principios de **Clean Architecture**, separando:

| Capa                       | Descripción                                                         | Ejemplo                   |
| -------------------------- | ------------------------------------------------------------------- | ------------------------- |
| **Domain**                 | Lógica de negocio pura, independiente de frameworks o base de datos | `use-cases/`, `entities/` |
| **Application / Services** | Interfaz entre dominio e infraestructura                            | `services/`               |
| **Infrastructure**         | Implementaciones concretas (Prisma, Express, JWT, etc.)             | `apps/backend/lib/`       |
| **Presentation**           | Interfaz de usuario (SPA)                                           | `apps/frontend/`          |


El dominio desconoce completamente Express, Prisma, MP, JWT, etc.
Esto facilita el testing, la mantenibilidad y la extensibilidad del sistema.

---

## 🧪 Testing

El proyecto utiliza **Vitest** para pruebas unitarias y de integración.
Los tests están escritos en Vitest, enfocados principalmente en:
- Entidades
- Casos de uso
- Servicios mockeados del dominio

Para ejecutar las pruebas:

```
cd domain
npm test
```


---

## 🚧 Estado del proyecto

Actualmente en **fase final de desarrollo**.  

- ✔️ Carrito  
- ✔️ Login + roles  
- ✔️ CRUD de cursos  
- ✔️ Checkout completo con MercadoPago  
- ✔️ Webhooks funcionales  
- ✔️ Arquitectura limpia implementada  
- ⬜ Tests de integración end-to-end (próximo paso)  
- ⬜ Mejoras de UI en el frontend  


---

## 📜 Licencia

Este proyecto está bajo la licencia [MIT].

---

## 🙌 Créditos

Creado por **Silvina Palaoro**  
Desarrollado como parte del **Trabajo Final – Fullstack Nivel 2 - Academia ForIT**.
