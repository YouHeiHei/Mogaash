import React from "react";

const VocabPage = (props) => {
  // fetch("../Data/test_vocab.json")
  //   .then((res) => res.json())
  //   .then((json) => console.log(json));
  return <div>{props.listName}</div>;
};

export default VocabPage;
