import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { CircularProgress } from "@mui/material";
import { Box, Divider } from "@mui/material";
import logo from "../assets/backpack_logo.png";

function CategoryList() {
  return (
    <>
      <List
        sx={{ width: "100%" }}
        component="nav"
        subheader={
          <ListSubheader
            component="div"
            id="subheader"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 1,
            }}
          >
            <Box component="img" src={logo} sx={{ width: 45 }} />
            <strong>Assignments</strong>
          </ListSubheader>
        }
      >
        <Divider component="li" />
      </List>
    </>
  );
}

export default CategoryList;
