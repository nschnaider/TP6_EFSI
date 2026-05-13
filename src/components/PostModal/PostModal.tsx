// PostModal.tsx
// ¿Para qué sirve? Muestra el detalle completo de una publicación.
// Aparece como una ventana encima del contenido (modal).
// Se cierra haciendo clic en la X o fuera del contenido.

import type { Post } from "../../types/post";
import "./PostModal.css";

// Props del modal
interface PostModalProps {
  post: Post;                      // el post a mostrar
  onClose: () => void;             // función para cerrar
  onLike: (id: string) => void;    // función para dar like
}

const PostModal = ({ post, onClose, onLike }: PostModalProps) => {
  return (
    // Overlay: el fondo oscuro. Clic en él cierra el modal.
    <div className="modal-overlay" onClick={onClose}>

      {/* Contenedor del modal — stopPropagation evita que el clic en el
          contenido cierre el modal (sin esto, cualquier clic dentro cerraría) */}
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Columna izquierda: imagen ── */}
        <div className="modal-image-col">
          <img
            src={post.imageUrl}
            alt={`Foto de ${post.username}`}
            className="modal-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/600x600?text=🐱";
            }}
          />
        </div>

        {/* ── Columna derecha: info + comentarios ── */}
        <div className="modal-info-col">

          {/* Header */}
          <div className="modal-header">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.username}`}
              alt={post.username}
              className="modal-avatar"
            />
            <span className="modal-username">{post.username}</span>
            {/* Botón cerrar */}
            <button className="modal-close-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          {/* Descripción */}
          <div className="modal-description">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.username}`}
              alt={post.username}
              className="modal-comment-avatar"
            />
            <div>
              <span className="modal-comment-username">{post.username}</span>
              <span className="modal-comment-text"> {post.description}</span>
              <p className="modal-comment-date">{post.date}</p>
            </div>
          </div>

          {/* Comentarios */}
          <div className="modal-comments">
            {post.comments.map((comment, index) => (
              // Usamos index como key porque los comentarios no tienen id propio
              // En una app real nunca uses index como key si los datos pueden cambiar
              <div key={index} className="modal-comment">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.username}`}
                  alt={comment.username}
                  className="modal-comment-avatar"
                />
                <div>
                  <span className="modal-comment-username">
                    {comment.username}
                  </span>
                  <span className="modal-comment-text"> {comment.text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Acciones */}
          <div className="modal-actions">
            <button
              className={`modal-like-btn ${post.liked ? "liked" : ""}`}
              onClick={() => onLike(post.id)}
            >
              {post.liked ? "❤️" : "🤍"}
            </button>
            <button className="modal-like-btn">💬</button>
            <button className="modal-like-btn">📤</button>
          </div>

          {/* Likes y fecha */}
          <div className="modal-meta">
            <strong className="modal-likes">
              {post.likes.toLocaleString()} Me gusta
            </strong>
            <p className="modal-date">{post.date}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostModal;