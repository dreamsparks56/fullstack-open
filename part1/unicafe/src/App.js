import { useState } from 'react'

const Title = (props) =>
  <h1>{props.text}</h1>

const Button = (props) =>
  <button onClick={props.handleClick}>{props.text}</button>

const Display = (props) =>
  <div>{props.value}</div>

const App = () => {
  // enregistrer les clics de chaque bouton dans un état différent
  const [all, setAll] = useState(0)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [avg, setAvg] = useState(0)
  const [pos, setPos] = useState(0)

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
  const handleAll = () => {    
    setAll(all + 1)
  }
  const handleAvg = () => setAvg((good-bad)/all)
  const handlePos = () => setPos(good*100/all)

  return (
    <div>
      <Title text="give feedback" />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Title text="statistics" />
      <Display value={`good ${good}`} />
      <Display value={`neutral ${neutral}`} />
      <Display value={`bad ${bad}`}/>
      <Display value={`all ${all}`}/>
      <Display value={`average ${avg}`}/>
      <Display value={`positive ${pos}%`}/>
    </div>
  )
}

export default App
