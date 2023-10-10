import { useEffect, useState } from "react";
import Filter from "./components/Filter"
import axios from "axios";
import Countries from "./components/Countries";


function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = countries
    .filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter description="find countries" filter={filter} onChange={handleFilterChange} />
      <Countries countries={countriesToShow} />
    </div>
  );
}

export default App;
