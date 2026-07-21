import * as canvasAPI from "./canvasAPI.js";

/*
 * Driver function to access assignments from Canvas
 *
 * @returns {array} Array of JSONs representing all assignments
 */
export async function getAllAssignments() {
  // test function to make sure that classes from Spring quarter are populated
  function filterCourses(courses, by) {
    let filterFunc;
    if (by == "before end") {
      const today = new Date();
      filterFunc = (course) => {
        if (course["term"] == null || course["term"]["end_at"] == null)
          return false;
        const courseEnd = new Date(course["term"]["end_at"]);
        // hard coding term to Spring for testing purposes
        return (
          courseEnd > today ||
          course["term"]["name"] == "26SQ Spring Quarter 2026"
        );
      };
    }
    return courses.filter(filterFunc);
  }

  const allCourses = await getCourses();
  if (!allCourses)  return false;
  const filteredCourses = filterCourses(allCourses, "before end");
  const allAssignments = await getCourseAssignments(filteredCourses);
  return allAssignments;
}

// ----------- API callers ----------- //

/*
 * Retrieves all user courses
 *
 * @returns {array} Array of all user courses
 */
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

/*
 * Retrieves assignments from a course and logs errors
 *
 * @param {array} courses - Array of courses
 * @returns {array} Array of the assignments of the inputted courses
 */
async function getCourseAssignments(courses) {
  let assignments;
  try {
    assignments = await canvasAPI.getAllAssignmentsAsync(courses);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
  return assignments;
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
  let sortFunc;
  if (by == "earliest")
    sortFunc = (a, b) => a["due_at"].localeCompare(b["due_at"]);
  else if (by == "latest")
    sortFunc = (a, b) => b["due_at"].localeCompare(a["due_at"]);
  return assignments.sort(sortFunc);
}

/*
 * Filters an array of assignments based on a string specifier
 *
 * @param {array} assignments - Array of assignments
 * @param {string} by - String to specify how assignments should be filtered
 *    - "submitted"
 *    - "unsubmitted"
 *    - "dated"
 *    - "undated"
 *    - "due today"
 *    - "in a week"
 *    - "after a week"
 *    - "late"
 * @returns {array} Filtered assignments
 */
export function filterAssignments(assignments, by) {
  // function that checks if a due date exist for this assignments
  const dated = (a) => a["due_at"];

  // function to calculate how many days remain till due date
  const today = new Date();
  const todayStr = today.toISOString();

  const calcDueDiff = (a) => {
    const due = new Date(a["due_at"]);
    return (due - today) / 1000 / 60 / 24;
  };

  let filterFunc;

  if (by == "submitted") filterFunc = (a) => a["has_submitted_submissions"];
  else if (by == "unsubmitted")
    filterFunc = (a) => !a["has_submitted_submissions"];
  else if (by == "dated") filterFunc = (a) => dated(a);
  else if (by == "undated") filterFunc = (a) => !dated(a);
  else if (by == "due today")
    filterFunc = (a) => dated(a) && calcDueDiff(a) <= 1 && calcDueDiff >= 0;
  else if (by == "in a week")
    filterFunc = (a) => dated(a) && calcDueDiff(a) <= 7 && calcDueDiff(a) > 1;
  else if (by == "after a week")
    filterFunc = (a) => dated(a) && calcDueDiff(a) > 7;
  else if (by == "late") filterFunc = (a) => dated(a) && calcDueDiff(a) < 0;

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
