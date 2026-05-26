Separé todo en componentes, cada uno con su archivo `.tsx` y su `.css` propio.
La idea fue que cada componente se encargue de una sola cosa y no mezclar lógica con diseño.
src/
App.tsx: componente principal, maneja todo el estado
types/Post.ts: los tipos de TypeScript (Post, Comment)
data/user.ts: el usuario simulado
services/api.ts: la llamada a The Cat API con Axios
components/
Header: barra superior con logo y buscador
Sidebar: barra lateral con navegación y perfil
Stories: fila de avatares circulares
Feed:  de publicaciones
Post: tarjeta individual de cada publicación
PostModal: modal con el detalle de una publicación
Profile: página de perfil del usuario

--

 Qué componentes creé y por qué?

- Header -> tiene el logo, el buscador y los botones de arriba. Lo separé porque es algo que siempre está visible y no tiene nada que ver con los posts.

- Sidebar -> tiene el avatar del usuario, sus estadísticas y los botones para navegar entre el feed y el perfil. Lo separé porque agrupa toda la navegación en un solo lugar.

- Stories -> muestra los círculos de stories arriba del feed. Es puramente visual, no necesita recibir props ni manejar estado, por eso tiene su propio componente.

- Feed -> recorre el array de posts y renderiza una `PostCard` por cada uno. Existe para no tener ese loop directamente en `App.tsx` y mantener todo más ordenado.

- Post -> muestra la imagen, el usuario y los botones de like y comentar. Es el componente más reutilizable de todos porque se usa tanto en el feed como en el perfil.

- PostModal -> cuando clickeás un post se abre este modal con más detalle. Lo separé porque tiene mucha lógica visual propia y mezclarla dentro de `Post` hubiera sido un lío.

- Profile -> muestra la info del usuario y una grilla con todas sus fotos. Existe para tener una vista completamente separada del feed.

Decidí componentizar así porque cada parte de la pantalla tiene una responsabilidad distinta.
Si necesito cambiar cómo se ve una tarjeta de post, solo toco `Post.tsx` y no rompo nada más.

---

 Cómo se comunican los componentes (props)

`App` es el único componente que tiene estado. Todos los demás reciben datos y funciones por props:
App
posts, onLike, onOpenPost  ->  Feed  ->  Post
post, onClose, onLike      ->  PostModal
user, onLike, onOpenPost   -> Profile
currentView, onNavigate,
user                       -> Sidebar

Por ejemplo, cuando el usuario le da like a un post, `Post` llama a `onLike(id)` que es una función que viene de `App`. Ahí `App` actualiza el estado y React re-renderiza todo lo necesario automáticamente.

---

Hooks que usé

useState para guardar:

| Estado | Para qué sirve |
|--------|----------------|
| `posts` | el array de publicaciones cargadas de la API |
| `currentView` | si estoy viendo el feed o el perfil |
| `selectedPost` | qué post está seleccionado para abrir en el modal |
| `loading` | si la API todavía está cargando |
| `error` | si hubo algún error al pedir las imágenes |

useEffect para llamar a la API una sola vez cuando carga la página. Le paso `[]` como dependencia para que no se ejecute de nuevo cada vez que cambia algo.

---

Cómo consume la API

Uso Axios en `services/api.ts` para pedir 12 imágenes a The Cat API:
GET https://api.thecatapi.com/v1/images/search?limit=12

La función `fetchCatImages` devuelve un array con `id` y `url` de cada imagen.
Después en `App.tsx` combino esas imágenes con datos inventados (usernames, likes aleatorios, comentarios) para armar los posts completos, porque la API solo da fotos.

---

Cómo resolví la visualización individual de publicaciones

Usé un modal (`PostModal`). El flujo es este:

1. El usuario clickea una foto en el feed o en el perfil
2. Se llama `handleOpenPost(post)` que guarda ese post en el estado `selectedPost`
3. Si `selectedPost` no es null, se renderiza el `PostModal` por encima de todo
4. Cuando clickeás afuera o en la X, se llama `handleCloseModal()` que setea `selectedPost` a null y el modal desaparece

El modal muestra: imagen ampliada, usuario, fecha, descripción, comentarios, cantidad de likes y botones de interacción.

---

Cómo simulé el perfil de usuario

El usuario está hardcodeado en `data/user.ts`. No hay login ni registro, simplemente simulo que ya hay alguien logueado con todos sus datos fijos en el código:

```ts
export const currentUser: User = {
  username: "Nico_09",
  fullName: "Nicolas Schnaider",
  bio: "Aguante los gatos | Buenos Aires, Argentina",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nicolas",
  followers: 121_000,
  following: 348,
  totalLikes: 900_000,
  posts: [],
};
```

El campo `posts` arranca vacío y se completa en `App.tsx` con las fotos que vienen de la API, para que el perfil muestre las mismas publicaciones que el feed.

Qué datos elegí mostrar en el perfil

Decidí mostrar nombre de usuario, nombre completo, bio, foto de perfil, cantidad de seguidores, seguidos y publicaciones. También se ve una grilla con todas las fotos y un botón de "Editar perfil" que es solo visual. Son los datos más básicos que tiene cualquier perfil de Instagram y los que más sentido tenían para simular un usuario real.

---

Decisiones de diseño

- Usé colores oscuros para seguir el Figma lo más posible
- El feed usa CSS Grid con `nth-child` para simular el efecto masonry del Figma
- Los avatares los genero con DiceBear usando el username de cada post