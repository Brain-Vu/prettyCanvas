import { useState, useEffect } from 'react'

import { assignmentLogic } from './scripts/apiCaller.js'

import AssignmentCard from './AssignmentCard.jsx'

import './css/App.css'



function App() {
  const [assignments, setAssignments] = useState(null)

  useEffect (() => { 
    async function loadAssignments(){
      let filteredAssignments = await assignmentLogic()
      setAssignments(filteredAssignments)
 
    }
    loadAssignments()
  }, [])

  return (
    <>
      {assignments ? assignments.map(assignment =>
				<AssignmentCard 
          assignmentName={assignment['name']} 
          course={assignment['course_id']} 
          dueDate={assignment['due_at'] ? assignment['due_at'] : "Undated"}
        />) : 'Loading'
      }
    </>
  )
}

export default App
