// Feed.tsx
// ¿Para qué sirve? Muestra la lista de publicaciones.
// Es un componente "contenedor": su única responsabilidad es
// renderizar la lista y pasar los datos a cada Post.

import type{ Post } from "../../types/post";
import PostCard from "../Post/Post";
import "./Feed.css";

// Tipamos las props que recibe Feed
interface FeedProps {
  posts: Post[];                         // array de publicaciones
  onLike: (id: string) => void;          // función para dar like
  onOpenPost: (post: Post) => void;      // función para abrir el modal
}

const Feed = ({ posts, onLike, onOpenPost }: FeedProps) => {
  return (
    <div className="feed">
      {/* Si no hay posts todavía, mostramos un mensaje */}
      {posts.length === 0 ? (
        <p className="feed-empty">No hay publicaciones todavía.</p>
      ) : (
        // Mapeamos el array de posts y renderizamos uno por cada elemento
        posts.map((post) => (
          <PostCard
            key={post.id}          // key: React lo necesita para optimizar renders
            post={post}            // le pasamos el objeto post completo
            onLike={onLike}        // le pasamos la función de like
            onOpenPost={onOpenPost} // le pasamos la función de abrir
          />
        ))
      )}
    </div>
  );
};

export default Feed;