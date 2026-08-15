// test function to filter for courses that are from a specific quarter
export function filterCourses(courses, by) {
  let filterFunc;
  if (by == "before end") {
    const today = new Date();
    filterFunc = (course) => {
      if (course["term"] == null || course["term"]["end_at"] == null)
        return false;
      const courseEnd = new Date(course["term"]["end_at"]);
      // hard coding term to Fall 2025 for testing purposes
      return (
        courseEnd > today ||
        course["term"]["name"] == "25FQ Fall Quarter 2025"
      );
    };
  }
  return courses.filter(filterFunc);
}
