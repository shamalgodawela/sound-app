import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [soundName, setSoundName] = useState(''); // State for sound name input
  const [soundUrl, setSoundUrl] = useState(''); // State for the resulting sound URL
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(''); // State for error messages

  // Handle form submit to generate sound
  const handleGenerateSound = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    if (!soundName.trim()) {
      setError('Please enter a sound name');
      return;
    }

    setLoading(true); // Set loading state to true while fetching
    setError(''); // Clear any previous errors
    setSoundUrl(''); // Clear the previous sound URL

    try {
      // Sending the sound name to your backend
      const response = await axios.post('http://localhost:3000/generate-animal-sound', { soundName });
      setSoundUrl(response.data.soundUrl);  // Set the sound URL from the backend response
    } catch (err) {
      setError('Failed to fetch sound');  // Set error message if request fails
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold text-center mb-4">Generate Animal/Environment Sounds</h1>
        <form onSubmit={handleGenerateSound}>
          <div className="mb-4">
            <label htmlFor="soundName" className="block text-sm font-semibold mb-2">Sound Name</label>
            <input
              type="text"
              id="soundName"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter sound name (e.g. lion)"
              value={soundName}
              onChange={(e) => setSoundName(e.target.value)} // Update soundName state on change
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error if exists */}
          <button
            type="submit"
            className={`w-full py-2 bg-blue-500 text-white rounded-md ${loading ? 'opacity-50' : ''}`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Loading...' : 'Generate Sound'} {/* Change button text based on loading state */}
          </button>
        </form>

        {soundUrl && (
         <div className="mt-6 ml-[-20px] text-center">
         <h3 className="text-xl font-medium mb-2 text-green-600">Sound Generated Successfully!</h3>
         <audio controls className="mx-auto">
           <source src={soundUrl} type="audio/mpeg" />
           Your browser does not support the audio element.
         </audio>
         <p className="mt-2 text-gray-700">Click the play button above to listen to the sound.</p>
       </div>
        )}
      </div>
    </div>
  );
}

export default App;
