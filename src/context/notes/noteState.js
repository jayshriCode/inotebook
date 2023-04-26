import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{ 
  const host = 'http://localhost:5000';
    const notesInitial = [];
      const [notes, setNotes] =  useState(notesInitial)

      //Get all motes
      const getNotes = async()=>{
        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
           'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyZDQ5ZTAxNTFjYmNkYTVkMmY5Yjc0In0sImlhdCI6MTY4MDc3MDk0OH0.n01SgiWWX_OmXwhm_rg9aNO6FrQSwKbabPi1w9dYuNM',
          },
        });
        const json = await response.json();
        //console.log(json);
        setNotes(json);
      }

      //Add a note
      const addNote = async(title, description, tag)=>{
       
        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
           'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyZDQ5ZTAxNTFjYmNkYTVkMmY5Yjc0In0sImlhdCI6MTY4MDc3MDk0OH0.n01SgiWWX_OmXwhm_rg9aNO6FrQSwKbabPi1w9dYuNM',
          },
          body: JSON.stringify({title,description,tag}), 
        });
        const json = await response.json(); 
        console.log(json);

        //console.log("adding note");
        const note = {
          "_id": "643fb0e83864deee0fc374a3",
          "user": "642d49e0151cbcda5d2f9b74",
          "title": title,
          "description": description,
          "tag": tag,
          "__v": 0
        };
        setNotes(notes.concat(note));
      }
      //Delete a note
      const deleteNote = async(id)=>{
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
           'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyZDQ5ZTAxNTFjYmNkYTVkMmY5Yjc0In0sImlhdCI6MTY4MDc3MDk0OH0.n01SgiWWX_OmXwhm_rg9aNO6FrQSwKbabPi1w9dYuNM',
          }
        });
        const json = await response.json(); 
        console.log(json);
        
        //console.log("Deleting note with id "+id);
        const newNotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes);
      }
      //Edit a note
      const editNote = async(id, title, description, tag)=>{
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
           'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyZDQ5ZTAxNTFjYmNkYTVkMmY5Yjc0In0sImlhdCI6MTY4MDc3MDk0OH0.n01SgiWWX_OmXwhm_rg9aNO6FrQSwKbabPi1w9dYuNM',
          },
          body: JSON.stringify({title,description,tag}), 
        });
        const json = await response.json(); 
        console.log(json);
      


        //Logit to edit note in client
        let newNotes = JSON.parse(JSON.stringify(notes)) ;
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            element.title = title;
            element.description = description;
            element.tag = tag;
            break;
          }
          
        }
        //console.log(newNotes);
        setNotes(newNotes);
      }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;