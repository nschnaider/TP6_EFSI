import type { Post } from "../../types/Post";
import "./PostModal.css";

interface PostModalProps {
  post: Post;
  onClose: () => void;
  onLike: (id: string) => void;
}

const PostModal = ({ post, onClose, onLike }: PostModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

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


        <div className="modal-info-col">

          <div className="modal-header">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.username}`}
              alt={post.username}
              className="modal-avatar"
            />
            <div className="modal-user-info">
              <span className="modal-username">{post.username}</span>
              <span className="modal-date">{post.date}</span>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>


          <div className="modal-description">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.username}`}
              alt={post.username}
              className="modal-comment-avatar"
            />
            <div>
              <span className="modal-comment-username">{post.username}</span>
              <span className="modal-comment-text"> {post.description}</span>
            </div>
          </div>


          <div className="modal-comments">
            {post.comments.map((comment, index) => (
              <div key={index} className="modal-comment">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.username}`}
                  alt={comment.username}
                  className="modal-comment-avatar"
                />
                <div>
                  <span className="modal-comment-username">{comment.username}</span>
                  <span className="modal-comment-text"> {comment.text}</span>
                </div>
              </div>
            ))}
          </div>


          <div className="modal-actions">
            <div className="modal-action-btns">
              <button
                className={`modal-icon-btn ${post.liked ? "liked" : ""}`}
                onClick={() => onLike(post.id)}
                aria-label="Me gusta"
              >
                <svg width="24" height="24" viewBox="0 0 24 24"
                  fill={post.liked ? "#e1306c" : "none"}
                  stroke={post.liked ? "#e1306c" : "currentColor"}
                  strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
              <button className="modal-icon-btn" aria-label="Comentar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </button>
              <button className="modal-icon-btn" aria-label="Compartir">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none" />
                </svg>
              </button>
            </div>
          </div>

   
          <div className="modal-meta">
            <strong>{post.likes.toLocaleString()} Me gusta</strong>
            <p className="modal-meta-date">{post.date}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostModal;