import Person from './Person'

const Numbers = ({ persons }) =>
    <>
      {persons.map(person => <Person key={person.name} name={person.name} number={person.number}/>)}
    </>

export default Numbers