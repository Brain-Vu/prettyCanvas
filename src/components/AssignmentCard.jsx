import { useState, useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import StarBorder from "@mui/icons-material/StarBorder";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";

import "../css/AssignmentCard.css";

import { formatDueDate } from "../scripts/uiTextLogic";

function AssignmentCard({
  assignmentName,
  course,
  dueDate,
  submitted,
  isLate,
  url
}) {
  const handleClick = () => {window.open(url, '_blank');
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
              "Submitted"
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
