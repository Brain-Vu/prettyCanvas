import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { Box, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RefreshIcon from "@mui/icons-material/Refresh";
import logo from "../assets/backpack_logo.png";
import { loadContent } from "../scripts/canvasInfoLogic.js";

function Header({ refreshHandler }) {
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
            <Tooltip title="Refresh">
              <IconButton
                onClick={refreshClick}
                size="small"
                sx={{
                  ml: "auto",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "rotate(90deg)",
                  },
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </ListSubheader>
        }
      >
        <Divider component="li" />
      </List>
    </>
  );
}

export default Header;
