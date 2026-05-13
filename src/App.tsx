// App.tsx
// ¿Para qué sirve? Es el componente raíz. Maneja el estado global de la app:
//   - qué posts hay
//   - qué vista estamos mostrando (feed o perfil)
//   - qué post está abierto en el modal
// Es el "cerebro" que conecta todos los demás componentes.

import { useState, useEffect } from "react";
import type { Post, Comment } from "./types/post";
import { fetchCatImages } from "./services/api";
import { currentUser } from "./data/user";
import Header from "./components/Header/Header";
import Feed from "./components/Feed/Feed";
import PostModal from "./components/PostModal/PostModal";
import Profile from "./components/Profile/Profile";
import "./App.css";

// Datos estáticos: usernames, descripciones y comentarios simulados
// Los usamos para darle vida a cada post aunque vengan de una API de imágenes
const USERNAMES = [
  "michi_gato", "catto_bravo", "felix_paws", "luna_felina",
  "garfield_jr", "whiskers99", "nala_cat", "simba_gato",
  "mittens_ok", "fluffy_arg", "tigre_gomez", "snow_paws",
];

const DESCRIPTIONS = [
  "Lunes otra vez... 😴",
  "Mi lugar favorito del mundo 🌿",
  "No me molesten, estoy descansando 🐾",
  "El sol de la tarde es mío 🌤️",
  "¿Alguien dijo comida? 🍗",
  "Explorando el jardín 🌸",
  "Filosofía gatuna 🧠",
  "Monday mood activated 😒",
  "Life is purrfect 🐱",
  "Siesta obligatoria 💤",
  "El mundo desde acá arriba 🏔️",
  "Mirá quién llegó a casa 🎉",
];

const COMMENTS_POOL: Comment[] = [
  { username: "michi_lover", text: "¡Qué lindo! 😍" },
  { username: "gato_fan", text: "Me encanta esta foto 🐾" },
  { username: "cat_world", text: "Adorable!! ❤️" },
  { username: "felino_arg", text: "Jajaja re tierno 😂" },
  { username: "paws_lover", text: "Que hermoso gatito 🥰" },
  { username: "mr_whiskers", text: "Necesito uno igual 😭" },
];

// Función auxiliar: selecciona un elemento al azar de un array
// "T" es un "tipo genérico" — funciona con arrays de cualquier tipo
// Esto es TypeScript avanzado pero simple de entender:
// "dame un array de cualquier cosa (T[]) y devolveme uno de esa misma cosa (T)"
const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Función que transforma imágenes de la API en objetos Post completos
// Parámetro: images → array de CatImage
// Retorno: array de Post
const buildPosts = (images: { id: string; url: string }[]): Post[] => {
  return images.map((img, index) => ({
    id: img.id,
    imageUrl: img.url,
    username: USERNAMES[index % USERNAMES.length], // % evita salirse del array
    likes: Math.floor(Math.random() * 800) + 50,   // número random entre 50 y 850
    liked: false,
    description: DESCRIPTIONS[index % DESCRIPTIONS.length],
    date: `Hace ${Math.floor(Math.random() * 23) + 1} horas`,
    // Elegimos 2 comentarios al azar del pool
    comments: [getRandom(COMMENTS_POOL), getRandom(COMMENTS_POOL)],
  }));
};

const App = () => {
  // ── ESTADOS ──────────────────────────────────────────────────────────────
  // useState<Post[]> le dice a TypeScript que este estado es un array de Post
  const [posts, setPosts] = useState<Post[]>([]);

  // "feed" | "profile" es un "union type": solo puede ser uno de esos dos strings
  const [currentView, setCurrentView] = useState<"feed" | "profile">("feed");

  // Post | null: puede ser un Post o puede ser null (ninguno seleccionado)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ── useEffect: llamar a la API al montar el componente ───────────────────
  // useEffect con [] vacío = "ejecutate UNA sola vez cuando el componente aparece"
  // Es el lugar correcto para llamar APIs porque:
  //   1. El componente ya está en el DOM
  //   2. No se ejecuta en cada render, solo cuando cambia lo del array
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const images = await fetchCatImages(12); // Pedimos 12 fotos
        const builtPosts = buildPosts(images);
        setPosts(builtPosts);
      } catch (err) {
        setError("No se pudieron cargar las fotos. Intentá de nuevo.");
      } finally {
        // "finally" se ejecuta siempre, haya error o no
        setLoading(false);
      }
    };

    loadPosts();
  }, []); // [] = solo se ejecuta al montar (una vez)

  // ── FUNCIÓN: dar o quitar like ───────────────────────────────────────────
  // Recibe el id del post — "id: string" es el tipado TypeScript
  const handleLike = (id: string): void => {
    // "void" significa que esta función no devuelve nada

    // Actualizamos el array de posts: mapeamos cada post
    // y solo modificamos el que tiene el id que recibimos
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,               // copiamos todas las propiedades del post
              liked: !post.liked,   // invertimos el like
              // Si ya tenía like, restamos 1. Si no, sumamos 1
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post // los demás posts no cambian
      )
    );

    // Si el modal está abierto y es el mismo post, actualizamos también ahí
    if (selectedPost?.id === id) {
      setSelectedPost((prev) =>
        prev
          ? {
              ...prev,
              liked: !prev.liked,
              likes: prev.liked ? prev.likes - 1 : prev.likes + 1,
            }
          : null
      );
    }
  };

  // ── FUNCIÓN: abrir modal de un post ─────────────────────────────────────
  const handleOpenPost = (post: Post): void => {
    setSelectedPost(post);
  };

  // ── FUNCIÓN: cerrar modal ────────────────────────────────────────────────
  const handleCloseModal = (): void => {
    setSelectedPost(null);
  };

  // ── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div className="app">
      {/* Header siempre visible — le pasamos la función de navegación */}
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        userAvatar={currentUser.avatar}
      />

      <main className="app-main">
        {/* Mostramos loading, error, o el contenido según el estado */}
        {loading && (
          <div className="app-loading">
            <div className="loading-spinner"></div>
            <p>Cargando fotos de gatos... 🐱</p>
          </div>
        )}

        {error && !loading && (
          <div className="app-error">
            <p>⚠️ {error}</p>
            <button onClick={() => window.location.reload()}>
              Reintentar
            </button>
          </div>
        )}

        {/* Vista Feed */}
        {!loading && !error && currentView === "feed" && (
          <Feed
            posts={posts}
            onLike={handleLike}
            onOpenPost={handleOpenPost}
          />
        )}

        {/* Vista Perfil */}
        {!loading && !error && currentView === "profile" && (
          <Profile
            user={{ ...currentUser, posts }}
            onLike={handleLike}
            onOpenPost={handleOpenPost}
          />
        )}
      </main>

      {/* Modal — solo aparece si hay un post seleccionado */}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={handleCloseModal}
          onLike={handleLike}
        />
      )}
    </div>
  );
};

export default App;