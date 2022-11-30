import React, { useMemo, useState } from "react";

// interface Weather{
//     weather_icons: object | null
//     weather_descriptions: object | null
// }

// interface Location{
//     name: string | null
//     country: string | null;
// }

const WeatherWidget = ({city} : {city:string}) => {

    const [weather, setWeather] = useState(null)
    const [location, setLocation] = useState(null)
    
    const getCurrentWeather = async () => {
        const response = await fetch(`http://api.weatherstack.com/current?access_key=${import.meta.env.VITE_MAP_API_KEY}&query=${city}`)
        const result = await response.json()
        setWeather(result.current)
        setLocation(result.location)
    }

    useMemo(() => {
        getCurrentWeather()
    }, [city])

    return (
        weather && <div className="weather">
            <div className="location paragraph--2">
                <div className="city">{location.name}</div>
                <div className="country">{location.country}</div>
            </div>
            <div className="temperature">
                {weather.temperature}&deg;C
            </div>
            <div>
                <div className="icon">
                    <img src={weather.weather_icons[0]} alt={weather.description} />
                </div>
                <div className="description paragraph--1">
                    {weather.weather_descriptions[0]}
                </div>
            </div>
        </div>
    )
}

export default WeatherWidget