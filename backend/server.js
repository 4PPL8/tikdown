// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Create downloads directory if it doesn't exist
const downloadsDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

// API endpoint for downloading TikTok videos
app.post('/api/download', async (req, res) => {
  try {
    const { url } = req.body;
    
    console.log('Received download request for URL:', url);
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
    
    // Validate TikTok URL
    const tiktokRegex = /^(https?:\/\/)?(www\.|vm\.)?tiktok\.com\/.+/i;
    if (!tiktokRegex.test(url)) {
      return res.status(400).json({ error: 'Invalid TikTok URL' });
    }
    
    // Generate a unique filename
    const timestamp = Date.now();
    const videoId = url.split('/').pop().split('?')[0];
    const filename = `tiktok_${videoId}_${timestamp}`;
    const outputPath = path.join(downloadsDir, filename);
    
    console.log('Generated output path:', outputPath);
    
    // Use child_process.spawn instead of python-shell
    const pythonScript = path.join(__dirname, 'scripts', 'download.py');
    
    console.log('Starting Python script:', pythonScript);
    console.log('With arguments:', [url, outputPath]);
    
    // Send an initial response to prevent timeout
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Transfer-Encoding': 'chunked'
    });
    
    // Run the Python script using spawn
    const pythonProcess = spawn('python', [pythonScript, url, outputPath]);
    
    let scriptOutput = '';
    let scriptError = '';
    
    // Collect data from stdout
    pythonProcess.stdout.on('data', (data) => {
      console.log('Python stdout:', data.toString());
      scriptOutput += data.toString();
    });
    
    // Collect data from stderr
    pythonProcess.stderr.on('data', (data) => {
      console.error('Python stderr:', data.toString());
      scriptError += data.toString();
    });
    
    // Handle script completion
    pythonProcess.on('close', (code) => {
      console.log(`Python script exited with code ${code}`);
      
      if (code !== 0) {
        console.error('Python script error:', scriptError);
        res.write(JSON.stringify({ error: 'Failed to download video: ' + scriptError }));
        return res.end();
      }
      
      try {
        // Parse the JSON output from the Python script
        const result = JSON.parse(scriptOutput);
        
        // Check if the result contains an error
        if (result.error) {
          console.error('Python script returned error:', result.error);
          res.write(JSON.stringify({ error: result.error }));
          return res.end();
        }
        
        // Verify the file exists
        const videoFilePath = `${outputPath}.mp4`;
        if (!fs.existsSync(videoFilePath)) {
          console.error('Video file not found at path:', videoFilePath);
          res.write(JSON.stringify({ error: 'Video file not created' }));
          return res.end();
        }
        
        console.log('Video successfully downloaded to:', videoFilePath);
        
        // Send the response
        const responseData = {
          title: result.title,
          author: result.author,
          duration: result.duration,
          thumbnail: result.thumbnail,
          videoUrl: `/api/video/${filename}.mp4`, // For preview
          downloadUrl: `/api/download/${filename}.mp4` // For download
        };
        
        console.log('Sending response:', JSON.stringify(responseData));
        res.write(JSON.stringify(responseData));
        res.end();
      } catch (error) {
        console.error('Error parsing Python script output:', error);
        res.write(JSON.stringify({ error: 'Failed to parse script output: ' + error.message }));
        res.end();
      }
    });
    
    // Handle script errors
    pythonProcess.on('error', (error) => {
      console.error('Failed to start Python script:', error);
      res.write(JSON.stringify({ error: 'Failed to start Python script: ' + error.message }));
      res.end();
    });
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve video files for preview
app.get('/api/video/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(downloadsDir, filename);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Video not found' });
  }
  
  // Stream the video
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;
  
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    });
    
    file.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    });
    
    fs.createReadStream(filePath).pipe(res);
  }
});

// Download endpoint
app.get('/api/download/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(downloadsDir, filename);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Video not found' });
  }
  
  // Set headers for download
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-Type', 'video/mp4');
  
  // Stream the file
  fs.createReadStream(filePath).pipe(res);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});