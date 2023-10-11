import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    const existingPerson = persons.find(person => person.name === newName)
    existingPerson === undefined ?
      personService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      }) :
        updatePerson(existingPerson.id, person)

      setNewName('')
      setNewNumber('')
  }

  const updatePerson = (id, newPerson) => {
    if(window.confirm(`${newName} is already added to phonebook. Do you want to replace the old number with a new one?`)) {
      personService
      .update(id, newPerson).then(returnedPerson => {
        setPersons(persons.map(note => note.id !== id ? note : returnedPerson))
      })

    }
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (person !== undefined) {
      if(window.confirm(`Delete ${person.name}?`)) {
        personService
        .remove(id)
        .then(data => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(
            `there was an error deleting ${person.name}`
          )
        })
      }
    }
    
  }

  const personsToShow = persons.length > 0 ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : []

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      {persons.length > 0 ? <Persons persons={personsToShow} handleDelete={deletePerson} /> : <div>No data available</div>}
    </div>
  )
}

export default App
