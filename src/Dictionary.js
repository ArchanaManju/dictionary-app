import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./Dictionary.css";

export default function Dictionary(props) {
  let [keyWord, setKeyWord] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setLoaded] = useState(false);

  function handelResponse(response) {
    setResults(response.data[0]);
  }
  function search(event) {
    //event.preventDefault();
    //api Documentation https://dictionaryapi.dev/
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyWord}`;
    axios.get(apiUrl).then(handelResponse);
  }
  function handleSubmit(event) {
    event.preventDefault();
    search();
  }
  function handleKeywordChange(event) {
    setKeyWord(event.target.value);
  }
  function load() {
    setLoaded(true);
    search();
  }
  console.log(loaded);
  if (loaded) {
    return (
      <div className="Dictionary">
        <section>
          <h1>What are you looking for ?</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              autoFocus={true}
              onChange={handleKeywordChange}
              defaultValue={props.defaultKeyword}
            />
            <button>Search</button>
          </form>
          <div className="hint">Suggested word: sunset, wine, yoga...</div>
        </section>
        <Results result={results} />
      </div>
    );
  } else {
    load();
    return "loading";
  }
}
