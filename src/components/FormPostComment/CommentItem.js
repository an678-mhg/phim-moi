import React, { useEffect, useState } from "react";
import { useStore } from "../../stored/store";
import { calculateCreatedTime } from "../../utils/constans";
import Reaction from "../Reaction/Reaction";
import ShowReaction from "../Reaction/ShowReaction";

const CommentItem = ({ item }) => {
  const [showReaction, setShowReaction] = useState(false);
  const [reaction, setReaction] = useState();
  const { user } = useStore((state) => state);

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
  }, [item.reactions]);

  return (
    <div className="show-comment-items" key={item.id}>
      <div className="show-comment-avatar">
        <img alt="avatar" src={item.avatar} />
      </div>
      <div>
        <div className="show-comment-info">
          <div className="show-comment-name-time">
            <h3>{item.userName}</h3>
          </div>
          <p>{item.content}</p>

          {showReaction && (
            <Reaction comment={item} setShowReaction={setShowReaction} />
          )}
          {item?.reactions?.length > 0 && (
            <ShowReaction reactions={item.reactions} />
          )}
        </div>
        {user && (
          <div className="comment-action">
            <p
              onClick={() => setShowReaction(!showReaction)}
              style={{
                color:
                  reaction?.type === "like"
                    ? "#243FD3"
                    : reaction?.type === "love"
                    ? "#F33E58"
                    : "#EAB125",
              }}
            >
              {reaction?.type || (
                <span style={{ color: "#fff" }}>Reaction</span>
              )}
            </p>
            {/* <p>Feedback</p> */}
            <p>{calculateCreatedTime(item.created_at)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
