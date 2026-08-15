import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import "../css/AssignmentCard.css";

import { formatTimestamp, formatDueDate } from "../scripts/UILogic";

function AssignmentCard({
  assignmentName,
  course,
  dueDate,
  url,
  tabName,
  hasSubmitTime,
  submitTime,
  isGraded,
  score,
  totalPoints,
}) {
  const handleClick = () => {
    window.open(url, "_blank");
  };

  const makeDescription = () => {
    if (tabName=="Completed") {
      return hasSubmitTime
        ? `Submitted on ${formatTimestamp(submitTime)}`
        : "Submitted, no submission time on record";
    } else {
      return tabName=="Late" ? (
        <>
          <br />
          <span style={{ color: "red" }}>{formatDueDate(dueDate)}</span>
        </>
      ) : (
        formatDueDate(dueDate)
      );
    }
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        {" "}
        <ListItemText
          className="assignment-text"
          primary={assignmentName}
          secondary={
            <>
              {course}
              <br />
              {makeDescription()}
            </>
          }
        />{" "}
        {isGraded ? `${score}/${totalPoints}` : ""}
      </ListItemButton>
    </>
  );
}

export default AssignmentCard;
