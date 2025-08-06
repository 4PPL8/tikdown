# Railway.com Deployment Guide for TikDown

## Prerequisites

- A [Railway.com](https://railway.com) account
- Your TikDown project repository on GitHub

## Deployment Steps

### 1. Connect Your Repository

1. Log in to your Railway dashboard
2. Click on "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your GitHub account if not already connected
5. Find and select your TikDown repository

### 2. Configuration Files

This project includes two important configuration files for Railway deployment:

1. **railway.json** - Defines the basic deployment settings
2. **nixpacks.toml** - Configures the build environment with Python and other dependencies

### 3. Environment Variables

In your Railway dashboard, go to the "Variables" tab and add the following environment variables:

- `PORT`: Railway will automatically assign a port, but you can set a specific one if needed
- `FRONTEND_URL`: The URL of your frontend (if deployed separately)
- `NODE_ENV`: Set to `production`

### 4. Troubleshooting Common Issues

#### Python/pip Not Found

If you encounter errors related to Python or pip not being found, the `nixpacks.toml` file should resolve this by installing Python and pip during the build process.

#### yt-dlp Installation Issues

If yt-dlp fails to install or run:

1. Check the build logs to see if Python was installed correctly
2. Verify that the build process is using Python 3.6 or higher
3. You may need to modify the `nixpacks.toml` file to include additional dependencies

#### Node.js Issues

Railway uses Node.js 14 by default. If your application requires a different version, you can specify it in the `nixpacks.toml` file:

```toml
[phases.setup]
nodeVersion = "16.15.0"
```

### 5. Monitoring Your Deployment

1. After deployment, Railway provides a URL for your application
2. Monitor the logs in the Railway dashboard for any issues
3. Test the API endpoint by making a request to `[YOUR_RAILWAY_URL]/api/download`

### 6. Connecting Frontend to Backend

If you're deploying the frontend separately (e.g., on Netlify):

1. Get the URL of your Railway-deployed backend
2. Set the `REACT_APP_BACKEND_URL` environment variable in your frontend deployment to point to your Railway backend URL

## Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [Nixpacks Documentation](https://nixpacks.com/docs)