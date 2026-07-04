import { useState, useEffect } from 'react'
import axios from 'axios'


const Header = (props) => <h1>{props.course}</h1>

const Contents = ({course}) => (
  <div>
    {course.parts.map(part =>
    <Part key = {part.id} part = {part}></Part>
    )}
  </div>
)
const Course = ({course,total}) => (
  <div>
    <h1>{course.name}</h1>
    <Contents course ={course}></Contents>
  <Total total ={total}></Total>
    
  </div>
)

const Total = ({total})=>(
  <p>total of {total} exercises</p>
)


const Part = ({part}) => (
  <p >
    {part.name} {part.exercises}
  </p>
)



const App = () => {
    const [notes, setNotes] = useState([])

    useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  console.log(courses[0])

  return (<div>
    {
    courses.map(course => <Course key = {course.id} course={course} total={course.parts.reduce((s, p) => s+p.exercises,0)}></Course>)
  }
  </div>
 
)
}

export default App