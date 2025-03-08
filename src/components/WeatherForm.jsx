import React from 'react'

function WeatherForm ({ city, setCity, handleSubmit }) {
  return (
    <div>
      <h1
        htmlFor='city'
        className='text-white py-2 mb-1 text-center mx-auto font-semibold'
      >
        Enter city name
      </h1>
      <form
        onSubmit={handleSubmit}
        className='flex mx-auto max-w-md gap-2 mb-4'
      >
        <input
          type='text'
          id='city'
          placeholder='Enter city name'
          value={city}
          onChange={e => setCity(e.target.value)}
          className='flex-1 p-2 mx-auto border border-gray-300 rounded'
        />
        <button
          type='submit'
          className='bg-indigo-800 text-white shadow-2xl border-b border-gray-50 px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            strokeWidth='2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35'
            />
          </svg>
          Search
        </button>
      </form>
    </div>
  )
}

export default WeatherForm
