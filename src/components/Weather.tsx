import { useEffect, useState } from "react";

export default function Weather({city}){

    const [weather, setWeather] = useState()
    const [location, setLocation] = useState()
    
    const getCurrentWeather = async () => {
        console.log("Get Current Weather", {city});
        const response = await fetch(`http://api.weatherstack.com/current?access_key=${import.meta.env.VITE_MAP_API_KEY}&query=${city}`)
        const result = await response.json()
        console.log("Weather", result);
        setWeather(result.current)
        setLocation(result.location)
    }

    useEffect(() => {
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

