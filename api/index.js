import express from 'express';
import dotenv from "dotenv";
import googleTTS from 'google-tts-api';  // Import the Google TTS API
import cookieParser from 'cookie-parser';
import cors from 'cors';
import axios from 'axios'; // For making HTTP requests
import fs from 'fs'; // For managing file system
import path from 'path'; // For handling file paths
import { fileURLToPath } from 'url'; // For converting module URL to file path
import { dirname } from 'path'; // For getting directory name




dotenv.config();

const app = express();

// Get the directory name for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Enable CORS for all origins (you can also restrict to specific origins)
app.use(cors({
    origin: 'http://localhost:5173', // Allow only the frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));

app.use(express.json());
app.use(cookieParser());

// Endpoint to generate sound from text
app.post('/generate-sound', async (req, res) => {
    const { text } = req.body;
  
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
  
    try {
      // Get the Google TTS URL for the requested text
      const url = googleTTS.getAudioUrl(text, {
        lang: 'en',
        slow: false,
        host: 'https://translate.google.com',
      });
  
      // Fetch the audio file using axios
      const audioResponse = await axios.get(url, { responseType: 'arraybuffer' });
  
      // Generate a unique filename
      const audioFileName = `${Date.now()}.mp3`;
      const audioFilePath = path.join(__dirname, 'audio', audioFileName);
  
      // Ensure the 'audio' directory exists
      if (!fs.existsSync(path.join(__dirname, 'audio'))) {
        fs.mkdirSync(path.join(__dirname, 'audio'));
      }
  
      // Save the audio file to the server
      fs.writeFileSync(audioFilePath, audioResponse.data);
  
      // Return the URL of the saved audio file
      res.json({ soundUrl: `http://localhost:3000/audio/${audioFileName}` });
    } catch (err) {
      console.error('Error generating sound:', err);
      res.status(500).json({ error: 'Failed to generate sound' });
    }
  });
  
  // Serve the audio files from the 'audio' folder
  app.use('/audio', express.static(path.join(__dirname, 'audio')));


  app.post('/generate-animal-sound', async (req, res) => {
    const { soundName } = req.body;

    if (!soundName) {
        return res.status(400).json({ error: 'Sound name is required' });
    }

    try {
        // Define Freesound API endpoint and your API key
        const apiKey = "RMl1J0t8lUeLG4ZQz6Zgaghkp8ppEaOQ4b9DMFyA";  // Replace with your Freesound API Key
        const apiUrl = `https://freesound.org/apiv2/search/text/?query=${encodeURIComponent(soundName)}&fields=name,previews&token=${apiKey}`;

        // Fetch the sound data from Freesound API
        const response = await axios.get(apiUrl);

        // Check if any sounds were found
        const sounds = response.data.results;
        if (sounds.length === 0) {
            return res.status(404).json({ error: 'No sound found for the given name' });
        }

        // Get the preview URL for the first matching sound
        const soundUrl = sounds[0].previews["preview-hq-mp3"];

        // Return the sound preview URL
        res.json({ soundUrl });
    } catch (err) {
        console.error('Error fetching sound:', err);
        res.status(500).json({ error: 'Failed to fetch sound from Freesound API' });
    }
});


 









app.listen(3000, () => {
    console.log('Server is running on port 3000');
})








app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
 