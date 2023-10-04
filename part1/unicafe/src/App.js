import { useState } from 'react'

const Title = (props) =>
  <h1>{props.text}</h1>

const Button = (props) =>
  <button onClick={props.handleClick}>{props.text}</button>

const StatisticLine = (props) =>
  <tr>
    <td>{props.text}</td> 
    <td>{props.value}</td>
  </tr>

const Statistics = (props) => {
  return(
    props.all !== 0 ?
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad}/>
        <StatisticLine text="all" value={props.all}/>
        <StatisticLine text="average" value={(props.good-props.bad)/props.all}/>
        <StatisticLine text="positive" value={(props.good/props.all)}/>
      </tbody>
    </table>
    :
    <div>
      <StatisticLine value="No feedback given" />
    </div>
  )
}

const App = () => {
  // enregistrer les clics de chaque bouton dans un état différent
  const [all, setAll] = useState(0)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleAll = () => {    
    setAll(all + 1)
  }

  const handleGood = () => {
    handleAll()
    setGood(good + 1)
  }
  const handleNeutral = () => {
    handleAll()
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    handleAll()
    setBad(bad + 1)
  }  

  return (
    <div>
      <Title text="give feedback" />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Title text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App
