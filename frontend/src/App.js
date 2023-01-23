import "./App.css";
import "./bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FloatingDictionary from "./Components/FloatingDictionary";
import NavigationBar from "./Components/NavigationBar";

import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";
import VocabPage from "./Pages/VocabPage";

function App() {
  return (
    <Router>
      <NavigationBar />

      <div className="splitView">
        <div className="mainPanel">
          <Routes>
            <Route exact path="/*" element={<HomePage />} />
            <Route exact path="/user" element={<UserPage />} />
            {/* <Route exact path="/list" element={<VocabPage />} /> */}
            <Route
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
            />
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
