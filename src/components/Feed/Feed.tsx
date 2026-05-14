import type{ Post } from "../../types/Post";
import PostCard from "../Post/Post";
import "./Feed.css";

interface FeedProps {
  posts: Post[];                        
  onLike: (id: string) => void;          
  onOpenPost: (post: Post) => void;   
}

const Feed = ({ posts, onLike, onOpenPost }: FeedProps) => {
  return (
    <div className="feed">
      {posts.length === 0 ? (
        <p className="feed-empty">No hay publicaciones todavía.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}          
            post={post}        
            onLike={onLike}   
            onOpenPost={onOpenPost}
          />
        ))
      )}
    </div>
  );
};

export default Feed;