import axios from "axios"
import { useEffect, useState } from "react"

const CountryWeather = ({city, country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState([])

  const cityCall = () => {
    axios
      .get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`)
      .then(response => {
        console.log(response)
        setWeather(response.data.current)
        })
      }

  useEffect(cityCall, [])

  

  return(
    <>
      <h2>Weather in {city}</h2>
      <div>temperature {weather.temp_c} Celsius</div>
      <img src={weather.condition.icon} alt={weather.condition.text}></img>
      <div>wind {weather.wind_kph} m/s</div>
      

    </>
  )

}

export default CountryWeather