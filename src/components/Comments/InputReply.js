import React, { useState } from "react";
import { postComment } from "../../actions/fireStoreActions";

const InputReply = ({ user, commentParentId, movieId, setShowReply }) => {
  const [comment, setComment] = useState("");

  const handleReplyComment = () => {
    if (!user) return;
    if (comment.trim() === "") return;

    const newReply = {
      responseTo: commentParentId,
      movieId: movieId,
      userId: user.uid,
      userName: user.displayName,
      avatar: user.photoURL,
      content: comment,
      reactions: [],
      created_at: Date.now(),
    };

    postComment(newReply);
    setShowReply(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        className="avatar"
        alt="avatar"
        src={user ? user?.photoURL : "/user-non-avatar.png"}
      />

      <div className="comment-control" style={{ marginTop: "20px" }}>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type={"text"}
          placeholder={"Write public comments..."}
        />
        <button onClick={handleReplyComment} className="send-icon">
          Reply
        </button>
      </div>
    </div>
  );
};

export default InputReply;
