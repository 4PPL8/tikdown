# Render Deployment Guide for TikDown

This guide provides detailed instructions for deploying the TikDown backend to Render.com.

## Prerequisites

- A [Render.com](https://render.com) account
- Your TikDown project repository on GitHub

## Deployment Options

### Option 1: Using Blueprint (Recommended)

The repository includes a `render.yaml` file that makes deployment easy using Render Blueprints.

1. **Push your code to GitHub**
   - Make sure your repository includes the `render.yaml` file

2. **Create a Blueprint on Render**
   - Log in to your Render dashboard
   - Click on "Blueprints" in the sidebar
   - Click "New Blueprint Instance"
   - Connect your GitHub account if not already connected
   - Select your TikDown repository
   - Render will detect the `render.yaml` file and show the services to be created
   - Update the `FRONTEND_URL` environment variable to match your frontend URL
   - Click "Apply" to create the services

3. **Monitor Deployment**
   - Render will automatically build and deploy your backend service
   - You can monitor the build progress in the Render dashboard
   - Once deployment is complete, you'll get a URL for your backend service

### Option 2: Manual Configuration

1. **Create a Web Service**
   - Log in to your Render dashboard
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository

2. **Configure the Service**
   - Name: Choose a name for your service (e.g., "tikdown-backend")
   - Region: Select a region close to your users
   - Branch: main (or your branch name)
   - Runtime: Python 3.10+
   - Root Directory: backend (if your backend code is in a subdirectory)
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app:app --host 0.0.0.0 --port 10000`
   - Plan: Free (or select a paid plan for better performance)

3. **Set Environment Variables**
   - After creating the service, go to the "Environment" tab
   - Add the following environment variable:
     - `FRONTEND_URL`: The URL of your Netlify frontend (e.g., `https://tikdown.netlify.app`)

4. **Deploy the Service**
   - Click "Create Web Service"
   - Render will automatically build and deploy your backend
   - Once deployment is complete, you'll get a URL for your backend service

## Connecting Frontend to Backend

After deploying your backend to Render, you need to update your frontend to use the new backend URL:

1. **Get Your Backend URL**
   - From your Render dashboard, copy the URL of your deployed backend service
   - It will look like `https://tikdown-backend.onrender.com`

2. **Update Frontend Environment Variable**
   - In your Netlify dashboard, go to "Site settings" > "Environment variables"
   - Add or update the `REACT_APP_BACKEND_URL` variable with your Render backend URL
   - Make sure there is no trailing slash in the URL

3. **Redeploy Frontend**
   - Trigger a new deployment of your frontend on Netlify
   - This will ensure the frontend uses the new backend URL

## Troubleshooting

### CORS Issues

If you encounter CORS errors:

1. Verify that the `FRONTEND_URL` environment variable on Render is set correctly
2. Make sure the URL matches exactly with your Netlify frontend URL
3. Check that there are no trailing slashes in the URLs

### Python Dependencies

If you encounter issues with Python dependencies:

1. Check the build logs in your Render dashboard
2. Ensure that your `requirements.txt` file includes all necessary dependencies
3. If yt-dlp is not working, you can try running the setup script manually:
   ```bash
   python backend/setup.py
   ```

### Connection Issues

If your frontend cannot connect to the backend:

1. Verify that the `REACT_APP_BACKEND_URL` in your frontend environment points to your Render backend URL
2. Check that the URL is correctly formatted with no trailing slashes
3. Test the backend URL directly in a browser to ensure it's responding

## Monitoring and Logs

Render provides built-in monitoring and logging:

1. **View Logs**
   - Go to your Web Service in the Render dashboard
   - Click on the "Logs" tab to view real-time logs

2. **Monitor Performance**
   - The "Metrics" tab shows CPU and memory usage
   - You can set up alerts for high resource usage or errors

## Scaling

If you need to scale your application:

1. Upgrade to a paid plan on Render for more resources
2. Consider using a database service for persistent storage if needed
3. Set up auto-scaling rules based on traffic patterns