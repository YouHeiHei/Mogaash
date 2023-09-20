import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./FloatingDictionary.css";

const FloatingDictionary = () => {
  const [value, setValue] = useState("");
  const [wordToSearch, setWordToSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [wordDef, setWordDef] = useState({ word: "", def: [] });
  const [defRender, setDefRender] = useState(<div />);

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWordToSearch(value);
  };

  useEffect(() => {
    const fetchWordDef = async () => {
      if (wordToSearch !== "") {
        const tempDef = await fetch(
          `http://127.0.0.1:5000/word?name=${wordToSearch}`
        );
        const defJson = await tempDef.json();
        setWordDef(defJson);
        setHasSearched(true);
      } else {
        setHasSearched(false);
      }
    };
    fetchWordDef();
  }, [wordToSearch]);

  useEffect(() => {
    if (hasSearched) {
      setDefRender(
        <div className="vocabContainer">
          <div className="title">{wordDef.word}</div>
          {wordDef.sense_list.map((sense, index) => (
            <div>
              <div className="wordType">{sense.fl}</div>

              {sense.def_list.map((defs, index) => (
                <div className="fd_defsBox">
                  {defs.map((def, index) => (
                    <div className="fd_defBox">
                      <span className="fd_defIndex">{index + 1}.</span>
                      <div>
                        {def.map((d, index) => (
                          <div className="fd_defUsageBox">
                            <div className="wordDefText">{d.text}</div>
                            <div className="wordUsageText">{d.usage}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    } else {
      setDefRender(<div />);
    }
  }, [hasSearched, wordDef.def, wordDef.word]);

  return (
    <div className="dictContainer">
      <Form className="searchForm">
        <Form.Group className="searchBar">
          <Form.Control
            placeholder="Enter word"
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
          />
          <Button
            variant="primary"
            type="button"
            onClick={handleSubmit}
            style={{ marginLeft: "10px" }}
          >
            Search
          </Button>
        </Form.Group>
      </Form>

      {defRender}
    </div>
  );
};

export default FloatingDictionary;
