import { useState, useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import StarBorder from "@mui/icons-material/StarBorder";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";

import AssignmentCard from "./AssignmentCard";

function CategoryCard({ categoryName, assignments }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText className="assignment-text" primary={categoryName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {assignments
            ? assignments.map((assignment) => (
                <AssignmentCard
                  assignmentName={assignment["name"]}
                  course={assignment["course_name"]}
                  dueDate={assignment["due_at"]}
                />
              ))
            : "Loading"}
        </List>
      </Collapse>
    </>
  );
}

export default CategoryCard;
