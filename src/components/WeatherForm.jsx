import React from 'react'

function WeatherForm ({ city, setCity, handleSubmit }) {
  return (
    <div>
      {/* Header indicating that the user should enter a city name */}
      <h1
        htmlFor='city'
        className='text-white py-2 mb-1 text-center mx-auto font-semibold'
      >
        Enter city name
      </h1>
      
      {/* Form to handle user input for city search */}
      <form
        onSubmit={handleSubmit} // Trigger the handleSubmit function on form submission
        className='flex mx-auto max-w-md gap-2 mb-4'
      >
        {/* Input field for entering the city name */}
        <input
          type='text'
          id='city' // ID for the input field
          placeholder='Enter city name' // Placeholder text when the field is empty
          value={city} // Bind the input value to the 'city' state
          onChange={e => setCity(e.target.value)} // Update the 'city' state when the user types
          className='flex-1 p-2 mx-auto border border-gray-300 rounded' // Tailwind CSS classes for styling
        />
        
        {/* Submit button with a search icon */}
        <button
          type='submit' // Trigger form submission
          className='bg-indigo-800 text-white shadow-2xl border-b border-gray-50 px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2'
        >
          {/* Search icon using SVG */}
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
              d='M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35' // Path for the magnifying glass icon
            />
          </svg>
          Search {/* Button label */}
        </button>
      </form>
    </div>
  )
}

export default WeatherForm
