import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchInput from "./SearchInput";

function Header({ toggleIsNavOpen }) {
  return (
    <AppBar
      component="header"
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open sidebar"
          sx={{ mr: 3 }}
          onClick={toggleIsNavOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="h3"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Notes
        </Typography>
        <SearchInput />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
