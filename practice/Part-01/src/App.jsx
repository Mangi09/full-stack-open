import { useState } from "react";
 const Display = props => <div>{props.value}</div>

const History = (props)=>{
  if(props.allClicks.length === 0){
    return(
      <div>start by pressing the buttons</div>
    )
  }
  return(
      <div>{props.allClicks.join(' ')}</div>
    )

}
const Button = (props) => {
  console.log(props)
  return(
  <button onClick={props.onClick}>
    {props.text}
  </button>
  )
}
const App = () => {
  const [value, setValue] = useState(10)
  

  const setToValue = (newValue) =>{
    console.log('value now', newValue)  // print the new value to console
    setValue(newValue)
  }
 

  
  return (
    <div>
      <Display value = {value}></Display>

       <Button onClick={() => setToValue(1000)} text="thousand" />
      <Button onClick={() => setToValue(0)} text="reset" />
      <Button onClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}

export default App;