import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import "./VocabPage.css";

const VocabPage = (props) => {
  const listName = props.listName;
  const [word, setWord] = useState("");
  const [def, setDef] = useState([]);

  const [index, setIndex] = useState(0);

  const handleYes = () => {
    setIndex(index + 1);
  };
  const handleNo = () => {
    setIndex(index + 1);
  };

  useEffect(() => {
    const fetchWord = async () => {
      const data = await fetch(
        `http://127.0.0.1:5000/randWord?list=${listName}`
      );
      const dataJson = await data.json();
      setWord(dataJson.word);
      setDef(dataJson.def);
    };

    fetchWord();
  }, [index, listName]);

  return (
    <div className="VocabPageBox">
      <div className="ListName">{props.listName}</div>
      <div className="VocabCapsule">
        <div className="Vocab">{word}</div>
        <div className="VocabDef">
          {def.map((d, index) => (
            <div id={index}>
              <div className="defRow">
                <span className="defIndex">{index + 1}.</span>
                <span className="wordType">{d.type}</span>
              </div>

              <span className="wordDefText">{d.text}</span>
            </div>
          ))}
        </div>
        <div className="ButtonWrapper">
          <Button className="YesButton" onClick={handleYes}>
            Yes
          </Button>
          <Button className="NoButton" onClick={handleNo}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VocabPage;
