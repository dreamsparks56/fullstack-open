const Country = ({ country }) =>
  <>
    <h1>{country.name.official}</h1>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <h2>languages:</h2>
    <ul>
      {Object.values(country.languages).map((value, index) => <li key={index}>{value}</li>)}
    </ul>
    <img src={country.flags.svg} alt={`flag of ${country.name}`}/>
  </>


export default Country
