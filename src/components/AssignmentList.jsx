import { useState, useEffect } from "react";
import List from "@mui/material/List";
import AssignmentCard from "./AssignmentCard";

function AssignmentList({ assignments, isLate }) {
  return (
    <>
      <List component="div" disablePadding>
        {assignments
          ? assignments.map((assignment) => (
              <AssignmentCard
                assignmentName={assignment["name"]}
                course={assignment["course_name"]}
                dueDate={assignment["due_at"]}
                submitted={assignment["has_submitted_submissions"]}
                isLate={isLate}
                url={assignment["html_url"]}
              />
            ))
          : "Nothing for now."}
      </List>
    </>
  );
}

export default AssignmentList;
