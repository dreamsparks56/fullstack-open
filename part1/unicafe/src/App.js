import { useState } from 'react'

const Title = (props) =>
  <h1>{props.text}</h1>

const Button = (props) =>
  <button onClick={props.handleClick}>{props.text}</button>

const StatisticLine = (props) =>
  <div>{props.text} {props.value}</div>

const Statistics = (props) => {
  return(
    props.all !== 0 ?
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="all" value={props.all}/>
      <StatisticLine text="average" value={props.avg}/>
      <StatisticLine text="positive" value={props.pos}/>
    </div>
    :
    <StatisticLine value="No feedback given" />
  )
}

const App = () => {
  // enregistrer les clics de chaque bouton dans un état différent
  const [all, setAll] = useState(0)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [avg, setAvg] = useState(0)
  const [pos, setPos] = useState('0%')

  const handleAll = () => {    
    setAll(all + 1)
  }

  const handleGood = () => {
    handleAll()
    setGood(good + 1)
    handleAvg()
    handlePos()
  }
  const handleNeutral = () => {
    handleAll()
    setNeutral(neutral + 1)
    handleAvg()
    handlePos()
  }
  const handleBad = () => {
    handleAll()
    setBad(bad + 1)
    handleAvg()
    handlePos()
  }
  const handleAvg = () => setAvg((good-bad)/all)
  const handlePos = () => setPos(`${good*100/all}%`)

  return (
    <div>
      <Title text="give feedback" />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Title text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} pos={pos} />
    </div>
  )
}

export default App
