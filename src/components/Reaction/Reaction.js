import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../config/firebase";
import { useStore } from "../../stored";
import reactionGif from "../../utils/reactionGif";

const Reaction = ({ comment, setShowReaction, showReaction }) => {
  const { user } = useStore((state) => state);

  const handleReact = (type) => {
    const docRef = doc(db, `comments/${comment.id}`);
    if (comment?.reactions?.some((item) => item.userId === user.uid)) {
      const newReaction = comment.reactions.filter(
        (item) => item.userId !== user.uid
      );

      const reactUserType = comment?.reactions.find(
        (item) => item.userId === user.uid
      ).type;

      if (type === reactUserType) {
        updateDoc(docRef, {
          reactions: newReaction,
        });

        return setShowReaction(false);
      }

      updateDoc(docRef, {
        reactions: [...newReaction, { userId: user.uid, type: type }],
      });
    } else {
      updateDoc(docRef, {
        reactions: [...comment?.reactions, { userId: user.uid, type: type }],
      });
    }

    setShowReaction(false);
  };

  return (
    <div
      className="reation"
      style={{
        background: "#222",
        borderRadius: "20px",
        padding: "4px",
        alignItems: "center",
        display: showReaction ? "flex" : "none",
      }}
    >
      {reactionGif.map((item) => (
        <div
          key={item.name}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            onClick={() => handleReact(item.name)}
            style={{
              width: "25px",
              height: "25px",
              objectFit: "cover",
              margin: "0 4px",
              cursor: "pointer",
            }}
            src={item.image}
            alt={item.name}
          />
          {comment?.reactions.some((item) => item.userId === user?.uid) &&
            comment?.reactions.find((item) => item.userId === user?.uid)
              .type === item.name && <span className="dotted-blue" />}
        </div>
      ))}
    </div>
  );
};

export default Reaction;
