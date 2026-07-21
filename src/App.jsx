import { useState, useEffect } from "react";

import CategoryList from "./components/CategoryList.jsx";

import { getAllAssignments } from "./scripts/assignmentCourseLogic.js";
import { mapCategoryContents } from "./scripts/uiTextLogic.js";

import "./css/App.css";

function App() {
  const [assignments, setAssignments] = useState(null);
  const [categories, setCategories] = useState(null);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    async function loadContent() {
      let allAssignments = await getAllAssignments();
        console.log(allAssignments)
      

      if (!allAssignments) setErrored(true);
      else {
        console.log("printed true")
        setAssignments(allAssignments);
        const categoryMap = mapCategoryContents(allAssignments);
        setCategories(categoryMap);
      }
    }
    loadContent();
  }, []);

  return (
    <>
      <CategoryList assignments={assignments} categories={categories} error={errored} />
    </>
  );
}

export default App;
