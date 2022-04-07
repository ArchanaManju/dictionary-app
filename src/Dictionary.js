import React, { useState } from "react";
import "./Dictionary.css";

export default function Dictionary() {
  let [keyWord, setKeyWord] = useState("");
  function search(event) {
    event.preventDefault();
    alert(`searching ${keyWord}`);
  }
  function handleKeywordChange(event) {
    setKeyWord(event.target.value);
  }
  return (
    <div className="Dictionary">
      <form onSubmit={search}>
        <input type="search" autoFocus={true} onChange={handleKeywordChange} />
        <button>Search</button>
      </form>
    </div>
  );
}
