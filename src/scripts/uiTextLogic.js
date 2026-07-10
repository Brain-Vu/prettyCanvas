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
  const diffInHours = (due - today) / 60;

  if (due > today) {
    if (diffInHours < 24) return `Due today at ${timeStr}`;
    else if (diffInHours < 48) return `Due tomorrow at ${timeStr}`;
    else return `Due ${dateStr} at ${timeStr}`;
  } else {
    return `Late, assignment was due on ${dateStr} at ${timeStr}`;
  }
}
