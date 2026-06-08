import "./PostCard.css";

function PostCard({ post }) {
  return (
    <div className="post-card">
      <p className="time">{post.time}</p>

      {post.text && <p className="text">{post.text}</p>}

      {post.media && post.type === "image" && (
        <img src={post.media} alt="post" />
      )}

      {post.media && post.type === "video" && (
        <video controls src={post.media} />
      )}
    </div>
  );
}

export default PostCard;