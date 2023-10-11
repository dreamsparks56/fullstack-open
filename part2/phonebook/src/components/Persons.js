import Person from './Person'

const Persons = ({ persons, handleDelete }) =>
  <>
    {persons.map(person => <Person key={person.name} name={person.name} number={person.number} handleDelete={() => handleDelete(person.id)}/>)}
  </>

export default Persons