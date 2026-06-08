import { useState } from "react";
import "./PostCreator.css";

function PostCreator({ onAddPost }) {
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [open, setOpen] = useState(false);

  function handleMediaChange(e) {
    const file = e.target.files[0];
    if (file) setMedia(file);
  }

  function handleSubmit() {
    if (!text && !media) return;

    let mediaUrl = null;
    let mediaType = "text";

    if (media) {
      mediaUrl = URL.createObjectURL(media);
      mediaType = media.type.startsWith("video") ? "video" : "image";
    }

    const newPost = {
      id: Date.now(),
      text,
      media: mediaUrl,
      type: mediaType,
      time: new Date().toLocaleString(),
    };

    onAddPost(newPost);

    setText("");
    setMedia(null);
    setOpen(false);
  }

  return (
    <>
      {/* Clickable input preview */}
      
      <div className="post-trigger" onClick={() => setOpen(true)}>
        What's on your mind?
      </div>

      {/* Modal */}
      {open && (
        <div className="modal-overlay">
          <div className="post-box">
            <div className="modal-header">
              <h3>Create Post</h3>
              <button
                className="close-btn"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <textarea
              placeholder="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <input
              id="mediaInput"
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaChange}
              style={{ display: "none" }}
            />

            <div className="media-upload">
  <label htmlFor="mediaInput" className="media-icon">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 16V5"
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8.5 8.5L12 5L15.5 8.5"
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 16V19C4 19.552 4.448 20 5 20H19C19.552 20 20 19.552 20 19V16"
        stroke="#111827"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </label>

  {media && (
    <span className="file-name">
      {media.name}
    </span>
  )}
</div>

            <button onClick={handleSubmit}>Post</button>
          </div>
        </div>
      )}
    </>
  );
}

export default PostCreator;