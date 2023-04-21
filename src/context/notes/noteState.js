import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{ 
    const notesInitial = [
        {
          "_id": "643fb0d23864deee0fc374a1",
          "user": "642d49e0151cbcda5d2f9b74",
          "title": "My title 2",
          "description": "This is my second note",
          "tag": "Personal",
          "__v": 0
        },
        {
          "_id": "643fb0e83864deee0fc374a3",
          "user": "642d49e0151cbcda5d2f9b74",
          "title": "My title",
          "description": "This is my first note",
          "tag": "Personal",
          "__v": 0
        },
        {
          "_id": "643fb0e83864deee0fc374a3",
          "user": "642d49e0151cbcda5d2f9b74",
          "title": "My title",
          "description": "This is my first note",
          "tag": "Personal",
          "__v": 0
        },
        {
          "_id": "643fb0e83864deee0fc374a3",
          "user": "642d49e0151cbcda5d2f9b74",
          "title": "My title",
          "description": "This is my first note",
          "tag": "Personal",
          "__v": 0
        },
        {
          "_id": "643fb0e83864deee0fc374a3",
          "user": "642d49e0151cbcda5d2f9b74",
          "title": "My title",
          "description": "This is my first note",
          "tag": "Personal",
          "__v": 0
        }
      ];
      const [notes, setNotes] =  useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;