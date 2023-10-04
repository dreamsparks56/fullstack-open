import { useState } from 'react'

const Title = (props) =>
  <h1>{props.text}</h1>

const Button = (props) => 
  <button onClick={props.handleClick}>{props.text}</button>

const Anecdote = (props) => {
  return (
    <div>
      <div>{props.anecdote}</div>
      <div>has {props.votes} votes</div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))

  const handleSelected = () => 
    setSelected(Math.floor(Math.random() * anecdotes.length))

  const handleVoted = () => {  
    const copy = [...points]
    copy[selected] +=1
    setPoints(copy)
  }
  
  return (
    <div>
      <Title text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button handleClick={handleVoted} text="vote" />
      <Button handleClick={handleSelected} text="next anecdote" />
      <Title text="Anecdote with most votes" />
      <Anecdote anecdote={anecdotes[points.indexOf(Math.max(...points))]} votes={Math.max(...points)} />

    </div>
  )
}

export default App