# Music Catalog - Frontend

## Autores

- Daniela Culqui
- Cristian Tenorio

## Descripción General

Aplicación web desarrollada con React que consume una API REST construida en Django para gestionar un catálogo de artistas y álbumes musicales, con autenticación OAuth 2.0.

## Objetivo

Construir una aplicación completa en React que consuma la API REST del backend, permitiendo listar, crear, editar y eliminar artistas y álbumes, con autenticación OAuth 2.0 y una interfaz cuidada usando Material UI.

## Requisitos previos

- Node.js y npm instalados
- Editor de código (recomendado: VS Code)
- Navegador actualizado (recomendado: Chrome)
- React (usar Vite)
- El backend (`music-catalog-backend`) corriendo en `http://127.0.0.1:8000`

## Requisitos técnicos

- Material UI (@mui/material, @emotion/react, @emotion/styled)
- Axios para las llamadas a la API
- React Router DOM para la navegación
- Variables de entorno (.env) para configurar la URL de la API y las credenciales OAuth

## Funcionalidades

- Login con autenticación OAuth 2.0
- Listado de artistas y álbumes, con buscador
- Crear, editar y eliminar artistas (incluye carga de foto)
- Crear, editar y eliminar álbumes
- Visualización de detalle de artista, con sus álbumes asociados
- Manejo de errores visible en pantalla
- Estados de carga y confirmaciones de eliminación
- Diseño responsive (adaptado a celulares)

## Estructura del proyecto

```
/src
  /components
    Navbar.jsx
    ConfirmDialog.jsx
    ErrorAlert.jsx
  /pages
    Login.jsx
    ArtistList.jsx
    ArtistForm.jsx
    ArtistDetail.jsx
    AlbumList.jsx
    AlbumForm.jsx
  /services
    api.js
    authService.js
    artistaService.js
    albumService.js
  theme.js
  App.jsx
  main.jsx
```

## Variables de entorno (.env)

```
VITE_API_URL=http://127.0.0.1:8000
VITE_CLIENT_ID=tu_client_id
VITE_CLIENT_SECRET=tu_client_secret
```

El `client_id` y `client_secret` se obtienen registrando una aplicación OAuth2 en el panel de administración del backend (ver README del backend, sección "Registrar una aplicación OAuth2").

## Instalación del proyecto

1. Clonar el repositorio

```
git clone https://github.com/danielaculqui-maker/music-catalog-frontend.git
cd music-catalog-frontend
```

2. Abrir en VS Code la carpeta del repositorio clonado

3. Instalar las dependencias base

```
npm install
```

4. Instalar Material UI y sus dependencias (si no quedaron instaladas con el paso anterior)

```
npm install @mui/material @emotion/react @emotion/styled
```

5. Instalar Axios

```
npm install axios
```

6. Instalar React Router

```
npm install react-router-dom
```

7. Crear el archivo `.env` en la raíz del proyecto con las variables de entorno indicadas arriba

## Comandos útiles

Ejecutar el servidor de desarrollo

```
npm run dev
```

Comprobar versión de dependencias

```
npm list
```

Limpiar dependencias

```
rm -rf node_modules
npm install
```

## Comandos git

Verificar los archivos modificados

```
git status
```

Agregar archivos al área de preparación

```
git add .
```

Realizar un commit

```
git commit -m "descripción de cambios"
```

Enviar los cambios a GitHub

```
git push
```

## Autenticación

El login se realiza contra el endpoint `/o/token/` del backend, usando el grant type `password`. El token obtenido se guarda en `localStorage` y se envía automáticamente en cada petición protegida mediante un interceptor de Axios.

