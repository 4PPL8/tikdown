# Deployment Guide for TikDown

## Environment Setup

### Frontend (Netlify)

1. **Environment Variables**
   - Make sure to set the following environment variable in your Netlify site settings:
     - `REACT_APP_BACKEND_URL`: The URL of your backend API (e.g., `https://tikdown-backend.onrender.com`)

2. **Build Settings**
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/build`
   - Node.js version: 18.14.0 (as specified in netlify.toml)

3. **Redirects**
   - The netlify.toml file already includes the necessary redirect rule for client-side routing:
     ```
     [[redirects]]
       from = "/*"
       to = "/index.html"
       status = 200
     ```

### Backend (Render.com)

1. **Environment Variables**
   - Set the following environment variables in your Render.com dashboard:
     - `PORT`: The port your server will run on (usually set automatically by Render)
     - `FRONTEND_URL`: The URL of your Netlify frontend (e.g., `https://tikdown.netlify.app`)

2. **Build Settings**
   - Build command: `npm install`
   - Start command: `npm start`

3. **Dependencies**
   - Make sure Python and yt-dlp are available in the environment
   - You may need to add a build script to install Python dependencies

## Troubleshooting

### Video Fetching Issues

If you encounter "fetching video" errors when deployed:

1. **Check CORS Configuration**
   - Ensure the backend's CORS settings allow requests from your frontend domain
   - Verify the `FRONTEND_URL` environment variable is correctly set on the backend

2. **API URL Configuration**
   - Confirm the `REACT_APP_BACKEND_URL` is correctly set in Netlify environment variables
   - The URL should not have a trailing slash (e.g., use `https://tikdown-backend.onrender.com` not `https://tikdown-backend.onrender.com/`)

3. **Network Requests**
   - Use browser developer tools to inspect network requests and responses
   - Look for CORS errors or failed API calls in the console

4. **Backend Logs**
   - Check the backend logs in Render.com for any errors during video processing
   - Ensure the Python script is executing correctly in the production environment

## Testing Deployment

Before finalizing deployment:

1. Test the complete flow from entering a TikTok URL to downloading the video
2. Verify that videos can be previewed correctly
3. Confirm that downloads work as expected
4. Test on different browsers and devices to ensure compatibility