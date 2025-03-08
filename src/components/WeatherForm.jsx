
import React from 'react';

function WeatherForm({ city, setCity, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className='flex mx-auto max-w-sm gap-2 mb-4'>
      <input
        type='text'
        placeholder='Enter city name'
        value={city}
        onChange={e => setCity(e.target.value)}
        className='flex-1 p-2 mx-auto  border border-gray-300 rounded'
      />
      <button
        type='submit'
        className='bg-indigo-800 text-white shadow-2xl border-b border-gray-50 px-4 py-2 rounded hover:bg-blue-600'
      >
        Search
      </button>
    </form>
  );
}

export default WeatherForm;
