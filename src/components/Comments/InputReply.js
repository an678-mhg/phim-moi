import React, { useState } from "react";
import { postComment } from "../../actions/fireStoreActions";
import nonAvatar from "../../utils/user-non-avatar.png";

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
    <div>
      <div
        className="comment-control"
        style={{ marginLeft: "40px", marginTop: "20px" }}
      >
        <img
          className="avatar"
          alt="avatar"
          src={user ? user?.photoURL : nonAvatar}
        />
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
