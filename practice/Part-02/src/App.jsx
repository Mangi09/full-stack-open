import { useState, useEffect } from 'react'
import Notes from './components/Notes'
import axios from 'axios'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const Note =({note, toggleImportance,className})=>{
  const label = note.important ? 'make not important':'make important'
  return (
    <div>
    <span className ={className}>{note.content}</span> 
    <button onClick = {toggleImportance} >{label}</button>
    <br/>
    <hr></hr>
    </div>
  )
}
const App = () => {
  const [notes,setNotes] = useState([])
  const [newNote, setNewNote] = useState(" newnote" )
 const [showAll, setShowAll] = useState(true)
 const [errorMessage, setErrorMessage] = useState('some error happened..')

  const handleNoteChange =(event)=>{
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  useEffect(() => {
    noteService
      .getAll()
      .then(InitialNotes => {
        console.log('promise fulfilled')
        setNotes(InitialNotes)
      })
  }, [])

  const addNote = (event)=>{
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
     
    }
    noteService.create(noteObject)
    .then(returnedNote => {
      console.log(returnedNote)
      setNotes(notes.concat(returnedNote))
    setNewNote('')
    })
    
    // console.log("button clicked ", event.target);
  }
   const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n=>n.id==id)
    const changedNote = {...note,important:!note.important}

   noteService.update(id,changedNote)
   .then(returnedNote=>{
      setNotes(notes.map(note=>note.id==id?returnedNote:note))
    }
    )
    .catch(error =>{
      setErrorMessage(`Note ${note.content} was already removed from the server`)
      setTimeout(()=>{
        setErrorMessage(null)},5000
      )
      setNotes(notes.filter(n=>n.id!==id))
    })
    console.log(`importance of ${id} needs to be toggled`)
  }
  const notesToShow = showAll
  ?
  notes
  :notes.filter(note=>note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message = {errorMessage}></Notification>
      <div>
        <button onClick ={()=>setShowAll(!showAll)}>
          show {(showAll)?"important":"all"}
        </button>
      </div>
      {
      notesToShow.map(note=>
        
        <Note className= 'note' key={note.id} note={note} toggleImportance={()=>toggleImportanceOf(note.id)}/>
     
      )
    }
    
    <form onSubmit = {addNote}>
      <input value ={newNote} onChange = {handleNoteChange}/>
      <button type ="submit">save</button>

    </form> 
    <Footer></Footer> 

    </div>
  )
}

export default App