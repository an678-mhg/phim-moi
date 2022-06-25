import React, { useEffect, useMemo, useState } from "react";
import "./Comment.css";
import "boxicons";
import {
  fecthCommentFromApi,
  postComment,
} from "../../actions/fireStoreActions";
import { useStore } from "../../stored/store";
import Input from "./Input";
import CommentItem from "./CommentItem";
import useFireStore from "../../hook/useFireStore";

const Comment = ({ movieId }) => {
  const user = useStore((state) => state.user);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePostComment = async (e) => {
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
      <h1 className="comment-title">Comments</h1>
      <form onSubmit={handlePostComment}>
        <Input
          user={user}
          comment={comment}
          setComment={setComment}
          loading={loading}
        />

        <div className="show-comment">
          {document?.map((item) => (
            <CommentItem item={item} key={item.id} />
          ))}
        </div>
      </form>
    </div>
  );
};

export default Comment;
