import React, { useEffect, useState } from "react";
import reactionImg from "../../utils/reactionImg";

const ShowReaction = ({ reactions }) => {
  const [totalTypeReaction, setTotalTypeReaction] = useState([]);

  useEffect(() => {
    const arrTmp = [];
    reactions.map((item) => {
      if (!arrTmp.includes(item.type)) {
        arrTmp.push(item.type);
      }
      return null;
    });

    setTotalTypeReaction(arrTmp);
  }, [reactions]);

  return (
    <div className="show-reaction">
      <div className="show-reaction-list">
        {totalTypeReaction.map((item) => (
          <img key={item.userId} src={reactionImg[item]} alt={item} />
        ))}
      </div>
      <div>
        <p style={{ paddingLeft: "3px" }}>{reactions?.length}</p>
      </div>
    </div>
  );
};

export default ShowReaction;
