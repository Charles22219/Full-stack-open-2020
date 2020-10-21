import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import axios from 'axios'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    const nameObject = {
      name: newName,
      number: newNumber
    }
    event.preventDefault()
    if (hasDuplicate()) {
      const id = persons.filter(person => person.name === newName)[0].id
      console.log(id)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(id, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : nameObject))
            setNewName('')
            setNewNumber('')
          }

          )
      };
    }
    else {
      personService.create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(
            {
              content: `Added ${returnedPerson.name}`,
              status: 'success'
            }
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }
  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    personService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setMessage({
          content: `Information of ${person.name} has already been removed from server`,
          status: 'error'
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      }


      )
  }

  const hasDuplicate = () => persons.filter(person => person.name.toLowerCase() === newName.toLowerCase()).length > 0 ? true : false
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App