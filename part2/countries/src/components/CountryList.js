import CountryListItem from "./CountryListItem"

const CountryList = ({ countries }) =>
  <>    
    {countries.map(country => <CountryListItem key={country.cca3} country={country} />)}
  </>

  export default CountryList