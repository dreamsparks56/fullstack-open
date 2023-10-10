import { useState } from "react"
import Country from "./Country"

const CountryListItem = ({ country }) => {
  const [showDescription, setShowDescription] = useState(false)

  const handleClick = () => 
    setShowDescription(!showDescription)

  return(
  <div>    
    {country.name.common} 
    <button onClick={handleClick}>{!showDescription ? "show" : "hide"}</button>
    {showDescription ? <Country country={country} /> : <></>}
  </div>
  )
}
  

  export default CountryListItem