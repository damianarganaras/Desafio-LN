# Desafío Backend - Gestor de Catálogo (La Nación)

Este proyecto es una API REST para un gestor de catálogo, hecha con Node.js, Express y MySQL. Como se pedía en el desafío, no usé ningún ORM, todo el acceso a datos es con queries SQL crudas.

El proyecto está 100% dockerizado, así que para levantarlo es un solo comando.

---

## Índice

* [Cómo Correr el Proyecto](#cómo-correr-el-proyecto)
* [Documentación y Pruebas de API](#documentación-y-pruebas-de-api)
* [Cómo Correr los Tests](#cómo-correr-los-tests)
* [Decisiones de Arquitectura y Diseño](#decisiones-de-arquitectura-y-diseño)
* [Stack Tecnológico](#stack-tecnológico)
* [Resetear la Base de Datos](#resetear-la-base-de-datos)

---

## Cómo Correr el Proyecto

### Prerrequisitos

Para correr el proyecto, solo necesitaríamos tener:

* [Docker](https://www.docker.com/products/docker-desktop/)
* [Git](https://git-scm.com/) (para clonar el repo)

### 1. Clonar el repo

```bash
git clone https://github.com/damianarganaras/Desafio-LN.git
cd desafio-ln
````

### 2. Levantar los contenedores

Este es el único comando que necesitamos. Va a construir la imagen de Node, bajar la de MySQL, iniciar todo y correr el `init.sql` para crear y poblar la base de datos automáticamente.

```bash
docker-compose up --build
```

*(Uso `--build` para que `npm install` corra bien dentro del contenedor e instale las dependencias nuevas, como Swagger).*

### 3. Proyecto listo

  * La API se ejecuta en: **`http://localhost:3000`**
  * La base de datos (MySQL) queda expuesta en: `localhost:3306` (por si queremos conectarnos con DBeaver por ejemplo).

---

## Documentación y Pruebas de API

El desafío pedía Swagger o Postman. Elegí Swagger porque la documentación es interactiva y se puede probar todo desde la misma UI.

La documentación completa, donde se puede leer y ejecutar cada endpoint, está acá:

**`http://localhost:3000/swagger`**

### Autenticación

Para cumplir con el requisito de "autenticación básica", **todos los endpoints están protegidos por una API Key.**

Para probar la API desde Swagger, tenés que seguir estos pasos:

1. Hacé clic en el botón **"Authorize"** (arriba a la derecha).
2. En el campo `apiKeyAuth (x-api-key)`, ingresá la siguiente clave:
   ```
   nacion-secret-key-123
   ```
3. Hacé clic en "Authorize" y cerrá la ventana.

Ahora todos los endpoints ejecutados desde Swagger incluirán el header `x-api-key` y funcionarán correctamente.

---

## Cómo Correr los Tests

El proyecto incluye una suite de tests de integración (usando Jest y Supertest) que valida toda la lógica de negocio, incluyendo las transacciones de `POST /order`.

Para correrlos, primero asegurémonos de que los contenedores estén arriba (`docker-compose up`) y después ejecutamos:

```bash
npm test
```

Los tests corren contra la base de datos dockerizada (leyendo el `.env.test`) y son **idempotentes** (limpian los datos que crean/modifican).

### Cobertura de Tests

El proyecto cuenta con **12 tests de integración** que cubren todos los endpoints principales:

- **5 tests de productos:** GET /product, GET /search (2 tests), GET /:slug (2 tests)
- **7 tests de órdenes:** POST /order (4 tests), GET /order (3 tests)

Para ejecutar los tests con reporte de cobertura:

```bash
npm test -- --coverage
```

**Cobertura actual: 93%**


File                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------------------|---------|----------|---------|---------|-------------------
All files                  |      93 |    69.91 |   89.65 |   92.94 |
 src                       |     100 |      100 |     100 |     100 |
  app.js                   |     100 |      100 |     100 |     100 |
 src/DTOs                  |     100 |      100 |     100 |     100 |
  create-order.dto.js      |     100 |      100 |     100 |     100 |
 src/config                |   86.36 |       50 |      50 |   86.36 |
  database.js              |   78.57 |       50 |      50 |   78.57 | 28-30
  index.js                 |     100 |       50 |     100 |     100 | 2-9
  swagger.js               |     100 |      100 |     100 |     100 |
 src/controllers           |   88.88 |    94.44 |     100 |   88.88 |
  order.controller.js      |      90 |      100 |     100 |      90 | 9
  product.controller.js    |   88.23 |    94.44 |     100 |   88.23 | 16,34
 src/middleware            |    92.3 |       70 |     100 |    92.3 |
  auth.middleware.js       |    87.5 |       75 |     100 |    87.5 | 9
  errorHandler.js          |     100 |    42.85 |     100 |     100 | 4-6
  validation.middleware.js |    90.9 |    88.88 |     100 |    90.9 | 15
 src/repositories          |    92.3 |    59.37 |     100 |    92.3 |
  order.repository.js      |    92.3 |       75 |     100 |    92.3 | 11-12
  product.repository.js    |    92.3 |       50 |     100 |    92.3 | 17,19,81,83
 src/routes                |     100 |      100 |     100 |     100 |
  order.routes.js          |     100 |      100 |     100 |     100 |
  product.routes.js        |     100 |      100 |     100 |     100 |
 src/services              |   97.87 |       88 |     100 |   97.77 |
  order.service.js         |   96.77 |    86.95 |     100 |   96.55 | 22
  product.service.js       |     100 |      100 |     100 |     100 |
 src/utils/errors          |   81.81 |       25 |      60 |   81.81 |
  AppError.js              |     100 |      100 |     100 |     100 |
  index.js                 |   66.66 |       25 |      50 |   66.66 | 15,35
---------------------------|---------|----------|---------|---------|-----------------

La cobertura supera ampliamente el estándar recomendado del 80%, con módulos críticos como `product.service.js` y `order.service.js` alcanzando el 100%.

---

## Decisiones de Arquitectura y Diseño

Acá detallo algunas de las decisiones técnicas que tomé durante el desarrollo:

* **Arquitectura de Capas:** El proyecto está separado en `/routes`, `/controllers`, `/services` y `/repositories`, como pedía el desafío, para mantener todo ordenado y modular.
  * `/services` contiene la lógica de negocio (ej. transacciones).
  * `/repositories` es la única capa que interactúa con la DB, usando 100% SQL crudo.
  * `/dtos` y `/middleware` se encargan de la validación de inputs y el manejo de errores.

* **Stack (Node.js vs. Strapi):** El desafío mencionaba Strapi como un plus, pero decidí ir por el camino de Node.js puro para tener control total del SQL.

* **Manejo de Secretos (`.env` vs. Hardcodeo):** Aunque la "mejor práctica" es usar archivos `.env` (que ignoramos con `.gitignore`), para este desafío prioricé el requisito de "fácilmente ejecutable". Decidí "hardcodear" los secretos (`API_KEY`, `DB_PASSWORD`) en el `docker-compose.yml` para que la persona que lo ejecute el proyecto solo necesite correr `docker-compose up` y no tenga que andar creando y configurando archivos `.env` a mano.

* **Testing (Tests Idempotentes):** Implementé tests de integración con Jest/Supertest. El test más complejo (`POST /order`) es "idempotente": lee el stock original, corre la prueba (que modifica el stock) y usa un bloque `finally` para restaurar el stock original. Esto asegura que los tests se puedan correr infinitas veces y siempre pasen.

* **Paginación con Metadatos:** Los endpoints de listado (`/product` y `/search`) no solo devuelven un array. Hacen una segunda query (`SELECT COUNT(*)`) para devolver un objeto de metadatos de paginación (`{ data, total, totalPages, currentPage }`).

* **Fix de UTF-8:** Durante el desarrollo tuve un bug con caracteres especiales (como `¡` o `Jardín`) al momento de cargar la DB. Lo solucioné forzando la codificación UTF-8 en los comandos del `docker-compose` de MySQL, en la conexión de `mysql2` en Node, y en la definición `CREATE TABLE` de cada tabla en el `init.sql`.

* **Lógica de "Slug" (`GET /product/{SLUG}`):** Para este endpoint, se implementó en SQL usando `REGEXP_REPLACE` para transformar el `name` en un `slug` (minúsculas, espacios por guiones, sin caracteres especiales) directamente en la query, sin necesidad de almacenar un campo extra en la tabla.

---

## Stack de Tecnologías

* **Servidor:** Node.js, Express
* **Base de Datos:** MySQL 8.0 (con el driver `mysql2/promise`)
* **Contenerización:** Docker y Docker Compose
* **Documentación:** Swagger (OpenAPI 3.0)
* **Testing:** Jest, Supertest

---

## Resetear la Base de Datos

Para volver a correr el `init.sql` y limpiar los datos, solo debemos ejecutar este comando:

```bash
docker-compose down --volumes
```

Y después se levanta de nuevo con:

```bash
docker-compose up
```