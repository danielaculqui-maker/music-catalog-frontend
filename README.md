# Music Catalog - Frontend

Aplicación web desarrollada con React (Vite) que consume la API REST del backend para gestionar un catálogo de artistas y álbumes musicales, con autenticación OAuth 2.0.

## 🛠️ Tecnologías

- React (Vite)
- React Router DOM
- Material UI (MUI)
- Axios

## 📋 Requisitos previos

- Node.js y npm instalados
- El backend (`music-catalog-backend`) corriendo en `http://127.0.0.1:8000`

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/music-catalog-frontend.git
cd music-catalog-frontend
```

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
VITE_API_URL=http://127.0.0.1:8000
VITE_CLIENT_ID=tu_client_id
VITE_CLIENT_SECRET=tu_client_secret
```

> El `client_id` y `client_secret` se obtienen registrando una aplicación OAuth2 en el panel de administración del backend (ver README del backend, sección "Registrar una aplicación OAuth2"). Deben coincidir exactamente con los generados ahí.

### 4. Levantar el servidor de desarrollo

```bash
npm run dev
```

La aplicación queda disponible en `http://localhost:5173/`

## 📱 Funcionalidades

- **Login** con OAuth 2.0 (usuario y contraseña)
- **Artistas**: listar, ver detalle (con sus álbumes), crear, editar (incluye foto) y eliminar
- **Álbumes**: listar (agrupados por artista), crear, editar y eliminar
- Interfaz con diseño personalizado (paleta oscura, tipografía propia)

## 📁 Estructura del proyecto

```
src/
├── components/       # Componentes reutilizables (Navbar, ConfirmDialog)
├── pages/            # Pantallas de la aplicación
├── services/         # Lógica de conexión con la API (axios)
├── theme.js          # Tema visual de Material UI
└── App.jsx           # Rutas de la aplicación
```

## 🔐 Autenticación

El login se realiza contra el endpoint `/o/token/` del backend. El token obtenido se guarda en `localStorage` y se envía automáticamente en cada petición protegida mediante un interceptor de Axios.

## 👥 Autores

- Daniela Culqui
- Cristian Tenorio