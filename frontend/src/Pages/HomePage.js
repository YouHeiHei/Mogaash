import React, { useState, useEffect } from "react";
import "./HomePage.css";
import VocabList from "../Components/VocabList";

const Homepage = () => {
  const [allVocabListSummary, setAllVocabListSummary] = useState([]);

  useEffect(() => {
    const getVocabListSummary = async (listName) => {
      const allSummary = await fetch(
        `http://127.0.0.1:5000/vocab_list_summary`
      );
      const vocabListSummary = await allSummary.json();
      setAllVocabListSummary(vocabListSummary);
    };
    getVocabListSummary();
  }, []);

  return (
    <div className="center">
      {allVocabListSummary.map((summary) => (
        <VocabList
          listName={summary.list_name}
          listNum={summary.list_num}
          success={summary.success}
          warning={summary.warning}
          danger={summary.danger}
          total={summary.success + summary.warning + summary.danger}
          id={summary.list_num}
        ></VocabList>
      ))}

      {/* <Routes>
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
      </Routes> */}
    </div>
  );
};

export default Homepage;
