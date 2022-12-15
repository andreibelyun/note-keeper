import React from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import Note from "./Note";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import { v4 as uuid } from "uuid";

function NoteContainer({ noteList, noteActions }) {
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          p: 3,
        }}
      >
        {noteList.length === 0 && (
          <Box sx={{ pt: "20vh", display: "flex" }}>
            <SearchOffOutlinedIcon color="disabled" fontSize="large" />
            <Typography
              color="text.secondary"
              variant="h5"
              sx={{ textAlign: "center" }}
            >
              There are not notes with this tag
            </Typography>
          </Box>
        )}
        {noteList.map((note) => (
          <Note key={uuid()} value={note} noteActions={noteActions} />
        ))}
      </Box>
    </Box>
  );
}

export default NoteContainer;
