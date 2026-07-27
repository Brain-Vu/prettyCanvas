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
  courses,
  catAssignMap,
  tabCatMap,
  errored,
}) {
  const [tabIndex, setTabIndex] = useState(0);

  const changeTab = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return errored ? (
    "Unable to load assignments. Please check that you've logged into and opened Canvas."
  ) : !assignments ? (
    <Box>
      <CircularProgress color="black" />
    </Box>
  ) : (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "black" }}>
        <Tabs value={tabIndex} onChange={changeTab}>
          {Object.keys(tabCatMap).map((tabName) => (
            <Tab label={tabName} />
          ))}
        </Tabs>
      </Box>

      {Object.keys(tabCatMap).map((tabName, myTabIndex) => (
        <CustomTabPanel currTabIndex={tabIndex} myTabIndex={myTabIndex}>
          <CategoryList
            categoryNames={tabCatMap[tabName]}
            catAssignMap={catAssignMap}
            tabName={tabName}
          ></CategoryList>
        </CustomTabPanel>
      ))}
    </Box>
  );
}
