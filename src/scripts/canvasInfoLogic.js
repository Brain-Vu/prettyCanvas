import * as canvasAPI from "./canvasAPI.js";
import * as testing from "../../test/oldCoursesFilter.js";

/*
 * Driver function to access assignments, courses, categories, tabs, and potential error
 *
 * @returns {array} Array of content needed to render the screen
 *    - assignments - An array of objects that each represent an assignment
 *    - courses - An array of course name strings
 *    - categories - Object that maps category names to assignments
 *    - tabs - Object that maps tab names to category names
 *    - errored - Boolean that flags if there was trouble in loading the content from Canvas
 */
export async function loadContent() {
  async function getCourses() {
    let courses;
    try {
      courses = await canvasAPI.getCoursesAsync();
    } catch (error) {
      console.log(`Error: ${error.message}`);
      return false;
    }
    return courses;
  }

  async function getAssignments(courses) {
    let assignments;
    try {
      assignments = await canvasAPI.getAllAssignmentsAsync(courses);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      return false;
    }
    return assignments;
  }

  const courseObj = await getCourses();
  if (!courseObj) return [null, null, null, null, true];

  // remove 'testing' as needed
  const filteredCourses = testing.filterCourses(courseObj, "before end");

  const assignments = await getAssignments(filteredCourses);
  if (!assignments) return [null, null, null, null, true];

  const courses = filteredCourses.map((c) => c["name"]);
  const categories = mapCategoryContents(assignments, courses);
  const tabs = mapTabCategories(courses);

  return [assignments, courses, categories, tabs, false];
}

// ----------- Tab and category mappers  ----------- //

/*
 * Maps tab names to appropriate categories
 *
 * @param {array} courses - Array of course names to be categorized under the "Completed" tab
 * @returns {object} Objects with keys of tab names and values of arrays of categories
 */
export function mapTabCategories(courses) {
  return {
    Upcoming: ["Due today", "This week", "In a while"],
    Late: ["Late"],
    Completed: courses,
    Undated: ["Undated"],
  };
}

/*
 * Maps category names to appropriate assignments
 *
 * @param {array} assignments - Array of assignments to be classified under categories
 * @returns {object} Object with keys as category names and values of arrays of assignments
 */
export function mapCategoryContents(assignments, courses) {
  let categories = {};

  // current implementation only allows for unique category names across all tabs

  const completed = filterAssignments(assignments, "completed");

  for (const course of courses) {
    categories[course] = (() => {
      const courseFiltered = filterAssignments(completed, "course", course);
      return sortAssignments(courseFiltered, "latest");
    })();
  }

  const incomplete = filterAssignments(assignments, "incomplete");

  categories["Due today"] = (() => {
    const dueToday = filterAssignments(incomplete, "due today");
    return sortAssignments(dueToday, "earliest");
  })();
  categories["This week"] = (() => {
    const thisWeek = filterAssignments(incomplete, "in a week");
    return sortAssignments(thisWeek, "earliest");
  })();
  categories["In a while"] = (() => {
    const later = filterAssignments(incomplete, "after a week");
    return sortAssignments(later, "earliest");
  })();
  categories["Late"] = (() => {
    const late = filterAssignments(incomplete, "late");
    return sortAssignments(late, "latest");
  })();
  categories["Undated"] = (() => {
    const undated = filterAssignments(incomplete, "undated");
    return groupAssignments(undated, "course name");
  })();

  return categories;
}

// ----------- Courses array modifiers ----------- //

/*
 * Filters an array of courses based on a string specifier
 *
 * @param {array} courses - Array of courses
 * @param {string} by - String to specify how courses should be filtered
 *    - "before end" - Courses whose end dates are after today
 * @returns {array} Filtered courses
 */
export function filterCourses(courses, by) {
  let filterFunc;
  if (by == "before end") {
    const today = new Date();
    filterFunc = (course) => {
      if (course["term"] == null || course["term"]["end_at"] == null)
        return false;
      const courseEnd = new Date(course["term"]["end_at"]);
      return courseEnd > today;
    };
  }
  return courses.filter(filterFunc);
}

// ----------- Assignment array modifiers ----------- //

/*
 * Sorts an array of assignments based on a string specifier
 *
 * @param {array} assignments - Array of assignments
 * @param {string} by - String to specify how assignments should be sorted
 *    - "earliest" - Earliest due dates first
 *    - "latest" - Latest due dates first
 * @returns {array} Sorted assignments
 */
export function sortAssignments(assignments, by) {
  console.log(assignments)
  let sortFunc;
  if (by == "earliest")
    sortFunc = (a, b) => {
      if (!a["due_at"] && !b["due_at"]) return 0;
      else if (!a["due_at"]) return 1;
      else if (!b["due_at"]) return -1;
      return a["due_at"].localeCompare(b["due_at"]);
    };
  else if (by == "latest")
    sortFunc = (a, b) => {
      if (!a["due_at"] && !b["due_at"]) return 0;
      else if (!a["due_at"]) return 1;
      else if (!b["due_at"]) return -1;
      return b["due_at"].localeCompare(a["due_at"]);
    };
  return assignments.sort(sortFunc);
}

/*
 * Filters an array of assignments based on a string specifier
 *
 * @param {array} assignments - Array of assignments
 * @param {string} by - String to specify how assignments should be filtered
 *    - "completed" - has a submission or has a grade
 *    - "incomplete" - anything not complete
 *    - "dated"
 *    - "undated"
 *    - "due today"
 *    - "in a week"
 *    - "after a week"
 *    - "late"
 *    - "course"
 * @returns {array} Filtered assignments
 */
export function filterAssignments(assignments, by, courseName = "") {
  const completed = (a) =>
    a["has_submitted_submissions"] ||
    (Object.hasOwn(a, "submission") &&
      a["submission"]["workflow_state"] == "graded");

  const dated = (a) => a["due_at"];

  const today = new Date();
  const todayStr = today.toISOString();
  const calcDueDiff = (a) => {
    const due = new Date(a["due_at"]);
    return (due - today) / 1000 / 60 / 24;
  };

  let filterFunc;
  if (by == "completed") filterFunc = completed;
  else if (by == "incomplete") filterFunc = (a) => !completed(a);
  else if (by == "dated") filterFunc = (a) => dated(a);
  else if (by == "undated") filterFunc = (a) => !dated(a);
  else if (by == "due today")
    filterFunc = (a) => dated(a) && calcDueDiff(a) <= 1 && calcDueDiff >= 0;
  else if (by == "in a week")
    filterFunc = (a) => dated(a) && calcDueDiff(a) <= 7 && calcDueDiff(a) > 1;
  else if (by == "after a week")
    filterFunc = (a) => dated(a) && calcDueDiff(a) > 7;
  else if (by == "late") filterFunc = (a) => dated(a) && calcDueDiff(a) < 0;
  else if (by == "course") filterFunc = (a) => a["course_name"] == courseName;
  return assignments.filter(filterFunc);
}

/*
 * Groups an array of assignments based on a string specifier
 *
 * @param {array} assignments - Array of assignments
 * @param {string} by - String to specify how assignments should be grouped
 *    - "course name" - Assignments that are under the same course
 * @returns {array} Grouped assignments
 */
export function groupAssignments(assignments, by) {
  let groupFunc;
  if (by == "course name") groupFunc = (a) => a["course_name"];
  return Object.values(Object.groupBy(assignments, groupFunc)).flat();
}
