/* Important URLs, endpoints, and queries */
const BASE_URL = "https://seattleu.instructure.com";
const API_ENDPOINT = "/api/v1";
const COURSES_QUERY = "?include[]=term&per_page=100";
const ASSIGNMENTS_QUERY = "?include[]=term&per_page=150&include[]=submission";

/*
 * Gets all courses
 *
 * @returns {array} - An array of JSONs, where each JSOn represents an assignment
 */
export async function getCoursesAsync() {
  const COURSES_URL = `${BASE_URL}${API_ENDPOINT}/courses${COURSES_QUERY}`;
  const ERROR_MSSG = "Failed to retrieve courses";
  return await getCanvasData(COURSES_URL, ERROR_MSSG);
}

/*
 * Gets all assignments for a particular course
 *
 * @parameter {string} ID - A course ID
 * @returns {array} - An array of JSONs, where each JSON represents an assignment
 */
export async function getAssignmentsAsync(ID) {
  const ASSIGNMENTS_URL = `${BASE_URL}${API_ENDPOINT}/courses/${ID}/assignments/${ASSIGNMENTS_QUERY}`;
  const ERROR_MSSG = `Failed to retrieve assignments for class: ${ID}`;
  return await getCanvasData(ASSIGNMENTS_URL, ERROR_MSSG);
}

/*
 * Gets all the assignments based on a list of course IDs
 *
 * @param {array} courseIDs - An array of course ID strings to get assignments from
 * @returns {array} An array of assignment JSONs
 */
export async function getAllAssignmentsAsync(courses) {
  let allAssignments = [];

  for (const course of courses) {
    try {
      const courseID = course["id"];
      let assignments = await getAssignmentsAsync(courseID);
      // adding course ID as an additional field
      for (let assignment of assignments) {
        assignment["course_name"] = course["name"];
      }
      // adding the score as an additional field
      allAssignments.push(...assignments);
    } catch (error) {
      console.log(
        `Failed to retrieve assignments for course: ${id}. Error message: ${error.message}`,
      );
    }
  }
  return allAssignments;
}

/*
 * General function to fetch data from Canvas based on a URL
 *
 * @param {string} URL - A specific URL to fetch from
 * @param {string} errorMssg - A specific message to display if fetch fails
 * @returns {array} The data, which is usually a list of JSONs that represents whatever data is trying to be accessed
 */
async function getCanvasData(URL, errorMssg) {
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`${errorMssg}: ${error.message}`);
  }
}
