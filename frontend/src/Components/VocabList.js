import React from "react";
import "./VocabList.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const VocabList = (props) => {
  return (
    <Nav.Link as={Link} to={"/list/" + props.listName}>
      <div className="listBox">
        <div className="listName">{props.listName}</div>
        <ProgressBar className="progressBar">
          <ProgressBar striped variant="success" now={props.success} key={1} />
          <ProgressBar striped variant="warning" now={props.warning} key={2} />
          <ProgressBar striped variant="danger" now={props.danger} key={3} />
        </ProgressBar>
      </div>
    </Nav.Link>
  );
};

export default VocabList;
