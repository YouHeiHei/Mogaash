import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";

import "./VocabPage.css";

const VocabPage = (props) => {
  const listName = props.listName;
  const listNum = props.listNum;
  const [word, setWord] = useState("");

  /*
    TODO: 
      $word$ in $useEffect$ fetch function need to be added to the update variable box
      However it would contribute to a possible infinate loop
      Consider using other methods
  */
  // const prevWord = useRef("")

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
        `http://127.0.0.1:5000/randWord?list=${listNum}&prev=${word}`
      );
      const dataJson = await data.json();
      setWord(dataJson.word);
      setDef(dataJson.sense_list);
    };

    fetchWord();
  }, [index, listNum]);

  return (
    <div className="VocabPageBox">
      <div className="ListName">{listName}</div>
      <div className="VocabCapsule">
        <div className="Vocab">{word}</div>
        <div className="VocabDef">
          {def.map((d, index) => (
            <div id={index}>
              <div className="defRow">
                <span className="defIndex">{index + 1}.</span>
                <span className="wordType">{d.fl}</span>
              </div>

              <span className="wordDefText">{d.def_list[0][0][0].text}</span>
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
