import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState('')

    const api_key = process.env.REACT_APP_API_KEY
    const endpoint = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`
    console.log(endpoint)
    useEffect(() => {
        axios
            .get(endpoint)
            .then(response => {
                setWeather(response.data)
            })
    }, [])
    if (weather === '') {
        return (
            <div>
                Loading...
            </div>
        );
    }
    return (
        <div>
            <h1>Weather in {weather.location.name}</h1>
            <h2>temperature: </h2><p>{weather.current.temperature} Celcius</p>
            <img src={weather.current.weather_icons}></img>
            <h2>wind: </h2><p>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
        </div>
    );

};

export default Weather;