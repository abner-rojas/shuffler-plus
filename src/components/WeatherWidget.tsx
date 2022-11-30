import React, { useMemo, useState } from "react";

interface Weather{
    weather_icons: Array<string>
    weather_descriptions: Array<string>
    temperature: string
    description: string
}

interface Location{
    name: string
    country: string
}

const WeatherWidget = ({city} : {city:string}) => {

    const [weather, setWeather] = useState<Weather>()
    const [location, setLocation] = useState<Location>()
    
    const getCurrentWeather = async () => {
        const response = await fetch(`https://api.weatherstack.com/current?access_key=${import.meta.env.VITE_MAP_API_KEY}&query=${city}`)
        const result = await response.json()
        setWeather(result.current)
        setLocation(result.location)
    }

    useMemo(() => {
        getCurrentWeather()
    }, [city])

    return (
        <>
        {weather && <div className="weather">
            <div className="location paragraph--2">
                <div className="city">{location?.name}</div>
                <div className="country">{location?.country}</div>
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
        </div>}
        </>
    )
}

export default WeatherWidget