import { useState, useEffect } from "react";

import CategoryList from "./components/CategoryList.jsx";
import TabList from "./components/TabList.jsx";
import Header from "./components/Header.jsx";

import { getAllAssignments } from "./scripts/assignmentCourseLogic.js";
import {
  mapCategoryContents,
  mapTabCategories,
} from "./scripts/uiTextLogic.js";

import "./css/App.css";

function App() {
  const [assignments, setAssignments] = useState(null);
  const [errored, setErrored] = useState(false);
  const [categories, setCategories] = useState(null);
  const [tabs, setTabs] = useState(null);

  useEffect(() => {
    async function loadContent() {
      let allAssignments = await getAllAssignments();

      if (!allAssignments) setErrored(true);
      else {
        const catAssignMap = mapCategoryContents(allAssignments);
        const tabCatMap = mapTabCategories();
        setAssignments(allAssignments);
        setCategories(catAssignMap);
        setTabs(tabCatMap);
      }
    }
    loadContent();
  }, []);

  return (
    <>
      <Header></Header> 
      {/* need to do the loading stuff inside tab list + center everything */}
      {}<TabList
        assignments={assignments}
        catAssignMap={categories}
        tabCatMap={tabs}
        error={errored}
      ></TabList>
    </>
  );
}

export default App;
