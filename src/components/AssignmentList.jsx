import { useState, useEffect } from "react";
import List from "@mui/material/List";
import AssignmentCard from "./AssignmentCard";

function AssignmentList({ assignments, isLate }) {
  return (
    <>
      <List component="div" disablePadding>
        {assignments
          ? assignments.map((assignment) => {
              const hasSubmitTime =
                assignment["has_submitted_submissions"] &&
                Object.hasOwn(assignment, "submission") &&
                assignment["submission"]["submitted_at"] != null;

              return (
                <AssignmentCard
                  assignmentName={assignment["name"]}
                  course={assignment["course_name"]}
                  dueDate={assignment["due_at"]}
                  submitted={assignment["has_submitted_submissions"]}
                  isLate={isLate}
                  url={assignment["html_url"]}
                  hasSubmitTime={hasSubmitTime}
                  submitTime={assignment["submission"]["submitted_at"]}
                />
              );
            })
          : "Nothing for now"}
      </List>
    </>
  );
}

export default AssignmentList;
