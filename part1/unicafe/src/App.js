import { useState } from 'react'

const Title = (props) =>
  <h1>{props.text}</h1>

const Button = (props) =>
  <button onClick={props.handleClick}>{props.text}</button>

const Display = (props) =>
  <div>{props.title} {props.value}</div>

const App = () => {
  // enregistrer les clics de chaque bouton dans un état différent
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Title text="give feedback" />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Title text="statistics" />
      <Display title="good" value={good} />
      <Display title="neutral" value={neutral} />
      <Display title="bad" value={bad} />
    </div>
  )
}

export default App
