import "./App.css";
import "./bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FloatingDictionary from "./Components/FloatingDictionary";
import NavigationBar from "./Components/NavigationBar";

import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";
import VocabPage from "./Pages/VocabPage";

function App() {
  const [listNames, setListNames] = useState([]);
  useEffect(() => {
    const fetchListNames = async () => {
      const data = await fetch(`http://127.0.0.1:5000/list_names`);
      const dataJson = await data.json();
      setListNames(dataJson);
    };
    fetchListNames();
  }, []);
  return (
    <Router>
      <NavigationBar />

      <div className="splitView">
        <div className="mainPanel">
          <Routes>
            <Route exact path="/*" element={<HomePage />} />
            <Route exact path="/user" element={<UserPage />} />
            {/* <Route exact path="/list" element={<VocabPage />} /> */}
            {/* <Route
              exact
              path="/list/Test_List_1"
              element={<VocabPage listName="Test_List_1" />}
            />
            <Route
              exact
              path="/list/Test_List_2"
              element={<VocabPage listName="Test_List_2" />}
            />
            <Route
              exact
              path="/list/Test_List_3"
              element={<VocabPage listName="Test_List_3" />}
            /> */}

            {listNames.map((pair) => (
              <Route
                exact
                path={`/list/${pair.list_name}`}
                id={pair.list_num}
                element={
                  <VocabPage
                    listName={pair.list_name}
                    listNum={pair.list_num}
                    id={pair.list_num}
                  />
                }
              />
            ))}
          </Routes>
        </div>

        <div className="dictPanel">
          <FloatingDictionary />
        </div>
      </div>
    </Router>
  );
}

export default App;
