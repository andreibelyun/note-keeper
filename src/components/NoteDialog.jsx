import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";

const menuMaxHeight = 240;
const defaultNote = {
  title: "",
  text: "",
  tags: [],
};

function NoteDialog({ isOpen, mode, initValue, tags, onClose, modalActions }) {
  const [note, setNote] = useState(initValue || defaultNote);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const titleName = mode
    .replace(/-/g, " ")
    .replace(/^./, (x) => x.toUpperCase());

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleInput = (e) => {
    setNote((note) => ({ ...note, [e.target.name]: e.target.value }));
  };

  const handleFormClose = () => {
    handleClose();
    setNote(defaultNote);
  };

  const handleClose = () => {
    onClose();
    setNote(defaultNote);
  };

  const handleCheckboxClick = (e) => {
    e.target.checked
      ? setNote((note) => ({ ...note, tags: [...note.tags, e.target.name] }))
      : setNote((note) => ({
          ...note,
          tags: note.tags.filter((tag) => tag !== e.target.name),
        }));
  };

  const handleNoteCreation = () => {
    modalActions.createNote({ id: uuid(), ...note });
    handleClose();
  };

  const handleNoteEdit = () => {
    modalActions.editNote({ id: initValue.id, ...note });
    handleClose();
  };

  const onSave = () => {
    switch (mode) {
      case "create-note":
        handleNoteCreation();
        break;
      case "edit-note":
        handleNoteEdit();
        break;

      default:
        console.error("Unexpected modal mode");
        break;
    }
  };

  useEffect(() => {
    setNote(initValue || defaultNote);
  }, [initValue]);

  return (
    <Dialog open={isOpen} onClose={handleFormClose}>
      <DialogTitle>{titleName}</DialogTitle>

      <DialogContent>
        <TextField
          name="title"
          label="Note title"
          placeholder="Note title"
          multiline
          fullWidth
          sx={{ mt: 1, mb: 2 }}
          onInput={handleInput}
          value={note.title}
        />
        <TextField
          name="text"
          label="Note text"
          placeholder="Note text"
          multiline
          minRows={4}
          maxRows={6}
          fullWidth
          onInput={handleInput}
          value={note.text}
        />

        <Box sx={{ mt: 1 }}>
          <Chip
            variant="outlined"
            label="Add label"
            icon={<AddCircleOutlineIcon />}
            onClick={openMenu}
          />
          {note.tags.map((item) => (
            <Chip
              key={item}
              label={item}
              onDelete={() => {
                setNote((note) => ({
                  ...note,
                  tags: note.tags.filter((tag) => tag !== item),
                }));
              }}
              sx={{ ml: 1 }}
            />
          ))}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleFormClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={closeMenu}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        sx={{ maxHeight: menuMaxHeight }}
      >
        <MenuList sx={{ p: 0 }}>
          {tags.map((tag) => (
            <MenuItem key={uuid()} sx={{ px: 1, py: 0 }}>
              <FormControlLabel
                name={tag.name}
                control={<Checkbox />}
                label={tag.name}
                checked={note.tags.some((item) => item === tag.name)}
                onChange={handleCheckboxClick}
              />
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Dialog>
  );
}

export default NoteDialog;
