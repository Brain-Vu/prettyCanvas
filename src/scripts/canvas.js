function getIds(data) {
  // assuming each quarter is about 11 weeks
  let ids = [];  
  for (const d of data){
    let id = d['id'];
    ids.push(id);
  }
  console.log(ids);
}

export async function getCoursesAsync() {
  const url = 'https://seattleu.instructure.com/api/v1/courses?include[]=term&per_page=100';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error){
    throw new Error(`Failed to retrieve courses: ${error.message}`)
  }

}