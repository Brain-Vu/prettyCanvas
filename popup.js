function getIds(data) {
  // assuming each quarter is about 11 weeks
  let ids = [];  
  for (const d of data){
    let id = d['id'];
    ids.push(id);
  }
  console.log(ids);
}

async function getAssignments() {
  const url = 'https://seattleu.instructure.com/api/v1/courses?include[]=term&per_page=100';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    getIds(data);
  } catch (error){
    console.log(error);
  }

}

getAssignments();