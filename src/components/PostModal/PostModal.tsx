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

      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >

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
            <span className="modal-username">{post.username}</span>
            <button className="modal-close-btn" onClick={onClose}>
              ✕
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
              <p className="modal-comment-date">{post.date}</p>
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
                  <span className="modal-comment-username">
                    {comment.username}
                  </span>
                  <span className="modal-comment-text"> {comment.text}</span>
                </div>
              </div>
            ))}
          </div>

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