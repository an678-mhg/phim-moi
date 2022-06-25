import React, { useEffect, useState } from "react";
import reactionImg from "../../utils/reactionImg";

const ShowReaction = ({ reactions }) => {
  const [totalTypeReaction, setTotalTypeReaction] = useState([]);

  return (
    <div className="show-reaction">
      <div className="show-reaction-list">
        {reactions.map((item) => (
          <img key={item.userId} src={reactionImg[item.type]} alt={item.type} />
        ))}
      </div>
      <div>
        <p style={{ paddingLeft: "3px" }}>{reactions?.length}</p>
      </div>
    </div>
  );
};

export default ShowReaction;
