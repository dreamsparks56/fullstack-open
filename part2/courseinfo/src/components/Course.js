const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ elements }) =>
  <p>
    <strong>total of {elements.reduce((a, b) => a + b)} exercises</strong>
  </p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(part => <Part key={part.id} part={part}/>)}
  </>

const Course = ({course}) =>
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total elements={course.parts.map(part => part.exercises)} />
  </div>

export default Course
