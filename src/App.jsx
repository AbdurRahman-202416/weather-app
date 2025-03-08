
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import WeatherForm from './components/WeatherForm'
import ForecastChart from './components/ForecastChart'
import CityInfo from './components/CityInfo'
import DisplayWeather from './components/DisplayWeather'

function App () {
  // State variables to store city, weather data, forecast data, errors, and loader status
  const [city, setCity] = useState('Dhaka') // Default city is Dhaka
  const [weather, setWeather] = useState(null) // Current weather data
  const [forecast, setForecast] = useState(null) // 5-day forecast data
  const [error, setError] = useState('') // To store error messages if any
  const [loader, setLoader] = useState(false) // To control loading indicator visibility

  // API Key for OpenWeather API (using environment variable for security)
  const apiKey = import.meta.env.VITE_API_KEY

  // Function to fetch weather and forecast data from OpenWeather API
  const getWeather = async () => {
    setError('') // Clear any previous error
    try {
      // Fetch current weather data based on the city
      const weatherResponse = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            q: city,
            appid: apiKey,
            units: 'metric' // Set temperature units to Celsius
          }
        }
      )
      setWeather(weatherResponse.data) // Store current weather data

      // Fetch forecast data (5-day forecast) based on the city
      const forecastResponse = await axios.get(
        'https://api.openweathermap.org/data/2.5/forecast',
        {
          params: {
            q: city,
            appid: apiKey,
            units: 'metric' // Set temperature units to Celsius
          }
        }
      )
      setForecast(forecastResponse.data) // Store forecast data
    } catch (err) {
      console.error(err) // Log any errors
      setError('Error fetching weather data') // Display error message
      setWeather(null) // Reset weather data
      setForecast(null) // Reset forecast data
    }
  }

  // useEffect to fetch weather data when the component mounts (initial page load)
  useEffect(() => {
    getWeather() // Fetch initial weather for the default city
  }, []) // Empty dependency array means this runs only once when the component is mounted

  // Handle form submission to fetch weather data for the input city
  const handleSubmit = e => {
    e.preventDefault() // Prevent default form submission
    if (city.trim() !== '') { // Check if city is not empty
      getWeather() // Fetch weather data for the entered city
    }
  }

  // Axios interceptors to manage loader visibility during API requests
  axios.interceptors.request.use(
    config => {
      setLoader(true) // Show loader before the request is sent
      return config
    },
    error => {
      setLoader(false) // Hide loader if there is an error with the request
      return Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    response => {
      setLoader(false) // Hide loader when a response is received
      return response
    },
    error => {
      setLoader(false) // Hide loader if there is an error with the response
      return Promise.reject(error)
    }
  )

  return (
    <div className='min-h-screen p-4'>
      <div className='w-full sm:max-w-[80%] mx-auto bg-transparent backdrop-filter backdrop-blur-3xl shadow-lg rounded-lg p-6'>
        <h1 className='text-3xl border font-bold mb-4 text-center'>Weather App</h1>
        {/* Weather search form */}
        <WeatherForm
          city={city}
          setCity={setCity}
          handleSubmit={handleSubmit}
        />
        {/* Show error message if there is an error */}
        {error && (
          <p className='text-red-600 font-semibold max-w-sm mx-auto'>
            {error} ! Try Again
          </p>
        )}

        {/* Display the current weather information */}

        <DisplayWeather weather={weather} />

        {/* Display additional city data if available from the forecast */}

        {forecast && forecast.city && <CityInfo cityInfo={forecast.city} />}

        {/* Display forecast chart if forecast data is available */}

        <ForecastChart forecast={forecast} />

        
        {/* Show loader overlay while waiting for API responses */}
        {loader && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50'>
            <div className='p-6 rounded-lg shadow-lg flex flex-col items-center'>
              <div className='flex gap-2 mb-3'>
                {/* Bouncing loader balls */}
                <div className='w-4 sm:h-8 sm:w-8 h-4 bg-blue-800 rounded-full animate-bounce'></div>
                <div className='w-4 sm:h-8 sm:w-8 h-4 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='w-4 sm:h-8 sm:w-8 h-4 bg-red-500 rounded-full animate-bounce [animation-delay:-0.5s]'></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
