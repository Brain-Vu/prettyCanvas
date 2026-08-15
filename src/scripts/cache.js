/*
 * Saves the content needed to render the screen to the web browser cache
 *
 * @param {array} assignments - Array of all assignment objects
 * @param {array} courses - Array of all course names
 * @param {object} categories - Object that maps categories to assignments
 * @param {object} tabs - Object that maps tabs to categories
 * @param {boolean} errored - Flags if content was able to be loaded
 */
export async function saveContent(
  assignments,
  courses,
  categories,
  tabs,
  errored,
) {
  try {
    await chrome.storage.local.set({
      assignments: assignments,
      courses: courses,
      categories: categories,
      tabs: tabs,
      errored: errored,
      time_saved: Date.now(),
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

/*
 * Gets the content needed to render the screen from the web browser cache
 *
 * @returns {array} Array of all content needed to render the screen
 */
export async function loadCachedContent() {
  try {
    const { assignments, courses, categories, tabs, errored, time_saved } =
      await chrome.storage.local.get([
        "assignments",
        "courses",
        "categories",
        "tabs",
        "errored",
        "time_saved",
      ]);
    return [assignments, courses, categories, tabs, errored, time_saved];
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}
