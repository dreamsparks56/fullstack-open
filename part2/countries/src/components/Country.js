import CountryWeather from './CountryWeather'

const Country = ({ country }) =>
  <>
    <h1>{country.name.official}</h1>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <h4>languages:</h4>
    <ul>
      {Object.values(country.languages).map((value, index) => <li key={index}>{value}</li>)}
    </ul>
    <img  width="150px" src={country.flags.svg} alt={`flag of ${country.name}`}/>
    <CountryWeather city={country.capital} country={country.cca3}/>
  </>


export default Country
