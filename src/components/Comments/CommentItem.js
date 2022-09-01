import React, { useEffect, useState } from "react";
import { useStore } from "../../stored";
import { calculateCreatedTime } from "../../utils/constans";
import Reaction from "../Reaction/Reaction";
import ShowReaction from "../Reaction/ShowReaction";
import InputReply from "./InputReply";
import ReplyCommentList from "./ReplyCommentList";

const CommentItem = ({ item, movieId, listComment }) => {
  const [showReaction, setShowReaction] = useState(false);
  const [reaction, setReaction] = useState();
  const [countReply, setCountReply] = useState(0);
  const [showReply, setShowReply] = useState(false);
  const [showReplyItem, setShowReplyItem] = useState(false);
  const { user } = useStore((state) => state);

  useEffect(() => {
    let count = 0;
    listComment.forEach((p) => {
      if (p.responseTo === item.id) {
        count++;
      }
    });
    setCountReply(count);
  }, [listComment, item.id]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const reactionApi = item?.reactions.find(
      (item) => item.userId === user?.uid
    );
    if (!reactionApi) return setReaction(null);
    if (reactionApi) {
      setReaction(reactionApi);
    }
  }, [item.reactions, user]);

  return (
    <div style={{ marginBottom: "30px" }}>
      <div className="show-comment-items">
        <div className="show-comment-avatar">
          <img alt="avatar" src={item.avatar} />
        </div>
        <div>
          <div className="show-comment-info">
            <div className="show-comment-name-time">
              <h3>{item.userName}</h3>
              <p>{calculateCreatedTime(item.created_at)}</p>
            </div>
            <p>
              {item.responseTo !== null && (
                <span style={{ color: "#2980b9", marginRight: "5px" }}>
                  {listComment.find((p) => p.id === item.responseTo).userName}
                </span>
              )}
              {item.content}
            </p>

            <Reaction
              comment={item}
              showReaction={showReaction}
              setShowReaction={setShowReaction}
            />
            {item?.reactions?.length > 0 && (
              <ShowReaction reactions={item.reactions} />
            )}
          </div>
          {user && (
            <div className="comment-action">
              <p
                onClick={() => setShowReaction(!showReaction)}
                className="like-button"
                style={{
                  color:
                    reaction?.type === "like"
                      ? "#243FD3"
                      : reaction?.type === "love"
                      ? "#F33E58"
                      : "#EAB125",
                }}
              >
                {showReaction ? (
                  <span style={{ color: "#fff" }}>Cancel</span>
                ) : (
                  reaction?.type || <span style={{ color: "#fff" }}>Like</span>
                )}
              </p>
              <p onClick={() => setShowReply(!showReply)}>
                {showReply ? "Cancel" : "Feedback"}
              </p>
            </div>
          )}
        </div>
      </div>

      {showReply && (
        <InputReply
          user={user}
          commentParentId={item.id}
          movieId={movieId}
          setShowReply={setShowReply}
        />
      )}

      {countReply > 0 && (
        <p
          style={{
            color: "#3EA6FF",
            marginLeft: "45px",
            fontSize: "14px",
            marginTop: "20px",
            fontWeight: "600",
            cursor: "pointer",
          }}
          onClick={() => setShowReplyItem(!showReplyItem)}
        >
          {showReplyItem ? "Turn off reply" : `View ${countReply} reply!`}
        </p>
      )}

      {showReplyItem && (
        <ReplyCommentList
          listComment={listComment}
          commentParentId={item.id}
          movieId={movieId}
        />
      )}
    </div>
  );
};

export default CommentItem;
