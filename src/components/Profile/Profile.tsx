import type { User } from "../../data/user";
import type { Post } from "../../types/Post";
import "./Profile.css";

interface ProfileProps {
  user: User;                     
  onLike: (id: string) => void;     
  onOpenPost: (post: Post) => void;  
}

const Profile = ({ user, onLike, onOpenPost }: ProfileProps) => {
  return (
    <div className="profile">

      <div className="profile-info">

        <div className="profile-avatar-wrapper">
          <img
            src={user.avatar}
            alt={user.username}
            className="profile-avatar"
          />
        </div>

        <div className="profile-details">
          <div className="profile-top-row">
            <h2 className="profile-username">{user.username}</h2>
            <button className="profile-edit-btn">Editar perfil</button>
          </div>

          <div className="profile-stats">
            <div className="profile-stat">
              <strong>{user.posts.length}</strong>
              <span>publicaciones</span>
            </div>
            <div className="profile-stat">
              <strong>{user.followers.toLocaleString()}</strong>
              <span>seguidores</span>
            </div>
            <div className="profile-stat">
              <strong>{user.following.toLocaleString()}</strong>
              <span>seguidos</span>
            </div>
          </div>

          <div className="profile-bio">
            <strong className="profile-fullname">{user.fullName}</strong>
            <p className="profile-bio-text">{user.bio}</p>
          </div>
        </div>

      </div>

      <div className="profile-tabs">
        <div className="profile-tab active">⊞ PUBLICACIONES</div>
      </div>

      <div className="profile-grid">
        {user.posts.map((post) => (
          <div
            key={post.id}
            className="profile-grid-item"
            onClick={() => onOpenPost(post)}
          >
            <img
              src={post.imageUrl}
              alt={`Post de ${post.username}`}
              className="profile-grid-image"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/300x300?text=🐱";
              }}
            />
            <div className="profile-grid-overlay">
              <span>❤️ {post.likes.toLocaleString()}</span>
              <span>💬 {post.comments.length}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Profile;