
import React from 'react';

function DisplayWeather({ weather }) {
  if (!weather) return null;
  return (
    <div className='mb-4'>
      <h2 className='text-xl font-semibold'>
        {weather.name}, {weather.sys.country}
      </h2>
      <p className='text-lg'>Temperature: {weather.main.temp} °C</p>
      <p className='text-lg'>
        Condition: {weather.weather[0].description}
      </p>
    </div>
  );
}

export default DisplayWeather;
