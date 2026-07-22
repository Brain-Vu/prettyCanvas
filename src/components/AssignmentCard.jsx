import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import "../css/AssignmentCard.css";

import { formatTimestamp, formatDueDate } from "../scripts/uiTextLogic";

function AssignmentCard({
  assignmentName,
  course,
  dueDate,
  submitted,
  isLate,
  url,
  hasSubmitTime,
  submitTime,
}) {
  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        {" "}
        <ListItemText
          className="assignment-text"
          primary={assignmentName}
          secondary={
            submitted ? (
              hasSubmitTime ? (
                `Submitted on ${formatTimestamp(submitTime)}`
              ) : (
                "Submitted, no submission time on record"
              )
            ) : (
              <>
                {course}
                {!isLate ? (
                  " * " + formatDueDate(dueDate)
                ) : (
                  <>
                    <br />
                    <span style={{ color: "red" }}>
                      {formatDueDate(dueDate)}
                    </span>
                  </>
                )}{" "}
              </>
            )
          }
        />{" "}
      </ListItemButton>
    </>
  );
}

export default AssignmentCard;
