import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';

function Notes() {
    const context = useContext(NoteContext);
    const {notes, setNotes} = context;
  return (
    <div className="row my-3">
      <h2>Your notes</h2>
      {notes.map((note, index)=>{
        return <Noteitem key={index} note={note}/>;
      })}
      </div>
  )
}

export default Notes
