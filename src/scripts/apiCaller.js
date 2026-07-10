import * as canvasAPI from "./canvasAPI.js";

/*
 * Driver function to access assignments from Canvas
 *
 * @returns {array} Array of JSONs representing all assignments
 */
export async function assignmentLogic() {
  let allCourses, assignments;
  try {
    allCourses = await canvasAPI.getCoursesAsync();
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
  const filteredCourses = canvasAPI.filterEndDate(allCourses);

  try {
    assignments = await canvasAPI.getAllAssignmentsAsync(filteredCourses);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
  return assignments;
}

/*
 * Formats ISO string into a date and time to display as a due date
 *
 * @param {string} time - An ISO string
 * @returns {string} The date string to display as the due date
 */
export function ISODueDate(dueDateStr) {
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
	const rawYear = dueDate.getFullYear();
	const rawMonth = dueDate.getMonth();
	const rawDay = dueDate.getDate();
	const rawHour = dueDate.getHours();
	const rawMin = dueDate.getMinutes();

  let hour12H = hour;
	if (hour > 12)
		hours12H -= 12;
	else if (hour == 0)
		hours12H = 12;

	const AMorPM = hour >= 12 ? "AM" : "PM";
  
  const dateStr = `${monthStrs[rawMonth]} ${dayStrs[rawDay]}, ${rawYear}`
  const timeStr = `${hours12H}:${rawMin} ${AMorPM}`;	

	const today = new Date();
  const diffInHours = (due-today) / 60;

  if (due > today) {
    if (diffInHours >= 24)
			return `Due ${dateStr} at ${timeStr}`; 
    else   
			return `Due today at ${timeStr}`;
	} else {
    return `Late, assignment was due at ${dateStr} at ${timeStr}`;
  }
}
