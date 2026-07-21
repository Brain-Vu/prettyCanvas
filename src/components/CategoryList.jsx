import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { CircularProgress } from "@mui/material";
import { Box, Divider } from "@mui/material";
import logo from "../assets/backpack_logo.png";
import CategoryCard from "./CategoryCard.jsx";

function CategoryList({ categories, assignments, error }) {
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

        {!error ? (
          categories ? (
            Object.keys(categories).map((categoryName) => (
              <>
                <CategoryCard
                  categoryName={categoryName}
                  assignments={categories[categoryName]}
                  isLate={categoryName=="Late"}
                />
                <Divider />
              </>
            ))
          ) : (
            <CircularProgress color="black" />
          )
        ) : (
          "Unable to load assignments. Please make sure that you have logged into and opened Canvas."
        )}
      </List>
    </>
  );
}

export default CategoryList;
