import { useState, useEffect } from "react";

import CategoryList from "./components/CategoryList.jsx";
import TabList from "./components/TabList.jsx";
import Header from "./components/Header.jsx";

import { getCoursesAssignments } from "./scripts/assignmentCourseLogic.js";
import {
  mapCategoryContents,
  mapTabCategories,
} from "./scripts/uiTextLogic.js";

import "./css/App.css";

function App() {
  const [assignments, setAssignments] = useState(null);
  const [courses, setCourses] = useState(null);
  const [errored, setErrored] = useState(false);
  const [categories, setCategories] = useState(null);
  const [tabs, setTabs] = useState(null);

  useEffect(() => {
    async function loadContent() {
      let [allCourses, allAssignments] = await getCoursesAssignments();
      console.log(allAssignments);
      if (!allAssignments) setErrored(true);
      else {
        const catAssignMap = mapCategoryContents(allAssignments, allCourses);
        const tabCatMap = mapTabCategories(allCourses);
        setAssignments(allAssignments);
        setCourses(allCourses);
        setCategories(catAssignMap);
        setTabs(tabCatMap);
      }
    }
    loadContent();
  }, []);

  return (
    <>
      <Header></Header>
      {}
      <TabList
        assignments={assignments}
        courses={courses}
        catAssignMap={categories}
        tabCatMap={tabs}
        error={errored}
      ></TabList>
    </>
  );
}

export default App;
