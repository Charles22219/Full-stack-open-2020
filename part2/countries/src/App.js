import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleShowClick = (countryName) => {
    setFilter(countryName)
  }
  

  return (
    <div>
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} filter={filter} handleShowClick={handleShowClick} />
    </div>
  );
};

export default App;