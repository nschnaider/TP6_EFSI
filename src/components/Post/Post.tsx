import type { Post } from "../../types/Post";
import "./Post.css";

interface PostProps {
  post: Post;
  onLike: (id: string) => void;
  onOpenPost: (post: Post) => void;
}

const PostCard = ({ post, onLike, onOpenPost }: PostProps) => {
  return (
    <article
      className="post-card"
      onClick={() => onOpenPost(post)}
      onDoubleClick={() => onLike(post.id)}
    >
      <img
        src={post.imageUrl}
        alt={`Foto de ${post.username}`}
        className="post-card-img"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://via.placeholder.com/400x400?text=🐱";
        }}
      />

      <div className="post-card-overlay">
        <div className="post-card-user">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.username}`}
            alt={post.username}
            className="post-card-avatar"
          />
          <span className="post-card-username">@{post.username}</span>
        </div>
        <div className="post-card-actions">
          <button
            className={`post-card-btn ${post.liked ? "liked" : ""}`}
            onClick={(e) => { e.stopPropagation(); onLike(post.id); }}
            aria-label="Me gusta"
          >
            <svg width="18" height="18" viewBox="0 0 24 24"
              fill={post.liked ? "#e1306c" : "none"}
              stroke={post.liked ? "#e1306c" : "white"}
              strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button
            className="post-card-btn"
            onClick={(e) => { e.stopPropagation(); onOpenPost(post); }}
            aria-label="Comentarios"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          <button
            className="post-card-btn"
            onClick={(e) => e.stopPropagation()}
            aria-label="Compartir"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" fill="white" stroke="none" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;