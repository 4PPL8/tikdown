# Fly.io Deployment Guide for TikDown

## Prerequisites

- [Fly.io account](https://fly.io/app/sign-up)
- [Fly CLI installed](https://fly.io/docs/hands-on/install-flyctl/)
- Docker installed on your local machine (for local testing)

## Deployment Steps

### 1. Login to Fly.io

Open your terminal and run:

```bash
fly auth login
```

Follow the prompts to log in to your Fly.io account.

### 2. Initialize the Application (First-time only)

If you're deploying for the first time, you can use the provided `fly.toml` and `Dockerfile` in this repository. If you want to start fresh, you can run:

```bash
fly launch
```

This will guide you through creating a new app on Fly.io. When prompted:
- Choose a unique app name
- Select the region closest to your users
- Skip PostgreSQL and Redis setup unless you need them
- Choose to deploy now or later (you can choose later if you want to make changes first)

### 3. Set Environment Variables

Set the required environment variables for your application:

```bash
fly secrets set FRONTEND_URL=https://your-frontend-url.com
```

Replace `https://your-frontend-url.com` with your actual frontend URL (e.g., your Netlify URL).

### 4. Deploy the Application

Deploy your application to Fly.io:

```bash
fly deploy
```

This command will:
1. Build a Docker image using the Dockerfile
2. Push the image to Fly.io's registry
3. Deploy the application

### 5. Check Deployment Status

Check the status of your deployment:

```bash
fly status
```

View the application logs:

```bash
fly logs
```

### 6. Open the Application

Open your deployed application in a browser:

```bash
fly open
```

This will open the URL of your deployed application.

## Connecting Frontend to Backend

If you're deploying the frontend separately (e.g., on Netlify):

1. Get the URL of your Fly.io-deployed backend (e.g., `https://tikdown.fly.dev`)
2. Set the `REACT_APP_BACKEND_URL` environment variable in your frontend deployment to point to your Fly.io backend URL
3. Redeploy your frontend

## Scaling

To scale your application on Fly.io:

```bash
fly scale count 2  # Scale to 2 instances
```

## Troubleshooting

### Python/yt-dlp Issues

If you encounter issues with Python or yt-dlp:

1. Check the application logs: `fly logs`
2. Verify that the Python virtual environment is correctly set up in the Dockerfile
3. Ensure yt-dlp is installed in the virtual environment

### CORS Issues

If you encounter CORS errors:

1. Verify that the `FRONTEND_URL` environment variable is correctly set
2. Check that the CORS configuration in `server.js` is correctly using the `FRONTEND_URL` environment variable

### Deployment Failures

If deployment fails:

1. Check the deployment logs: `fly logs`
2. Verify that the Dockerfile is correctly configured
3. Ensure all required environment variables are set

## Additional Resources

- [Fly.io Documentation](https://fly.io/docs/)
- [Fly.io Pricing](https://fly.io/docs/about/pricing/)
- [Fly.io Support](https://community.fly.io/)