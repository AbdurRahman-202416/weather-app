// src/App.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import WeatherForm from './components/WeatherForm'

import ForecastChart from './components/ForecastChart'
import CityInfo from './components/CityInfo'
import DisplayWeather from './components/DisplayWeather'
function App () {
  const [city, setCity] = useState('Dhaka')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [error, setError] = useState('')
  const [loader, setLoader] = useState(false)

  const apiKey = import.meta.env.VITE_API_KEY

  const getWeather = async () => {
    setError('')
    try {
      // Fetch current weather data
      const weatherResponse = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            q: city,
            appid: apiKey,
            units: 'metric'
          }
        }
      )
      setWeather(weatherResponse.data)

      // Fetch forecast data (includes city details)
      const forecastResponse = await axios.get(
        'https://api.openweathermap.org/data/2.5/forecast',
        {
          params: {
            q: city,
            appid: apiKey,
            units: 'metric'
          }
        }
      )
      setForecast(forecastResponse.data)
    } catch (err) {
      console.error(err)
      setError('Error fetching weather data')
      setWeather(null)
      setForecast(null)
    }
  }

  // Fetch initial weather for default city
  useEffect(() => {
    getWeather()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    if (city.trim() !== '') {
      getWeather()
    }
  }
  axios.interceptors.request.use(
    config => {
      setLoader(true)
      return config
    },
    error => {
      setLoader(false)
      return Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    response => {
      setLoader(false)
      return response
    },
    error => {
      setLoader(false)
      return Promise.reject(error)
    }
  )

  return (
    <div className='min-h-screen  p-4'>
      <div className='w-full sm:max-w-[80%] mx-auto bg-transparent backdrop-filter backdrop-blur-3xl  shadow-lg rounded-lg p-6'>
        <h1 className='text-3xl font-bold mb-4 text-center'>Weather App</h1>
        <WeatherForm
          city={city}
          setCity={setCity}
          handleSubmit={handleSubmit}
        />
        {error && (
          <p className='text-red-600 font-semibold  max-w-sm mx-auto'>
            {error} ! Try Again
          </p>
        )}
        <DisplayWeather weather={weather} />
        {/* Display additional city data if available */}
        {forecast && forecast.city && <CityInfo cityInfo={forecast.city} />}
        <ForecastChart forecast={forecast} />
        {/* Loader Overlay */}
        {loader && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50'>
            <div className='p-6 rounded-lg shadow-lg flex flex-col items-center'>
              <div className='flex gap-2 mb-3'>
                <div className='w-4 sm:h-8 sm:w-8  h-4 bg-blue-800 rounded-full animate-bounce'></div>
                <div className='w-4 sm:h-8 sm:w-8  h-4 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='w-4  sm:h-8 sm:w-8 h-4 bg-red-500 rounded-full animate-bounce [animation-delay:-0.5s]'></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
