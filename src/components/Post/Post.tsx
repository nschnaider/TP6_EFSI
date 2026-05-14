import type { Post } from "../../types/Post";
import "./Post.css";

interface PostProps {
  post: Post;                     
  onLike: (id: string) => void;   
  onOpenPost: (post: Post) => void; 
}

const PostCard = ({ post, onLike, onOpenPost }: PostProps) => {
  return (
    <article className="post">

      <div className="post-header">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.username}`}
          alt={post.username}
          className="post-avatar"
        />
        <div className="post-user-info">
          <span className="post-username">{post.username}</span>
          <span className="post-date">{post.date}</span>
        </div>
        <button className="post-more-btn">•••</button>
      </div>

      <div className="post-image-container" onDoubleClick={() => onLike(post.id)}>
        <img
          src={post.imageUrl}
          alt={`Foto de ${post.username}`}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/470x470?text=🐱";
          }}
        />
      </div>

      <div className="post-actions">
        <button
          className={`post-action-btn like-btn ${post.liked ? "liked" : ""}`}
          onClick={() => onLike(post.id)}
          aria-label="Me gusta"
        >
          {post.liked ? "❤️" : "🤍"}
        </button>

        <button
          className="post-action-btn"
          onClick={() => onOpenPost(post)}
          aria-label="Ver comentarios"
        >
          💬
        </button>

        <button className="post-action-btn" aria-label="Compartir">
          📤
        </button>
      </div>

      <div className="post-likes">
        <strong>{post.likes.toLocaleString()} Me gusta</strong>
      </div>

      <div className="post-description">
        <span className="post-desc-username">{post.username}</span>
        <span className="post-desc-text"> {post.description}</span>
      </div>

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