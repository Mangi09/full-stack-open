const Note = ({ note, className}) => {
  return <p className= {className}>{note.content}</p>
}

export default Note