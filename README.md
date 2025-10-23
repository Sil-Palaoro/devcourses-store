# DevCourses Store 🛒

**DevCourses Store** es un proyecto **full-stack e-commerce** para la venta de **cursos de programación online**.  
Está desarrollado como **trabajo final** del curso Fullstack Nivel 2 en **Academia ForIT**.

El proyecto implementa una **arquitectura limpia**, separación de capas de dominio, infraestructura y aplicación, y aplica **principios de TDD** en el dominio.

---

## 🚀 Características principales
- 🟦 **TypeScript** en todo el stack
- ✅ **TDD (Test-Driven Development)** con Vitest
- 🧩 **Clean Architecture** para un código escalable y mantenible
- 🛍️ **Carrito de compras** y gestión de cursos seleccionados
- 💳 Flujo básico de **checkout** (mock de pagos)
- 🌐 **API REST** construida con **Node.js + Express + Prisma + PostgreSQL**
- ⚛️ **Frontend independiente**: SPA con **React + Vite + TypeScript**
- 🐳 **Docker** y **Docker Compose** para contenedorización y despliegue consistente
- 🔐 **Autenticación con JWT** y **roles de usuario** (admin, student, instructor)
- 🧱 **Tests unitarios y de integración** en el dominio


> ⚠️ Este proyecto es **académico**
Su objetivo principal es mostrar una **implementación escalable y mantenible de un e-commerce educativo**, no una plataforma completa de dictado de cursos.

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
|   ├── backend/
|   |   ├── package.json
│   │   ├── tsconfig.json 
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
|   ├── frontend/ 
│   │   ├── tsconfig.json 
│   │   ├── package.json 
│   │   ├── public/ 
|   |   └── src/
│   │   │   ├── components/ 
│   │   │   ├── app.tsx  
│   │   │   └── main.tsx  
├── docker/ 
├── docker-compose.yml
├── .gitignore
├── tsconfig.json
├── package.json
└── README.md

```

---

## 🛠️ Tecnologías

- **Dominio:** TypeScript + TDD
- **Backend:** Node.js + Express + Prisma + PostgreSQL
- **Frontend:** React + Vite + TypeScript
- **Testing:** Vitest 
- **Contenedores:** Docker & Docker Compose
- **Arquitectura:** Clean Architecture


---

⚙️ Cómo ejecutar el proyecto localmente

🔸 1. Clonar el repositorio

```
git clone https://github.com/Sil-Palaoro/devcourses-store.git
cd devcourses-store

```

🔸 2. Levantar la base de datos PostgreSQL

Si tenés Docker Compose, podés levantar el servicio de base de datos fácilmente (todavía por implementarse):

```

docker-compose up -d

```

Esto iniciará un contenedor con PostgreSQL usando las variables de entorno definidas en .env.

Si preferís levantarlo manualmente:

```

docker run --name devcourses-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=<tu-password> -e POSTGRES_DB=devcourses -p 5432:5432 -d postgres

```

🔸 3. Instalar dependencias

Instalá las dependencias de la raíz y de cada paquete:

```

npm install
cd apps/backend && npm install
cd ../frontend && npm install

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
npx prisma migrate dev

```

Y opcionalmente, generá el cliente de Prisma:

```

npx prisma generate

```

🔸 5. Ejecutar el backend

```

npm run dev

```

Por defecto se levanta en http://localhost:3000

🔸 6. Ejecutar el frontend

En otra terminal:

```

cd apps/frontend/devcourses
npm run dev

```

Por defecto se levanta en http://localhost:5173

---

🧠 **Arquitectura limpia aplicada**
El proyecto sigue los principios de **Clean Architecture**, separando:

| Capa                       | Descripción                                                         | Ejemplo                   |
| -------------------------- | ------------------------------------------------------------------- | ------------------------- |
| **Domain**                 | Lógica de negocio pura, independiente de frameworks o base de datos | `use-cases/`, `entities/` |
| **Application / Services** | Interfaz entre dominio e infraestructura                            | `services/`               |
| **Infrastructure**         | Implementaciones concretas (Prisma, Express, JWT, etc.)             | `apps/backend/lib/`       |
| **Presentation**           | Interfaz de usuario (SPA)                                           | `apps/frontend/`          |


Esto facilita el testing, la mantenibilidad y la extensibilidad del sistema.

---

🧪 **Testing**

El proyecto utiliza **Vitest** para pruebas unitarias y de integración.
Los tests del dominio cubren entidades, casos de uso y servicios mockeados.

Para ejecutar las pruebas:

```
cd domain
npm test
```

---

## 🚧 Estado del proyecto

Actualmente en **fase media de desarrollo**.  
Se irán agregando **issues**, **features** y **tests** progresivamente.

---

## 📜 Licencia

Este proyecto está bajo la licencia [MIT].

---

## 🙌 Créditos

Creado por **Silvina Palaoro**  
Desarrollado como parte del **Trabajo Final – Fullstack Nivel 2 - Academia ForIT**.
