import { useState, useEffect } from "react";
import List from "@mui/material/List";
import AssignmentCard from "./AssignmentCard";

function AssignmentList({ assignments, tabName }) {
  return (
    <>
      <List component="div" disablePadding>
        {assignments
          ? assignments.map((assignment) => {
              const hasSubmitTime =
                assignment["has_submitted_submissions"] &&
                Object.hasOwn(assignment, "submission") &&
                assignment["submission"]["submitted_at"] != null;
              const isGraded =
                Object.hasOwn(assignment, "submission") &&
                assignment["submission"]["workflow_state"] == "graded";

              return (
                <AssignmentCard
                  assignmentName={assignment["name"]}
                  course={assignment["course_name"]}
                  dueDate={assignment["due_at"]}
                  url={assignment["html_url"]}
                  tabName={tabName}
                  hasSubmitTime={hasSubmitTime}
                  submitTime={assignment["submission"]["submitted_at"]}
                  isGraded={isGraded}
                  score={isGraded ? assignment["submission"]["score"] : 0}
                  totalPoints={assignment["points_possible"]}
                />
              );
            })
          : "Nothing for now"}
      </List>
    </>
  );
}

export default AssignmentList;
