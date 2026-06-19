import { useState } from 'react'

const Button = (props)=> <button onClick={props.onClick} >{props.text}</button>
const StatisticLine = (props)=><tr>
    <td>{props.text}</td>
    <td>{props.feedback}</td>
  </tr>

const Statistics = (props)=>{
if(props.good ===0 && props.bad === 0 && props.neutral === 0){
  return(<div>
    <h2>statistics</h2>
    <p>No feedback given</p>
  </div>)
}
return(
  <div>
    <h2>statistics</h2>
    <table>
      <tbody>
      <StatisticLine text ='good' feedback = {props.good}/>
      <StatisticLine text ='neutral' feedback = {props.neutral}/>
      <StatisticLine text ='bad' feedback = {props.bad}/>
      <StatisticLine text ='all' feedback = {props.total}/>
      <StatisticLine text ='average' feedback = {props.avg}/>
      <StatisticLine text ='positve %:' feedback = {props.positive}/>
      </tbody>
    </table>
  </div>
  
)
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [vote, setVote] = useState(
  new Array(anecdotes.length).fill(0)
)
 
  const [selected, setSelected] = useState(0)

  const generate = ()=>{
  const randomNum = Math.floor(Math.random() * (anecdotes.length-1)) ;
  setSelected(randomNum)
  console.log(selected)
  }
  const votes = ()=> {
    const copy=[...vote]
    copy[selected]++
    setVote(copy)
  }
  const max = Math.max(...vote)
  
  const goodHandler = ()=>{
    console.log(good)
    setGood(good+1)
    const updatedGood = good+1    
     setTotal(updatedGood+bad+neutral)
  }
  const neutralHandler = ()=>{
    setNeutral(neutral+1)
    const updatedNeutral = neutral+1
     setTotal(good+bad+updatedNeutral)
  }
  const badHandler = ()=>{
    setBad(bad+1)
    const updatedBad = bad+1
     setTotal(good+updatedBad+neutral)
  }
  const avg = (good + neutral)/total
  const positive = (good/total)*100

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={goodHandler} text ='good'/>
      <Button onClick={neutralHandler} text ='neutral'/>
      <Button onClick={badHandler} text ='bad'/>
      <br></br>
      <Statistics good ={good} bad ={bad} neutral = {neutral} total={total} avg ={avg} positive = {positive}
      ></Statistics>
      {/* Anecdotes */}
      <br></br>
      <h2>Anecdote of the Day</h2>
      <div>{anecdotes[selected]} has {vote[selected]} votes</div>
      <Button onClick={votes} text = 'vote'></Button>
      <Button onClick={generate} text = 'next anecdote'></Button>

      <h2>Anecdotes with most votes</h2>
      <div>{anecdotes[vote.indexOf(max)]} has {max} votes</div>

      
      
    </div>
  )
}

export default App