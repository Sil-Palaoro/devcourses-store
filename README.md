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

🔸 Clonar el repositorio

```
git clone https://github.com/Sil-Palaoro/devcourses-store.git
cd devcourses-store
```

### Con Docker Compose

Si tenés Docker Compose, podés levantar el proyecto fácilmente:

🔸 1. Armar tus .env

Debes tener un archivo .env en el root y en la carpeta apps/frontend y con tus propias variables de entorno. Ej:

En el root:

```
#Para docker:
# Database
DB_USER=<tu-usuario-postgres>
DB_PASSWORD=<tu-password-postgres>
DB_NAME=devcoursesdb
DB_PORT=5432


# Prisma / backend DB URL
DATABASE_URL="postgresql://<tu-usuario-postgres>:<tu-password-postgres>@db:5432/devcoursesdb?schema=public"

```

En apps/frontend/.env

```
# Para docker: Frontend
VITE_API_BASE_URL="http://localhost:8080/api"
```


🔸 2. Levantar el container


```
docker-compose up -d
```

Esto iniciará un contenedor con los tres servicios usando las variables de entorno definidas en los .env.


🔸 3. Armar y poblar base de datos

Para tener la base lista para usar, con un ususario admin creado y algunos cursos ya listos para probar, corre los siguientes comandos.

```
docker compose exec backend bash
cd apps/backend
npm run seed
```


### Instalación manual


🔸 1. Requisitos previos 

Si preferís levantarlo manualmente, debes tener ya en ejecución Postgres localmente y crear una base de datos con el nombre "devcoursesdb". 

Asegurate de tener los archivos .env dentro de apps/backend/ y apps/frontend/ 

En los archivos .env del backend y frontend debes tener algo así:

apps/backend/.env

```
DATABASE_URL="postgresql://<tu-usuario-postgres>:<tu-password-postgres>@localhost:5432/devcoursesdb?schema=public"
PORT=4000

POSTGRES_USER=<tu-usuario-postgres>
POSTGRES_PASSWORD=<tu-password-postgres>
POSTGRES_DB=devcoursesdb
DB_PORT=5432

SECRET_KEY="una_clave_segura_y_larga"

```

apps/frontend/.env

```
VITE_API_BASE_URL="http://localhost:4000/api"
```


🔸 2. Instalar dependencias manualmente 

Instalá las dependencias de la raíz y de cada paquete:

```
npm install
cd domain && npm install
cd ../apps/backend && npm install
cd ../frontend && npm install
```


🔸 3. Transpilar código typescript a javascrip del dominio

Asegurate de transpilar el domain para que el frontend y backend puedan usar las entidades, servicios y casos de uso del domain 


```
cd domain
npm run build
```


🔸 4. Configurar Prisma y la base de datos

Ejecutá las migraciones:

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
- ⬜ Mejoras en el Admin Panel


---

## 📜 Licencia

Este proyecto está bajo la licencia [MIT].

---

## 🙌 Créditos

Creado por **Silvina Palaoro**  
Desarrollado como parte del **Trabajo Final – Fullstack Nivel 2 - Academia ForIT**.
