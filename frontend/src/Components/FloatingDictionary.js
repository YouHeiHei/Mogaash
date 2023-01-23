import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./FloatingDictionary.css";

const FloatingDictionary = () => {
  const [value, setValue] = useState("");
  const [wordDef, setWordDef] = useState([]);
  const test_vocab = "censure";

  const handleSearch = ({ target: { value } }) => {
    setValue(value);
  };

  const handleEnter = () => {
    console.log("entered");
  };

  fetch("http://127.0.0.1:5000/word?name=" + test_vocab)
    .then((response) => response.json())
    .then((data) => setWordDef(data));

  return (
    <div className="dictContainer">
      <Form>
        <Form.Group className="searchForm" controlId="wordSearch">
          <Form.Control
            placeholder="Enter word"
            value={value}
            onChange={handleSearch}
            onKeyDown={handleEnter}
          />
        </Form.Group>
      </Form>

      <div className="vocabContainer">
        <div className="title">{test_vocab}</div>

        {wordDef.map((def, index) => (
          <div className="wordDef">
            <div className="defRow">
              <div className="defIndex">{index + 1}.</div>
              <div className="wordType">{def.type}</div>
            </div>

            <div className="wordDefText">{def.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingDictionary;
