import React from "react";
import "./HomePage.css";
import VocabList from "../Components/VocabList";

const Homepage = () => {
  return (
    <div className="center">
      <VocabList
        listName="Test_List_1"
        listNum={0}
        success={90}
        warning={10}
        danger={0}
      ></VocabList>
      <VocabList
        listName="Test_List_2"
        listNum={1}
        success={40}
        warning={10}
        danger={40}
      ></VocabList>
      <VocabList
        listName="Test_List_3"
        listNum={2}
        success={50}
        warning={30}
        danger={2}
      ></VocabList>
      <VocabList
        listName="Test_List_3"
        listNum={2}
        success={50}
        warning={30}
        danger={2}
      ></VocabList>
      <VocabList
        listName="Test_List_3"
        listNum={2}
        success={50}
        warning={30}
        danger={2}
      ></VocabList>
      <VocabList
        listName="Test_List_3"
        listNum={2}
        success={50}
        warning={30}
        danger={2}
      ></VocabList>
      <VocabList
        listName="Test_List_3"
        listNum={2}
        success={50}
        warning={30}
        danger={2}
      ></VocabList>
      <VocabList
        listName="Test_List_3"
        listNum={2}
        success={50}
        warning={30}
        danger={2}
      ></VocabList>
      <VocabList
        listName="Test_List_3"
        listNum={2}
        success={50}
        warning={30}
        danger={2}
      ></VocabList>
      <VocabList
        listName="Test_List_3"
        listNum={2}
        success={50}
        warning={30}
        danger={2}
      ></VocabList>
      <VocabList
        listName="Test_List_3"
        listNum={2}
        success={50}
        warning={30}
        danger={2}
      ></VocabList>
      <VocabList
        listName="Test_List_3"
        listNum={2}
        success={50}
        warning={30}
        danger={2}
      ></VocabList>
      <VocabList
        listName="Test_List_3"
        listNum={2}
        success={50}
        warning={30}
        danger={2}
      ></VocabList>
      <VocabList
        listName="Test_List_3"
        listNum={2}
        success={50}
        warning={30}
        danger={2}
      ></VocabList>
      <VocabList
        listName="Test_List_3"
        listNum={2}
        success={50}
        warning={30}
        danger={2}
      ></VocabList>
      <VocabList
        listName="Test_List_3"
        listNum={2}
        success={50}
        warning={30}
        danger={2}
      ></VocabList>

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
