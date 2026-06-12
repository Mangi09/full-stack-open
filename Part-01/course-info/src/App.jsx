const Header = (props) => {
  
  return(
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  
  return(
    <p>
        {props.partno} {props.exerciseno}
    </p>
  )
}
const Total = (props) => {
  
  return(
     <p>Number of exercises {props.total}</p>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      
      <Header course={course} />
      <Content partno = {part1} exerciseno = {exercises1}></Content>
      <Content partno = {part2} exerciseno = {exercises2}></Content>
      <Content partno = {part3} exerciseno = {exercises3}></Content>
      <Total total = {exercises1+exercises2+exercises3}></Total>
    </div>
  )
}

export default App