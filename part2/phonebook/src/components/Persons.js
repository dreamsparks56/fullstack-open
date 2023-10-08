import Person from './Person'

const Persons = ({ persons }) =>
  <>
    {persons.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
  </>

export default Persons