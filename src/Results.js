import React from "react";
import Meaning from "./Meaning";
import Phonetic from "./Phonetic";

export default function Results(props) {
  if (props.result) {
    return (
      <div className="Results">
        <section>
          <h2>{props.result.word}</h2>
          {props.result.phonetics.map(function (phonetic, index) {
            return (
              <div key={index}>
                <Phonetic phonetic={phonetic} />
              </div>
            );
          })}
        </section>
        {props.result.meanings.map(function (meaning, index) {
          return (
            <section key={index}>
              <Meaning meaning={meaning} />
            </section>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}
