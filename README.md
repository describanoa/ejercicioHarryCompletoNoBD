**Deno Deploy:** `short-badger-49.deno.dev`

**Examen Práctico – Harry Potter Favorites App (versión actualizada)**

Crea una aplicación web con Deno Fresh que implemente las siguientes funcionalidades:

---

## 1. Autenticación y Middleware

1. **Página principal (`/`)**

   * Muestra un formulario para **registro** y otro para **login** (email + contraseña).
   * Al hacer login, se valida que la contraseña sea `1234`.
   * Se genera/almacena una **cookie de sesión** con el nombre de usuario (`username`) que luego será leída por el middleware.

2. **Middleware (`_middleware.ts`)**

   * Detecta la cookie de sesión (`username`) en cada petición.
   * Si no existe o es inválida, redirige a `/` (login).
   * Si es válida, inyecta en el contexto (`ctx.state`) el `username` y permite continuar.

---

## 2. Layout Global

* Crea un archivo `_layout.tsx` que incluya un **header** y un **footer** comunes en todas las páginas (logo “HP Favorites”, enlaces a “Personajes”, “Favoritos” y “Mi Perfil”).
* Dentro de `body`, renderiza la parte específica de cada ruta.

---

## 3. Listado de Personajes y Favoritos

1. **Ruta `/characters`**

   * Se accede **solo si** el middleware ha validado la sesión.
   * Hace una petición **server-side** a `https://hp-api.onrender.com/api/characters`.
   * Muestra una **rejilla de tarjetas** (flexbox) con:
     * Foto (imagen), nombre y casa de cada personaje.
     * Un botón “⭐ Favorito”/“❌ Quitar” en cada tarjeta.
   * Al hacer clic en “Favorito” o “Quitar”, se realiza un `POST` a un endpoint interno:
     * **`/api/nuevofavorito`**: Añade el personaje a la cookie `favorites`.
     * **`/api/quitarfavorito`**: Elimina el personaje de la cookie `favorites`.

2. **Ruta `/favorites`**

   * También protegida por middleware.
   * Recupera los IDs de los personajes favoritos desde la cookie `favorites`.
   * Por cada favorito, muestra la misma tarjeta del personaje (nombre, foto, casa), con botón para “Quitar favorito” (igual que en `/characters`).

---

## 4. Ruta Dinámica Adicional

Crea una ruta dinámica de prueba:

* **`/house/[houseName]`**

  * Donde `[houseName]` puede ser `gryffindor`, `slytherin`, `ravenclaw` o `hufflepuff`.
  * Al cargar la página, el servidor realiza un **fetch** a `https://hp-api.onrender.com/api/characters/house/:houseName`.
  * Recupera los IDs de favoritos desde la cookie `favorites` y marca los personajes correspondientes.
  * Muestra solo los personajes de esa casa en un layout similar al de `/characters`.
  * Incluye el botón de “Favorito” que funciona igual (usa los mismos endpoints internos).

---

## 5. Buscador de Personajes

* **Componente `Buscador`**

   * Añade un formulario con un campo de texto para buscar personajes por nombre.
   * El formulario envía una solicitud `GET` a la ruta `/search` con el parámetro `name`.
   * La ruta `/search` realiza una búsqueda en la API de personajes (`https://hp-api.onrender.com/api/characters`) y filtra los resultados por el nombre proporcionado.
   * Muestra los resultados en un formato similar al de `/characters`, con la opción de añadir o quitar favoritos.

---

## 6. Perfil de Usuario (Opcional)

Como extra, puedes crear una ruta:

* **`/profile`**

  * Muestra información básica del usuario (nombre de usuario obtenido de la cookie `username`).
  * Permite “cerrar sesión” (borrar cookie) y redirigir a `/`.

---

## Requisitos Técnicos / Puntos a Evaluar

1. **Autenticación y sesiones** (login + cookie + middleware) – 3 ptos
2. **Listado SSR de personajes con botones de favorito** – 2 ptos
3. **Listado de favoritos propio** – 2 ptos
4. **Ruta dinámica `/house/[houseName]`** – 1 pto
5. **Buscador de personajes** – 2 ptos
6. **Layout global (header + footer)** – 1 pto
7. **Manejo de favoritos con cookies** – 3 ptos
8. **Buenas prácticas de Fresh y código limpio** – 1 pto

> **Total:** 15 ptos (se califica sobre 10).