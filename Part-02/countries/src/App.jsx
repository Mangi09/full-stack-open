import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/allCountries'
import './App.css'


const Filter = ({filterName})=>{
  return (
    <div>
        <span>filter shown with</span>
        <input onChange={filterName}></input>
        <br></br>
      </div>
  )
}
const ShowCountries = ({countryToShow,setSelectedCountry}) => {
    const length = countryToShow.length
    if(length > 1 && length <10){
        return (
            countryToShow.map(country => {
                // console.log(country);
                return(
                    <ContentList key ={country.name.official} country = {country} setSelectedCountry={setSelectedCountry}></ContentList>
                )
        }) 
        )
    }
    else if (length ===1){
        
        return(
            <Contents country ={countryToShow[0]}></Contents>
        )
        
    }
    else if (length>10&&length<30){
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    else {
        return null;
    }
    }
    
const ContentList = ({country,setSelectedCountry})=>{
    console.log(country)
    return (
        <div>
            <span>{country.name.official}</span>
            <button onClick ={()=>setSelectedCountry(country)}>Show</button>
        </div>
    )
}

const Contents = ({country}) => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
    axios
        .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
        )
        .then(response => {
            setWeather(response.data)
        })
}, [country])
    // console.log(country)
    const languages =Object.values(country.languages)
    // console.log(languages);
    const flags =Object.values(country.flags)[0]
    // console.log(flags)
    // console.log(weather.weather[0].icon)
    if(weather === null){return(<div>Loading...</div>)}
    return(
        <div>
            <h2>{country.name.official}</h2>
            <p>Capital - {country.capital}</p>
            <p>Area - {country.area}</p>
            <br>
            </br>
            <h2>Languages</h2>
            <ul>
            {languages.map(language => {
                return(<li key = {language}>{language}</li>)
        }) }
        </ul>
        <img alt ='flag' src ={flags} ></img>
        
        <h2>Weather in {country.capital}</h2>
        <p>
        Temperature - {weather.main.temp} Celcius
        </p>
        <img
    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
    alt="weather icon"
/>
        <p>
    Wind {weather.wind.speed} m/s
</p>
          
        </div>
    )
}
const App = () => {
    const[countries,setCountries] = useState([])
    const[filters, setFilters] = useState('')
    const [selectedCountry, setSelectedCountry] = useState(null)


    useEffect(() => {
        console.log('effect')
        countryService
        .getAll()
        .then(countries => {
            console.log('promise fulfilled')
            setCountries(countries)
            
        }).catch(error => console.log(error))
    }, [])

    const countryToShow = countries.filter(country => 
    country.name.common.toLowerCase().includes(filters.toLowerCase())
  )
//   const show = countryToShow.length > 0
//     ? countryToShow
//     : null
//     console.log(show)    
    const filterName = (event)=>{
        setFilters(event.target.value)
        // console.log(event.target.value)
    }
    //  console.log(countries[0])
    return(
        <div>
        <Filter filterName ={filterName}></Filter>
        <ShowCountries countryToShow={countryToShow} setSelectedCountry={setSelectedCountry}></ShowCountries>
        {selectedCountry !== null && (
    <Contents country={selectedCountry} />
)}
        
        </div>
    )
    }
   

export default App
