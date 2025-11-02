# Desafío Backend - Gestor de Catálogo (La Nación)

Esta es la solución al Challenge Backend. Es una API REST para un gestor de catálogo, hecha con Node.js, Express y MySQL. Como se pedía en el desafío, no usé ningún ORM, todo el acceso a datos es con queries SQL crudas.

El proyecto está 100% dockerizado, así que para levantarlo es un solo comando.

-----

## Stack

  * **Servidor:** Node.js, Express
  * **Base de Datos:** MySQL 8.0 (usando el driver `mysql2/promise`)
  * **Docker:** Docker y Docker Compose
  * **Documentación:** Swagger (OpenAPI 3.0)

-----

## Arquitectura y Decisiones de Diseño

La arquitectura está separada por capas, como pedía el desafío, para mantener todo ordenado y modular:

  * **/src/routes:** Definen los endpoints de la API. Acá también están los comentarios JSDoc para que Swagger arme la documentación.
  * **/src/controllers:** Manejan el `req` y `res`. No tienen lógica de negocio, solo le pasan la posta al servicio.
  * **/src/services:** Acá está el "core" de la lógica: validación de stock, coordinación de transacciones, etc.
  * **/src/repositories:** Es la única capa que toca la base de datos. Como se pidió, **no hay ORMs**, solo SQL crudo usando `mysql2` y transacciones manuales.
  * **/src/config:** Centraliza la config (variables de entorno) y el pool de conexiones.
  * **/src/middleware:** Acá está el manejador de errores global y el middleware de validación para los DTOs.
  * **/src/dtos:** Define la estructura de los datos que entran (ej. `POST /order`) para validarlos.

-----

## Prerrequisitos

Para correr el proyecto, solo necesitás tener:

  * [Docker](https://www.docker.com/products/docker-desktop/)
  * [Git](https://git-scm.com/) (para clonar el repo)

-----

## Cómo levantarlo

1.  **Clonate el repo:**

    ```bash
    git clone https://github.com/damianarganaras/Desafio-LN.git
    cd desafio-ln
    ```

2.  **Levantá los contenedores:**

    ```bash
    docker-compose up --build
    ```

    *(Uso `--build` para que `npm install` corra bien dentro del contenedor e instale las dependencias nuevas, como Swagger).*

3.  **¡Listo\!**

      * La API queda corriendo en: **`http://localhost:3001`**
      * La base de datos (MySQL) queda expuesta en: `localhost:3306` (por si querés chequearla con DBeaver o algo).

-----

## Documentación de la API (Swagger)

El desafío pedía Swagger o Postman. Elegí Swagger porque la documentación queda "viva" y se puede probar todo desde la misma UI.

La documentación completa, donde se puede leer y **ejecutar** cada endpoint, está acá:

**➡️ `http://localhost:3001/api-docs`**

-----

### Cómo resetear la base de datos

Si querés volver a correr el `init.sql` y limpiar los datos (volver a fábrica), solo tenés que tirar este comando:

```bash
docker-compose down --volumes
```

Y después la levantás de nuevo con `docker-compose up`.