import React, { useMemo, useState } from "react";
import "./Comment.css";
import "boxicons";
import { postComment } from "../../actions/fireStoreActions";
import { useStore } from "../../stored";
import Input from "./Input";
import CommentItem from "./CommentItem";
import useFireStore from "../../hook/useFireStore";

const Comment = ({ movieId }) => {
  const user = useStore((state) => state.user);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!user) return;
    if (comment.trim() === "") return;
    setLoading(true);
    postComment({
      responseTo: null,
      movieId: movieId,
      userId: user.uid,
      userName: user.displayName,
      avatar: user.photoURL,
      content: comment,
      reactions: [],
      created_at: Date.now(),
    });
    setComment("");
    setLoading(false);
  };

  const conditional = useMemo(
    () => ({
      fieldName: "movieId",
      operator: "==",
      compareValue: movieId,
    }),
    [movieId]
  );

  const { document } = useFireStore("comments", conditional);

  return (
    <div className="comment">
      <h1 className="comment-title">Comments {document.length}</h1>
      <form onSubmit={handlePostComment}>
        <Input
          user={user}
          comment={comment}
          setComment={setComment}
          loading={loading}
        />

        <div className="show-comment">
          {document.map((item) => {
            if (item.responseTo === null) {
              return (
                <CommentItem
                  movieId={movieId}
                  item={item}
                  key={item.id}
                  listComment={document}
                />
              );
            }

            return null;
          })}
        </div>
      </form>
    </div>
  );
};

export default Comment;
