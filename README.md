# Mi Clase - Proyecto React

Proyecto base con **React + Vite + Tailwind CSS**.

## Requisitos

- [Node.js](https://nodejs.org) (versión 18 o superior)

## Instalar dependencias

Desde la raíz del proyecto, ejecuta:

```bash
npm install
```

## Ejecutar el proyecto

```bash
npm run dev
```

Luego abre en el navegador:

```
http://localhost:5173
```

## Otros comandos

```bash
npm run build    # Genera la versión de producción en /dist
npm run lint     # Revisa el código con ESLint
```

## Estructura del proyecto

```
├── .env           # Variables de entorno (crear)
src/
├── App.jsx        # Componente principal
├── main.jsx       # Punto de entrada (no tocar)
├── index.css      # Estilos globales (importa Tailwind)
├── pages/         # Componentes de páginas (crear)
└── services/      # Servicios para comunicar con el backend (crear)
```

## Guía: qué usar y dónde

### `src/pages/` — Páginas

Crea la carpeta `pages` dentro de `src`. Aquí van los **componentes que representan una página completa** (una por ruta o pantalla de la app).

Ejemplo — `src/pages/Inicio.jsx`:

```jsx
function Inicio() {
  return <h1 className="text-2xl font-bold">Hola desde Inicio</h1>
}

export default Inicio
```

Luego se importa y usa en `App.jsx` (directamente o con `react-router-dom` si agregas rutas):

```jsx
import Inicio from './pages/Inicio'
```

### `src/services/` — Servicios

Crea la carpeta `services` dentro de `src`. Aquí van las **funciones que se comunican con el backend** (fetch, axios, etc.). Los componentes las llaman para obtener o enviar datos.

Ejemplo — `src/services/usuario.js`:

```js
const API_URL = 'http://localhost:3000/api'

export async function obtenerUsuarios() {
  const res = await fetch(`${API_URL}/usuarios`)
  return res.json()
}
```

Y se usa desde un componente:

```jsx
import { obtenerUsuarios } from '../services/usuario'
```

### `.env` — Variables de entorno

Crea un archivo `.env` en la **raíz del proyecto** (al lado de `package.json`) con la URL del backend:

```env
VITE_API_URL=http://localhost:3000/api
```

Reglas importantes:

- Las variables **deben partir con `VITE_`** para que Vite las exponga al código.
- Se leen con `import.meta.env.NOMBRE`, por ejemplo: `import.meta.env.VITE_API_URL`.
- Si cambias el `.env`, reinicia el servidor (`npm run dev`).

Ejemplo de uso en `src/services/usuario.js`:

```js
const API_URL = import.meta.env.VITE_API_URL

export async function obtenerUsuarios() {
  const res = await fetch(`${API_URL}/usuarios`)
  return res.json()
}
```

### Regla simple

| Qué necesitas | Dónde va |
|---|---|
| Una pantalla/página de la app | `src/pages/` |
| Llamadas al backend (API) | `src/services/` |
| URL del backend / variables de entorno | `.env` |
| Componente principal / rutas | `src/App.jsx` |
| Estilos | Clases de Tailwind + `src/index.css` |
