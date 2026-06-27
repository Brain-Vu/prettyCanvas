import * as canvasAPI from './canvasAPI.js'; 

/*
 * Driver function to access assignments from Canvas
 *
 * @returns {array} Array of JSONs representing all assignments
*/
export async function assignmentLogic(){
  let allCourses, assignments;
	try {
		allCourses = await canvasAPI.getCoursesAsync();
  }
	catch (error) {
		console.log(`Error: ${error.message}`); 
	}
	const filteredCourses = canvasAPI.filterEndDate(allCourses);
	
	try {
	  assignments = await canvasAPI.getAllAssignmentsAsync(filteredCourses);
	}
	catch (error) {
		console.log(`Error: ${error.message}`); 
	}
  return assignments;
}  
