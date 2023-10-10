import CountryList from "./CountryList"
import Country from "./Country"

const Countries = ({ countries }) =>
  <> 
    { countries.length > 10 ? 
        <div>Too many matches, specify another filter</div> :
      countries.length > 1 ?
        <CountryList countries={countries} /> :
      countries.length > 0 ?
        <Country country={countries[0]} /> : 
        <div>No country was found with the given specifications</div>}
  </>

  export default Countries