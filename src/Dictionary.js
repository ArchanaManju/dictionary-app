import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./Dictionary.css";
import Photos from "./Photos.js";

export default function Dictionary(props) {
  let [keyWord, setKeyWord] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [photos, setPhotos] = useState(null);

  function handelDictionaryResponse(response) {
    setResults(response.data[0]);
  }

  function handelPexelsResponse(response) {
    console.log("here", response);
    setPhotos(response.data.photos);
  }
  function search(event) {
    //event.preventDefault();
    //api Documentation https://dictionaryapi.dev/
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyWord}`;
    axios.get(apiUrl).then(handelDictionaryResponse);

    let pexelApiKey =
      "563492ad6f917000010000011703476f7c8140e587e68be9972f8e6d";
    let pexelApiUrl = `https://api.pexels.com/v1/search?query=${keyWord}&per_page=6`;
    let header = { Authorization: `Bearer ${pexelApiKey}` };
    axios
      .get(pexelApiUrl, { headers: header, mode: "cors" })
      .then(handelPexelsResponse);
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

  if (loaded) {
    return (
      <div className="Dictionary">
        <section>
          <h1>What word you are looking for ?</h1>
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
        <Photos photos={photos} />
      </div>
    );
  } else {
    load();
    return "loading";
  }
}
