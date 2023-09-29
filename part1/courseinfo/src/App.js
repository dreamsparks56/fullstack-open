const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  const Header = (props) => {
    return (
      <h1>
      {props.title}
      </h1>
    )
  }

  const Content = (props) => {
    return (
      <div>
        {props.parts.map(part => <Part name = {part.name} exercises = {part.exercises}/>)}
      </div>
    )
  }

  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>
    )
  }

  const Total = (props) => {
    return (
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    )
  }
  return (
    <div>
      <Header title={course} />
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App
