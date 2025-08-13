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

1. **Step-by-Step Deployment Guide**

   **Option 1: Using render.yaml (Recommended)**
   - Create an account on [Render](https://render.com) if you don't have one
   - Push your code to GitHub including the `render.yaml` file
   - In Render dashboard, click on "Blueprint" and select your repository
   - Render will automatically configure the service based on the render.yaml file
   - Review the settings and click "Apply"

   **Option 2: Manual Configuration**
   - Create an account on [Render](https://render.com) if you don't have one
   - Click on "New +" and select "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - Name: Choose a name for your service (e.g., "tikdown-backend")
     - Region: Select a region close to your users
     - Branch: main (or your branch name)
     - Runtime: Python 3.10+
     - Build Command: `pip install -r requirements.txt`
     - Start Command: `uvicorn app:app --host 0.0.0.0 --port 10000`
     - Plan: Free (or select a paid plan for better performance)

2. **Environment Variables**
   - After creating the service, go to the "Environment" tab
   - Add the following environment variable:
     - `FRONTEND_URL`: The URL of your Netlify frontend (e.g., `https://tikdown.netlify.app`)

3. **Dependencies**
   - The requirements.txt file includes all necessary dependencies including:
     - FastAPI
     - Uvicorn
     - yt-dlp
     - Other required packages
   - Render will automatically install these dependencies during the build process

## Troubleshooting

### Video Fetching Issues

If you encounter "fetching video" errors when deployed:

1. **Check CORS Configuration**
   - Ensure the backend's CORS settings allow requests from your frontend domain
   - Verify the `FRONTEND_URL` environment variable is correctly set on the backend

2. **API URL Configuration**
   - Ensure the `REACT_APP_BACKEND_URL` in your frontend environment points to your Render backend URL
   - Check that the URL is correctly formatted with no trailing slashes

3. **Python Dependencies**
   - If you encounter issues with yt-dlp, make sure it's properly installed
   - Render automatically installs Python packages from requirements.txt
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