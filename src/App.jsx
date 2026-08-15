import { useState, useEffect } from "react";

import TabList from "./components/TabList.jsx";
import Header from "./components/Header.jsx";

import { loadContent } from "./scripts/canvasInfoLogic.js";
import { saveContent, loadCachedContent } from "./scripts/cache.js";

import "./css/App.css";

/*
 * assignments - An array of objects that each represent an assignment
 * courses - An array of course name strings
 * categories - Object that maps category names to assignments
 * tabs - Object that maps tab names to category names
 * errored - Boolean that flags if there was trouble in loading the content from Canvas
 */

function App() {
  const [assignments, setAssignments] = useState(null);
  const [courses, setCourses] = useState(null);
  const [categories, setCategories] = useState(null);
  const [tabs, setTabs] = useState(null);
  const [errored, setErrored] = useState(false);

  function setStates(assignments, courses, categories, tabs, errored) {
    setAssignments(assignments);
    setCourses(courses);
    setCategories(categories);
    setTabs(tabs);
    setErrored(errored);
  }

  useEffect(() => {
    async function initial_load() {
      const content = await loadCachedContent();
      const cacheDelaySec = 120;
      const cacheDelayMilli = cacheDelaySec * 1000;

      let _assignments, _courses, _categories, _tabs, _errored;

      if (content && Date.now() - content[5] < cacheDelayMilli) {
        [_assignments, _courses, _categories, _tabs, _errored] = content;
      } else
        [_assignments, _courses, _categories, _tabs, _errored] =
          await loadContent();

      setStates(_assignments, _courses, _categories, _tabs, _errored);
      saveContent(_assignments, _courses, _categories, _tabs, _errored);
    }
    initial_load();
  }, []);

  async function refreshHandler() {
    setAssignments(null);
    setErrored(null);
    const [_assignments, _courses, _categories, _tabs, _errored] =
      await loadContent();
    setStates(_assignments, _courses, _categories, _tabs, _errored);
    saveContent(_assignments, _courses, _categories, _tabs, _errored);
  }

  return (
    <>
      <Header refreshHandler={refreshHandler}></Header>
      {}
      <TabList
        assignments={assignments}
        courses={courses}
        categories={categories}
        tabs={tabs}
        errored={errored}
      ></TabList>
    </>
  );
}

export default App;
