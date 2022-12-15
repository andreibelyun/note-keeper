import { Box, createTheme, SpeedDial } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import NoteContainer from "./NoteContainer";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import EditIcon from "@mui/icons-material/Edit";
import NoteDialog from "./NoteDialog";
import { ThemeProvider } from "@emotion/react";
import { green, grey } from "@mui/material/colors";
import { tags, notes } from "../assets/fakeData";

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState({
    isOpen: false,
    mode: "create-note",
    initValue: null,
  });
  const [tagList, setTagList] = useState(tags);
  const [noteList, setNoteList] = useState(notes);
  const [visibleNoteList, setVisibleNoteList] = useState(notes);

  const toggleIsNavOpen = () => setIsNavOpen(!isNavOpen);

  const createNote = (newNote) => {
    setNoteList((list) => [...list, newNote]);
  };

  const editNote = (newValue) => {
    setNoteList((notes) =>
      notes.map((value) => (value.id !== newValue.id ? value : newValue))
    );
  };

  const handleCreateClick = () => {
    setModalOptions({
      isOpen: true,
      mode: "create-note",
      initValue: null,
    });
  };

  const handleEditClick = (note) => {
    setModalOptions({
      isOpen: true,
      mode: "edit-note",
      initValue: note,
    });
  };

  const handleDeleteClick = (id) => {
    setNoteList((list) => list.filter((note) => note.id !== id));
  };

  const handleClose = () => {
    setModalOptions((opt) => ({ ...opt, isOpen: false }));
  };

  const handleSort = (tag) => {
    setVisibleNoteList(
      noteList.filter((note) => note.tags.some((item) => item === tag))
    );
  };

  const showAll = () => {
    setVisibleNoteList(noteList);
  };

  const addTag = (tag) => {
    setTagList((tags) => [...tags, { name: tag }]);
  };

  const noteActions = { handleEditClick, handleDeleteClick };
  const modalActions = { createNote, editNote };

  const theme = createTheme({
    palette: {
      primary: {
        main: green[400],
      },
      secondary: {
        main: grey[500],
      },
    },
  });

  useEffect(() => {
    setVisibleNoteList(noteList);
  }, [noteList]);

  return (
    <ThemeProvider theme={theme}>
      <Header toggleIsNavOpen={toggleIsNavOpen} />
      <Box sx={{ display: "flex" }}>
        <NavBar
          isOpen={isNavOpen}
          tagList={tagList}
          onSort={handleSort}
          showAll={showAll}
          addTag={addTag}
        />
        <NoteContainer noteList={visibleNoteList} noteActions={noteActions} />
      </Box>
      <SpeedDial
        ariaLabel="Create new note"
        sx={{ position: "fixed", bottom: 40, right: 40 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClick={handleCreateClick}
      />
      <NoteDialog
        isOpen={modalOptions.isOpen}
        mode={modalOptions.mode}
        initValue={modalOptions.initValue}
        tags={tagList}
        onClose={handleClose}
        modalActions={modalActions}
      />
    </ThemeProvider>
  );
}

export default App;
