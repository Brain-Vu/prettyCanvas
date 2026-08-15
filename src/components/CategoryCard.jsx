import { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import AssignmentList from "./AssignmentList";

function CategoryCard({ categoryName, assignments, tabName }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          mt: 1,
          bgcolor: "#f3f4f6",
          borderRadius: 1,
          "&:hover": { bgcolor: "#e5e7eb" },
        }}
      >
        <ListItemText
          className="assignment-text"
          primary={categoryName}
          primaryTypographyProps={{
            color: "text.secondary",
            fontWeight: 600,
          }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ ml: 1.5, mb: 1 }}>
          <AssignmentList assignments={assignments} tabName={tabName} />
        </Box>
      </Collapse>
    </>
  );
}

export default CategoryCard;
