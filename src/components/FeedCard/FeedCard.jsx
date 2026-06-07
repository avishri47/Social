import "./FeedCard.css";

function FeedCard({ title, description, image }) {
  return (
    <div className="feed-card">
      <img src={image} alt={title} className="feed-image" />

      <div className="feed-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default FeedCard;