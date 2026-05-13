// Post.tsx
// ¿Para qué sirve? Renderiza UNA publicación en el feed.
// Es el componente más reutilizado de la app.
// Cada Post tiene: header (usuario), imagen, botones de acción, likes y descripción.

import type { Post } from "../../types/post";
import "./Post.css";

// Props del componente
interface PostProps {
  post: Post;                       // los datos del post
  onLike: (id: string) => void;     // función para dar like
  onOpenPost: (post: Post) => void; // función para abrir el modal
}

const PostCard = ({ post, onLike, onOpenPost }: PostProps) => {
  return (
    <article className="post">

      {/* ── Header del post: avatar + username + fecha ── */}
      <div className="post-header">
        {/* Avatar del usuario — generamos uno único con su username */}
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.username}`}
          alt={post.username}
          className="post-avatar"
        />
        <div className="post-user-info">
          <span className="post-username">{post.username}</span>
          <span className="post-date">{post.date}</span>
        </div>
        {/* Botón de tres puntos (decorativo) */}
        <button className="post-more-btn">•••</button>
      </div>

      {/* ── Imagen del post — doble clic da like ── */}
      <div className="post-image-container" onDoubleClick={() => onLike(post.id)}>
        <img
          src={post.imageUrl}
          alt={`Foto de ${post.username}`}
          className="post-image"
          // Si la imagen falla, mostramos un placeholder
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/470x470?text=🐱";
          }}
        />
      </div>

      {/* ── Botones de acción ── */}
      <div className="post-actions">
        {/* Botón like */}
        <button
          className={`post-action-btn like-btn ${post.liked ? "liked" : ""}`}
          onClick={() => onLike(post.id)}
          aria-label="Me gusta"
        >
          {/* Corazón relleno si ya le diste like, vacío si no */}
          {post.liked ? "❤️" : "🤍"}
        </button>

        {/* Botón comentar / abrir modal */}
        <button
          className="post-action-btn"
          onClick={() => onOpenPost(post)}
          aria-label="Ver comentarios"
        >
          💬
        </button>

        {/* Botón compartir (decorativo) */}
        <button className="post-action-btn" aria-label="Compartir">
          📤
        </button>
      </div>

      {/* ── Likes ── */}
      <div className="post-likes">
        <strong>{post.likes.toLocaleString()} Me gusta</strong>
        {/* toLocaleString() agrega separadores de miles: 1,204 */}
      </div>

      {/* ── Descripción ── */}
      <div className="post-description">
        <span className="post-desc-username">{post.username}</span>
        <span className="post-desc-text"> {post.description}</span>
      </div>

      {/* ── Link para ver comentarios ── */}
      <button
        className="post-view-comments"
        onClick={() => onOpenPost(post)}
      >
        Ver los {post.comments.length} comentarios
      </button>

    </article>
  );
};

export default PostCard;