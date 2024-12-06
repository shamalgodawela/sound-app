import React, { useState } from 'react';
import axios from 'axios';

function TextToSound() {
  const [text, setText] = useState('');
  const [soundUrl, setSoundUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle the input change
  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError('Please enter some text!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Send a POST request to the backend to generate sound
      const response = await axios.post('http://localhost:3000/generate-sound', { text });

      // Check if the backend returns the soundUrl
      if (response.data.soundUrl) {
        setSoundUrl(response.data.soundUrl);
        setError('');
      } else {
        setError('Failed to generate sound.');
      }
    } catch (err) {
      console.error('Error generating sound:', err);
      setError('Failed to generate sound');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Text-to-Sound Generator</h1>
      <form className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="Enter text to generate sound"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className={`w-full p-3 text-white rounded-md focus:outline-none ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={loading}
        >
          {loading ? 'Generating Sound...' : 'Generate Sound'}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {soundUrl && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-medium mb-2 text-green-600">Sound Generated Successfully!</h3>
          <audio controls className="mx-auto">
            <source src={soundUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <p className="mt-2 text-gray-700">Click the play button above to listen to the sound.</p>
        </div>
      )}
    </div>
  );
}

export default TextToSound;
