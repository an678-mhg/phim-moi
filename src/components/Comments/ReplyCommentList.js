import React from "react";
import CommentItem from "./CommentItem";

const ReplyCommentList = ({ listComment, commentParentId, movieId }) => {
  return (
    <div style={{ marginTop: "20px", marginLeft: "40px" }}>
      {listComment.map((p) => {
        if (p.responseTo === commentParentId) {
          return (
            <CommentItem
              key={p.id}
              item={p}
              movieId={movieId}
              listComment={listComment}
            />
          );
        }

        return null;
      })}
    </div>
  );
};

export default ReplyCommentList;
