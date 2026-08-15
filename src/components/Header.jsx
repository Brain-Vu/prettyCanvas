import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { Box, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import Tooltip from "@mui/material/Tooltip";
import RefreshIcon from "@mui/icons-material/Refresh";
import logo from "../assets/backpack_logo.png";
import { loadContent } from "../scripts/canvasInfoLogic.js";

function Header({ refreshHandler }) {
  const helpClick = () => {
    window.open("https://github.com/Brain-Vu/prettyCanvas");
  };
  const refreshClick = () => {
    refreshHandler();
  };

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
            <Box
              component="img"
              src={logo}
              sx={{
                width: 45,
              }}
            />{" "}
            <strong>Assignments</strong>
            <Box sx={{ ml: "auto", display: "flex" }}>
              <Tooltip title="Make sure you're logged into Canvas">
                <IconButton
                  onClick={helpClick}
                  size="small"
                  sx={{
                    transition: "0.2s",
                  }}
                >
                  <HelpCenterIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Refresh">
                <IconButton
                  onClick={refreshClick}
                  size="small"
                  sx={{
                    transition: "0.2s",
                    "&:hover": {
                      transform: "rotate(90deg)",
                    },
                  }}
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </ListSubheader>
        }
      >
        <Divider component="li" />
      </List>
    </>
  );
}

export default Header;
