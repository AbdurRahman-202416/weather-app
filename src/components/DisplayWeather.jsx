import React from 'react';

function DisplayWeather({ weather }) {
  if (!weather) return null; // If no weather data, return null to render nothing.

  return (
    <div className='mb-4'>
      {/* Display city name and country */}
      <h2 className='text-xl font-semibold'>
        {weather.name}, {weather.sys.country}
      </h2>
      
      {/* Display temperature */}
      <p className='text-lg'>Temperature: {weather.main.temp} °C</p>
      
      {/* Display weather condition */}
      <p className='text-lg'>
        Condition: {weather.weather[0].description}
      </p>
    </div>
  );
}

export default DisplayWeather;
