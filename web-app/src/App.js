import { useEffect, useState } from "react";
import { Route, Routes, useNavigate} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Button, DangerButton } from "./Button/Button.styled";
import { IoIosAddCircleOutline } from "react-icons/io";
import { WiMoonAltFirstQuarter } from "react-icons/wi";
import { lightTheme,darkTheme, GlobalStyle } from "./GlobalStyle";
import {
  Side,
  Main,
  FullHeightAndWidthCentered,
  LoaderWrapper,
  FunctionContainer,
} from "./App.styled";
import { NoteList } from "./NoteList/NoteList.styled";
import LinkToNote from "./LinkToNote";
import Note from "./Note";
import { Loader } from "./Loader/Loader.styled";


function App() {
  const [notes, setNotes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(lightTheme);
  const navigate = useNavigate();
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const fetchNotes = async () => {
    const response = await fetch("/notes");
    const notes = await response.json();
    setIsLoading(false);
    setNotes(notes);
  };

  const updateNote = (noteToUpdate) => {
    setNotes(
      notes.map((note) => (note.id === noteToUpdate.id ? noteToUpdate : note))
    );
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  //ajouter une note
  const createNewNote = async () => {
    console.log(notes);
    const response = await fetch(`/notes`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        title: "New Note",
        content: "Edit me"
      })
    });
    if (response.ok) {
      const note = await response.json();
      addNewNote(note);
      navigate(`/notes/${note.id}`);
    }
  }
  
  const addNewNote = (note) => {
    setNotes(
      notes.concat({
      id: note.id,
      title: note.title,
    }))
  }

  //supprimer une note
  const deleteWholeNote = (id) => {
    console.log(id);
    setNotes(
      notes.filter((note) => {
        return note.id !== id;
      })
    );
  }
 
  //change theme
  const switchTheme = () => {
    theme === lightTheme ? setTheme(darkTheme) : setTheme(lightTheme);
  };


  //highlight titre note
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Side>
        {isLoading && (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}
        {notes && (
          <NoteList>
            {notes.map((note) => (
              <li key={note.id}>
                <LinkToNote id={note.id} title={note.title}/>
              </li>
            ))}
          </NoteList>
        )}
        <FunctionContainer>
          <DangerButton type="button" onClick={createNewNote}>
            <IoIosAddCircleOutline/>
          </DangerButton>
          
          <DangerButton type="button" onClick={switchTheme}>
            <WiMoonAltFirstQuarter/>
          </DangerButton>
        </FunctionContainer>
      </Side>
      <Main>
        <Routes>
          <Route
            path="/"
            element={
              <FullHeightAndWidthCentered>
                {!isLoading && "Sélectionnez une note pour l'éditer"}
              </FullHeightAndWidthCentered>
            }
          />
          <Route path="/notes/:id" element={<Note onSave={updateNote} onDelete={deleteWholeNote} />} />
        </Routes>
      </Main>
    </ThemeProvider>
  );
}

export default App;
