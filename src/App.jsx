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
      {assignments ? console.log(assignments) : 'b'}
      <AssignmentCard></AssignmentCard>
    </>
  )
}

export default App
