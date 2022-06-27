import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../utils/Title";
import Tippy from "@tippyjs/react/headless";
import "./Search.css";

function Search() {
  const [keyWord, setKeyWord] = useState("");
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    setKeyWord(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (keyWord.trim() === "") return;

    navigate(`/results?q=${keyWord}`);
  };

  return (
    <form onSubmit={onSubmitForm} className="search">
      {/* Change document title */}
      <Title title={"Search"} />

      <Tippy render={(attrs) => <div {...attrs}>My tippy box</div>}>
        <div className="search-input">
          <input
            onChange={onChangeInput}
            value={keyWord}
            placeholder="Search...."
            className="search-text"
            type="text"
          />
          <input className="search-submit" type="submit" value="Search" />
        </div>
      </Tippy>
    </form>
  );
}

export default Search;
