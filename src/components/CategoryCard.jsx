import { useState, useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import Collapse from "@mui/material/Collapse";

import AssignmentList from "./AssignmentList";
import AssignmentCard from "./AssignmentCard";

function CategoryCard({ categoryName, assignments, isLate }) {
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
        <AssignmentList assignments={assignments} isLate={isLate} />
      </Collapse>
    </>
  );
}

export default CategoryCard;
