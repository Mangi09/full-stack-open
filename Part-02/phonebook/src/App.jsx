import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const Filter = ({filterName})=>{
  return (
    <div>
        <span>filter shown with</span>
        <input onChange={filterName}></input>
      </div>
  )
}
const PersonForm = ({addPerson,newName,newNumber,handleNameChange,handleNumberChange})=> {
  return (
    <form onSubmit={addPerson}>
        <div>
          <div>name: <input value = {newName} onChange={handleNameChange} /></div>
          <div>number: <input value = {newNumber} onChange={handleNumberChange} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
const PersonsToShow = ({personToShow,deletePerson})=> {
  return (
    <>
    <h2>Numbers</h2>
    
      <div>
        {
      personToShow.map(person=>
        <Content key={person.id} person = {person} deletePerson = {deletePerson} ></Content>
              
      )
      }
      </div>
    </>
    
  )
}
const Content =({person,deletePerson})=> {
  return (
    <>
    <p>{person.name} - {person.number}</p>
        <button onClick = {() => deletePerson(person) }>delete</button>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [notification, setNotification] = useState(['']) 
  const [message,setMessage] = useState(['notification'])
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(persons => {
        console.log('promise fulfilled')
        setPersons(persons)
      })
      .catch(error =>{
        alert('get fail')
      })
  }, [])
  console.log(persons.length)

  // const [persons, setPersons] = useState([
  //    { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  // ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)
  const [filters, setFilters] = useState('')
  const personToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filters.toLowerCase())
  )
  const handleNameChange =(event)=>{
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange =(event)=>{
    //console.log(event.target.value)
    setNewNumber(parseInt(event.target.value, 10))
  }
  const addPerson = (event)=>{
    event.preventDefault()
    const personObject = {
     name:newName,
     number: newNumber
    }
    
    const personMainObject = persons.find(person=> person.name === newName)
    const changedPersonObject = {...personMainObject,number:newNumber}
    if(personToShow.some(person=> person.name === newName)){
      const change = window.confirm(`${personObject.name} is already added to the phonebook, replace the old number with a new one?`)
      if(change){
        personService
        .update(personMainObject.id,changedPersonObject)
        .then(returnedperson=>{
          setNotification(`Added ${personObject.name} `)
      setTimeout(()=>{
        setNotification(null)},5000
      )
          setPersons(persons
            .map(person=>person.id!==returnedperson.id?
            person
            :returnedperson
          ))
      })
      .catch(error => {
        setMessage('error')
        setNotification(`${personObject.name} has already been removed from the server.`)
      setTimeout(()=>{
        setNotification(null)},5000
      )
       setPersons(persons.filter(person => person.id !== personMainObject.id))

      })
      }
    }
    else{
      personService.create(personObject).then(returnedPersons =>{
         setNotification(`Added ${personObject.name}`)
      setTimeout(()=>{
        setNotification(null)},5000
      )
        setPersons(persons.concat(returnedPersons))
      }).catch(error =>{
        alert(`create fail ${error}`)
      })
    }
    
    setNewName('')
    setNewNumber('')
    // console.log(personObject)
  }
  
  const filterName=(event)=>{
    setFilters(event.target.value)
   
  }
  const deletePerson = (person)=>{
    const ok = window.confirm(`Do u want to delete ${person.name}?`)
    if(ok){
      personService.erase(person.id).then(personNote=>{
         setPersons(persons.filter(p => p.id !== person.id));
      }).catch(error => {
        
        
        setPersons(persons.filter(p => p.id !== person.id));
      });
    }
  }
  // console.log(filterNames)
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification  message ={notification} classes = {message}></Notification>
      <Filter filterName = {filterName}></Filter>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}>
      </PersonForm>
      <PersonsToShow personToShow={personToShow} deletePerson={deletePerson}></PersonsToShow>   
    </div>
  )
}

export default App