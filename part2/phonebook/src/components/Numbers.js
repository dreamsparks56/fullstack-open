import Person from './Person'

const Numbers = ({ persons }) =>
    <>
      {persons.map(person => <Person key={person.name} name={person.name} />)}
    </>

export default Numbers