const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

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
        <Part part={part1} exercise={exercises1} />
        <Part part={part2} exercise={exercises2} />
        <Part part={part3} exercise={exercises3} />
      </div>
    )
  }

  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercise}
      </p>
    )
  }

  const Total = () => {
    return (
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    )
  }
  return (
    <div>
      <Header title={course} />
      <Content />
      <Total />
    </div>
  )
}

export default App
