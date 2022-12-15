import React, { useState } from "react";
import { Box } from "@mui/system";
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuList,
  MenuItem,
  Menu,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const settings = {
  minWidth: 240,
  maxWidth: 345,
  maxTitleWidth: 200,
  maxContentHeight: 200,
};

function Note({ value, noteActions }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const menuActions = [
    {
      name: "Delete",
      icon: <DeleteIcon />,
      action: () => {
        noteActions.handleDeleteClick(value.id);
      },
    },
    {
      name: "Edit",
      icon: <EditIcon />,
      action: () => {
        noteActions.handleEditClick(value);
      },
    },
  ];

  return (
    <Card
      sx={{
        minWidth: settings.minWidth,
        maxWidth: settings.maxWidth,
        cursor: "pointer",
      }}
      // onClick={() => {
      //   noteActions.handleEditClick(value);
      // }}
    >
      <CardHeader
        action={
          <>
            <IconButton aria-label="actions" onClick={openMenu}>
              <MoreVertIcon />
            </IconButton>
          </>
        }
        title={value.title}
        subheader={value.creationTime}
        titleTypographyProps={{
          maxWidth: settings.maxTitleWidth,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      />

      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxHeight: settings.maxContentHeight, overflow: "hidden" }}
        >
          {value.text}
        </Typography>
        {value.tags.length > 0 && (
          <>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Box>
              {value.tags.map((tag, i) =>
                i >= 3 ? null : (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{ mr: 0.5, cursor: "pointer" }}
                  />
                )
              )}
              {value.tags.length > 3 && (
                <Chip
                  variant="outlined"
                  label={`+${value.tags.length - 3}`}
                  size="small"
                  sx={{ mr: 0.5, cursor: "pointer" }}
                />
              )}
            </Box>
          </>
        )}
      </CardContent>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClick={closeMenu}
        onClose={closeMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuList sx={{ p: 0 }}>
          {menuActions.map((action) => (
            <MenuItem key={action.name} onClick={action.action}>
              <ListItemIcon>{action.icon}</ListItemIcon>
              <ListItemText>{action.name}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Card>
  );
}

export default Note;
