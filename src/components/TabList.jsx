import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, CircularProgress } from "@mui/material";
import CategoryList from "./CategoryList";

function CustomTabPanel({ children, currTabIndex, myTabIndex }) {
  return (
    <div role="tabpanel" hidden={currTabIndex != myTabIndex}>
      {currTabIndex == myTabIndex && <Box>{children}</Box>}
    </div>
  );
}
//------------------------------------------------------------------------
export default function TabList({
  assignments,
  catAssignMap,
  tabCatMap,
  error,
}) {
  const [tabIndex, setTabIndex] = useState(0);

  const changeTab = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return error ? (
    "Unable to load assignments. Please check that you've logged into and opened Canvas."
  ) : !assignments ? (
    <Box>
      <CircularProgress color="black" />
    </Box>
  ) : (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "black" }}>
        <Tabs value={tabIndex} onChange={changeTab}>
          <Tab label="Upcoming" />
          <Tab label="Past Due" />
          <Tab label="Completed" />
        </Tabs>
      </Box>

      {Object.keys(tabCatMap).map((tabName, myTabIndex) => (
        <CustomTabPanel currTabIndex={tabIndex} myTabIndex={myTabIndex}>
          <CategoryList
            categoryNames={tabCatMap[tabName]}
            catAssignMap={catAssignMap}
          ></CategoryList>
        </CustomTabPanel>
      ))}
    </Box>
  );
}
