# X (ex Twitter) API - Node.js Project

Este proyecto está desarrollado para interactuar con la API de X (antes conocida como Twitter) utilizando Node.js. Implementa funcionalidades para recuperar y crear publicaciones, y tiene como objetivo ser una herramienta para explorar las capacidades de la API de Twitter.

## Tabla de Contenidos
- [X (ex Twitter) API - Node.js Project](#x-ex-twitter-api---nodejs-project)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Introducción](#introducción)
  - [Instalación](#instalación)
  - [Configuración](#configuración)
  - [Uso](#uso)
  - [Funcionalidades](#funcionalidades)
    - [Obtener Publicaciones](#obtener-publicaciones)
    - [Crear Publicaciones](#crear-publicaciones)
  - [Preguntas Adicionales](#preguntas-adicionales)
    - [Monitoreo de Posteos](#monitoreo-de-posteos)
    - [Almacenamiento de Mensajes](#almacenamiento-de-mensajes)
    - [Despliegue en la Nube](#despliegue-en-la-nube)
  - [Contribuciones](#contribuciones)

## Introducción

Este proyecto implementa funcionalidades para interactuar con la API de Twitter. Puedes buscar los tweets más recientes según hashtags, así como crear y responder publicaciones.

El proyecto ha sido desarrollado en Node.js y TypeScript, siguiendo principios de Clean Code y SOLID para asegurar la claridad y mantenibilidad del código.

## Instalación

1. Clona el repositorio en tu computadora:
   ```sh
   git clone https://github.com/tu-usuario/twitter-api-app.git
   ```

2. Dirígete al directorio del proyecto:
   ```sh
   cd twitter-api-app
   ```

3. Instala las dependencias del proyecto:
   ```sh
   npm install
   ```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto para almacenar las credenciales de la API de Twitter:

   ```
   CLIENT_ID=your_client_id
   CLIENT_SECRET=your_client_secret
   BEARER_TOKEN=your_bearer_token
   REDIRECT_URI=http://localhost:3000/api/v1/twitter/callback
   ```

   Asegúrate de agregar `.env` al archivo `.gitignore` para evitar subir información sensible a tu repositorio.

2. Crea un contenedor Docker para ejecutar el proyecto de forma portátil y replicable (opcional).

## Uso

Ejecuta la aplicación con el siguiente comando:
```sh
npm start
```
La aplicación se ejecutará en `http://localhost:3000`.

## Funcionalidades

### Obtener Publicaciones

La función `getPosts(maxCount, maxMinutes, hashtags)` permite obtener las publicaciones más recientes que contienen ciertos hashtags.

Ejemplo de uso:
```js
const posts = await getPosts(20, 5, ["#messi", "#scaloni"]);
```

Esta función devolverá un array de posts publicados en los últimos `maxMinutes` minutos que incluyan los hashtags especificados.

### Crear Publicaciones

La función `createPost(text, inReplyTo)` permite crear un nuevo post o responder a uno existente.

Ejemplo de uso:
```js
const id = await createPost("Esto es un mensaje de prueba");
// Responder a un tweet existente
const idRespuesta = await createPost("Esto es una respuesta", "ID_DEL_TWEET");
```

Esta función devolverá el `id` del tweet creado.

## Preguntas Adicionales

### Monitoreo de Posteos
Para monitorear continuamente la aparición de posteos con ciertas palabras clave y responder automáticamente o hacer retweet, consideraría lo siguiente:
- **Streaming API de Twitter**: Usaría la Streaming API para suscribirse a ciertos términos y recibir publicaciones en tiempo real.
- **Webhook**: Implementaría un webhook que desencadene respuestas automáticas o retweets.
- **Rate Limits**: Manejaría las limitaciones de la API para evitar exceder el límite de llamadas.

### Almacenamiento de Mensajes
Para almacenar tanto los tweets encontrados como las respuestas generadas:
- **Base de Datos NoSQL**: MongoDB para flexibilidad, o una base de datos relacional como PostgreSQL si se necesita un análisis más estructurado.
- **Persistencia con ORM**: Prisma o TypeORM podrían facilitar las operaciones sobre la base de datos.

### Despliegue en la Nube
Para tener este sistema corriendo continuamente en la nube:
- **AWS Lambda (Serverless)**: Usaría funciones Lambda para un costo bajo y disponibilidad continua.
- **Docker + AWS ECS**: Contenerizar la aplicación y desplegarla usando AWS ECS con Fargate.
- **Base de Datos en la Nube**: DynamoDB para NoSQL o MongoDB Atlas para MongoDB gestionado.

## Contribuciones
Si deseas contribuir a este proyecto, siéntete libre de abrir una PR (pull request) o crear un issue para discutir cambios.

