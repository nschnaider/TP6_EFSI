import { useState, useEffect } from "react";
import type { Post, Comment } from "./types/Post";
import { fetchCatImages } from "./services/api";
import { currentUser } from "./data/user";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Feed from "./components/Feed/Feed";
import PostModal from "./components/PostModal/PostModal";
import Profile from "./components/Profile/Profile";
import "./App.css";

const USERNAMES = [
  "michi_gato", "catto_bravo", "felix_paws", "luna_felina",
  "garfield_jr", "whiskers99", "nala_cat", "simba_gato",
  "mittens_ok", "fluffy_arg", "tigre_gomez", "snow_paws",
];

const DESCRIPTIONS = [
  "Lunes otra vez...",
  "Mi lugar favorito del mundo",
  "No me molesten, estoy descansando",
  "El sol de la tarde es mío",
  "¿Alguien dijo comida?",
  "Explorando el jardín",
  "Filosofía gatuna",
  "Monday mood activated",
  "Life is purrfect",
  "Siesta obligatoria",
  "El mundo desde acá arriba",
  "Mirá quién llegó a casa",
];

const COMMENTS: Comment[] = [
  { username: "michi_lover", text: "¡Qué lindo!" },
  { username: "gato_fan", text: "Me encanta esta foto" },
  { username: "cat_world", text: "Adorable!!" },
  { username: "felino_arg", text: "Jajaja re tierno" },
  { username: "paws_lover", text: "Que hermoso gatito" },
  { username: "mr_whiskers", text: "Necesito uno igual" },
];

const getRandom = <A,>(array: A[]): A => array[Math.floor(Math.random() * array.length)];

const buildPosts = (images: { id: string; url: string }[]): Post[] =>
  images.map((img, index) => ({
    id: img.id,
    imageUrl: img.url,
    username: USERNAMES[index % USERNAMES.length],
    likes: Math.floor(Math.random() * 800) + 50,
    liked: false,
    description: DESCRIPTIONS[index % DESCRIPTIONS.length],
    date: `Hace ${Math.floor(Math.random() * 23) + 1} horas`,
    comments: [getRandom(COMMENTS), getRandom(COMMENTS)],
  }));

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentView, setCurrentView] = useState<"feed" | "profile">("feed");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const images = await fetchCatImages(12);
        setPosts(buildPosts(images));
      } catch {
        setError("No se pudieron cargar las fotos. Intentá de nuevo.");
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const ClickLike = (id: string): void => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
    if (selectedPost?.id === id) {
      setSelectedPost((prev) =>
        prev
          ? { ...prev, liked: !prev.liked, likes: prev.liked ? prev.likes - 1 : prev.likes + 1 }
          : null
      );
    }
  };

  const handleOpenPost = (post: Post): void => setSelectedPost(post);
  const handleCloseModal = (): void => setSelectedPost(null);

  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar currentView={currentView} onNavigate={setCurrentView} user={currentUser} />
        <main className="app-main">
          {loading && (
            <div className="app-loading">
              <div className="loading-spinner" />
              <p>Cargando fotos de gatos...</p>
            </div>
          )}
          {error && !loading && (
            <div className="app-error">
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>Reintentar</button>
            </div>
          )}
          {!loading && !error && currentView === "feed" && (
            <Feed posts={posts} onLike={ClickLike} onOpenPost={handleOpenPost} />
          )}
          {!loading && !error && currentView === "profile" && (
            <Profile
              user={{ ...currentUser, posts }}
              onLike={ClickLike}
              onOpenPost={handleOpenPost}
            />
          )}
        </main>
      </div>
      {selectedPost && (
        <PostModal post={selectedPost} onClose={handleCloseModal} onLike={ClickLike} />
      )}
    </div>
  );
};

export default App;