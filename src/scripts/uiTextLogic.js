import {
  filterAssignments,
  sortAssignments,
  groupAssignments,
} from "./assignmentCourseLogic";

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

/*
 * Creates a time string based on a timestamp
 *
 * @param {string} timestamp - An ISO string
 * @returns {string} Time string in the form "{HOURS}:{MINUTES} {AM or PM}"
 */
function formatTimeStr(timestamp) {
  const date = new Date(timestamp);
  const rawMin = date.getMinutes();
  const rawHour = date.getHours();
  const AMorPM = rawHour >= 12 ? "AM" : "PM";
  const formatMin = rawMin < 10 ? `0${rawMin}` : rawMin;
  let hours12H = rawHour;
  if (hours12H > 12) hours12H -= 12;
  else if (hours12H == 0) hours12H = 12;
  return `${hours12H}:${formatMin} ${AMorPM}`;
}

/*
 * Creates a date string based on a timestamp
 *
 * @param {string} timestamp - An ISO string
 * @returns {string} Date string in the form "{MONTH} {DAY}, {YEAR}"
 */
function formatDateStr(timestamp) {
  const dayStrs = [
    // unused, for now...
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthStrs = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(timestamp);
  const rawYear = date.getFullYear();
  const rawMonth = date.getMonth();
  const rawDay = date.getDate();
  return `${monthStrs[rawMonth]} ${rawDay}, ${rawYear}`;
}

/*
 *  Formats ISO timestamp as a combination of formatted date and time string
 *
 *  @param {string} timestamp - An ISO string
 *  @returns {string} A formatted timestamp string
 */
export function formatTimestamp(timestamp) {
  return `${formatDateStr(timestamp)} at ${formatTimeStr(timestamp)}`;
}

/*
 * Formats ISO timestamp to display as a due date
 *
 * @param {string} timestamp - An ISO string
 * @returns {string} A formatted string to display as the due date
 */
export function formatDueDate(timestamp) {
  const due = new Date(timestamp);
  if (!timestamp) return "Undated";

  const dateStr = formatDateStr(timestamp);
  const timeStr = formatTimeStr(timestamp);

  const today = new Date();
  const diffInHours = (due - today) / 1000 / 60;

  if (due > today) {
    if (diffInHours < 24) return `Due today at ${timeStr}`;
    else if (diffInHours < 48) return `Due tomorrow at ${timeStr}`;
    else return `Due ${dateStr} at ${timeStr}`;
  } else {
    return `Late, assignment was due on ${formatTimestamp(timestamp)}`;
  }
}
