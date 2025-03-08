import React, { useEffect, useState } from 'react';

function CityInfo({ cityInfo }) {
  const [localTime, setLocalTime] = useState(null); // State to store the local time
  if (!cityInfo) return null; // Return null if no city info is provided

  // Update the city's current local time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000; // Convert to UTC
      const cityLocal = new Date(utc + cityInfo.timezone * 1000); // Get city's local time using the timezone offset
      setLocalTime(cityLocal.toLocaleTimeString()); // Update state with formatted time
    };

    updateTime(); // Initial time update
    const intervalId = setInterval(updateTime, 1000); // Set interval to update every second

    return () => clearInterval(intervalId); // Clean up the interval when the component is unmounted
  }, [cityInfo]); // Re-run effect if cityInfo changes

  // Convert Unix timestamps for sunrise and sunset to local time strings
  const sunrise = new Date(cityInfo.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(cityInfo.sunset * 1000).toLocaleTimeString();
  const timezoneHours = cityInfo.timezone / 3600; // Convert timezone offset to hours
  const formattedTimezone = (timezoneHours >= 0 ? '+' : '-') + Math.abs(timezoneHours).toFixed(2); // Format timezone as +/-

  return (
    <div className='mb-4 p-4 rounded shadow'>
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
  );
}

export default CityInfo;
