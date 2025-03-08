// src/components/CityInfo.jsx
import React, { useEffect, useState } from 'react'

function CityInfo ({ cityInfo }) {
  const [localTime, setLocalTime] = useState(null)
  if (!cityInfo) return null

  // Update the city's current local time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // Convert current time to UTC
      const utc = now.getTime() + now.getTimezoneOffset() * 60000
      // Calculate the city's local time using the timezone offset from the API (in seconds)
      const cityLocal = new Date(utc + cityInfo.timezone * 1000)
      setLocalTime(cityLocal.toLocaleTimeString())
    }

    updateTime() // Initial update
    const intervalId = setInterval(updateTime, 1000) // Update every second

    return () => clearInterval(intervalId)
  }, [cityInfo])

  // Convert Unix timestamps to local time strings
  const sunrise = new Date(cityInfo.sunrise * 1000).toLocaleTimeString()
  const sunset = new Date(cityInfo.sunset * 1000).toLocaleTimeString()
  const timezoneHours = cityInfo.timezone / 3600
  const formattedTimezone =
    (timezoneHours >= 0 ? '+' : '-') + Math.abs(timezoneHours).toFixed(2)

  return (
    <div className='mb-4 p-4  rounded shadow'>
      <h2 className='text-xl font-bold mb-2'>
        {cityInfo.name}, {cityInfo.country}
      </h2>
      <p>
        <span className='font-semibold'>Population:</span> {cityInfo.population}
      </p>
     
      <p>
        <span className='font-semibold'>Sunrise:</span> {sunrise}
      </p>
      <p>
        <span className='font-semibold'>Sunset:</span> {sunset}
      </p>
      <p>
        <span className='font-semibold'>Timezone:</span> {formattedTimezone}
      </p>
      {localTime && (
        <p>
          <span className='font-semibold'>Current Local Time:</span> {localTime}
        </p>
      )}
    </div>
  )
}

export default CityInfo
