import React, { useState } from "react";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  TextField,
  Toolbar,
} from "@mui/material";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { v4 as uuid } from "uuid";

const drawerWidth = 240;

function NavBar({ isOpen, tagList, onSort, showAll, addTag }) {
  const drawerStyles = {
    width: drawerWidth,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
      width: drawerWidth,
      boxSizing: "border-box",
    },
  };
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [newLabel, setNewLabel] = useState("");

  const handleInput = (e) => {
    setNewLabel(e.target.value);
  };

  const addNewLabel = () => {
    addTag(newLabel);
    setIsInputOpen(false);
    setNewLabel("");
  };

  return (
    <div>
      {isOpen && (
        <Drawer
          variant={isScreenSmall ? "permanent" : "temporary"}
          open={isOpen}
          sx={drawerStyles}
        >
          <Toolbar />
          <Box>
            <List>
              <ListItem divider disablePadding>
                <ListItemButton onClick={showAll}>
                  <ListItemIcon>
                    <ViewListOutlinedIcon />
                  </ListItemIcon>
                  All notes
                </ListItemButton>
              </ListItem>

              {tagList.map((item) => (
                <ListItem key={uuid()} divider disablePadding>
                  <ListItemButton onClick={() => onSort(item.name)}>
                    <ListItemIcon>
                      <LabelOutlinedIcon />
                    </ListItemIcon>
                    {item.name}
                  </ListItemButton>
                </ListItem>
              ))}

              <ListItem disablePadding>
                <ListItemButton onClick={() => setIsInputOpen(!isInputOpen)}>
                  <ListItemIcon>
                    <AddBoxOutlinedIcon />
                  </ListItemIcon>
                  Add label
                </ListItemButton>
              </ListItem>

              {isInputOpen && (
                <ListItem>
                  <TextField
                    placeholder="Label..."
                    size="small"
                    onInput={handleInput}
                    value={newLabel}
                  />
                  <Button
                    variant="outlined"
                    sx={{ ml: 0.5 }}
                    onClick={addNewLabel}
                  >
                    Add
                  </Button>
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>
      )}
    </div>
  );
}

export default NavBar;
