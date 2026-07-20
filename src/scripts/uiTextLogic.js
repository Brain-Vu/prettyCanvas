import { filterAssignments, sortAssignments } from "./assignmentCourseLogic";

/*
 * Maps category names to appropriate assignments
 *
 * @param {array} assignments - Array of assignments to be classified under categories
 * @returns {map} Map with keys as category names and values of corresponding assignments
 */
export function mapCategoryContents(assignments) {
  let categories = {};

  categories["Due today"] = (() => {
    const dueToday = filterAssignments(assignments, "due today");
    return sortAssignments(dueToday, "earliest");
  })();
  categories["This week"] = (() => {
    const thisWeek = filterAssignments(assignments, "in a week");
    return sortAssignments(thisWeek, "earliest");
  })();
  categories["In a while"] = (() => {
    const later = filterAssignments(assignments, "after a week");
    return sortAssignments(later, "earliest");
  })();
  categories["Late"] = (() => {
    const late = filterAssignments(assignments, "late");
    return sortAssignments(late, "latest");
  })();
  categories["Undated"] = (() => {
    // need to group by class
    return filterAssignments(assignments, "undated");
  })();

  return categories;
}

/*
 * Formats ISO string into a date and time to display as a due date
 *
 * @param {string} time - An ISO string
 * @returns {string} The date string to display as the due date
 */
export function formatDueDate(dueDateStr) {
  const dayStrs = [
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

  const due = new Date(dueDateStr);
  if (!dueDateStr) return "Undated";

  const rawYear = due.getFullYear();
  const rawMonth = due.getMonth();
  const rawDay = due.getDate();
  const rawHour = due.getHours();
  const rawMin = due.getMinutes();

  let hours12H = rawHour;
  if (hours12H > 12) hours12H -= 12;
  else if (hours12H == 0) hours12H = 12;

  const formatMin = rawMin < 10 ? `0${rawMin}` : rawMin;
  const AMorPM = rawHour >= 12 ? "AM" : "PM";

  const dateStr = `${monthStrs[rawMonth]} ${rawDay}, ${rawYear}`;
  const timeStr = `${hours12H}:${formatMin} ${AMorPM}`;

  const today = new Date();
  const diffInHours = (due - today) / 1000 / 60;

  if (due > today) {
    if (diffInHours < 24) return `Due today at ${timeStr}`;
    else if (diffInHours < 48) return `Due tomorrow at ${timeStr}`;
    else return `Due ${dateStr} at ${timeStr}`;
  } else {
    return `Late, assignment was due on ${dateStr} at ${timeStr}`;
  }
}
