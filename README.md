# TikDown - TikTok Video Downloader

TikDown is a web application that allows users to download TikTok videos without watermarks. Simply paste a TikTok video link, preview the video, and download it to your device.

## Features

- Download TikTok videos without watermark
- Preview videos before downloading
- Simple and intuitive user interface
- Fast and reliable downloads
- Mobile responsive design

## Tech Stack

### Frontend
- React.js
- TailwindCSS
- React Router

### Backend
- Python (FastAPI)
- yt-dlp

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v16.x recommended for compatibility with Netlify)
- npm or yarn
- Python (v3.6 or higher)
- yt-dlp

### Installing yt-dlp

```bash
# Using pip (Python package manager)
pip install yt-dlp
```

## Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/tikdown.git
cd tikdown
```

### Frontend Setup

```bash
cd frontend
npm install
```

### Backend Setup

```bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
# source venv/bin/activate

pip install -r requirements.txt
```

## Running the Application

### Development Mode

#### Frontend

```bash
cd frontend
npm start
```

The frontend will be available at http://localhost:3000

#### Backend

```bash
cd backend
# Activate virtual environment first if not already activated

# On Windows
# venv\Scripts\activate

# On macOS/Linux
# source venv/bin/activate

uvicorn app:app --reload
```

The backend API will be available at http://localhost:8000

### Production Mode

#### Frontend

```bash
cd frontend
npm run build
```

#### Backend

```bash
cd backend
# Activate virtual environment first if not already activated

# On Windows
# venv\Scripts\activate

# On macOS/Linux
# source venv/bin/activate

uvicorn app:app --host 0.0.0.0 --port 10000
```

## Deployment

### Netlify Deployment

This application is configured for deployment on Netlify using the `netlify.toml` file, which specifies:

- Build command: `npm run build`
- Publish directory: `frontend/build`
- Node.js version: 16.x (for compatibility with Netlify)

**Deployment Instructions:**

1. **Frontend Deployment (Netlify):**
   - Push your code to GitHub
   - Connect your GitHub repository to Netlify
   - Netlify will automatically use the settings in netlify.toml
   - The build command is set to install dependencies and build the frontend
   - The publish directory is set to frontend/build

2. **Backend Deployment (Render):**
   - Push your code to GitHub
   - Create a new Web Service on Render
   - Connect your GitHub repository
   - Configure the service:
     - Name: Choose a name for your service
     - Region: Select a region close to your users
     - Branch: main (or your branch name)
     - Runtime: Python 3.10+
     - Build Command: `pip install -r requirements.txt`
     - Start Command: `uvicorn app:app --host 0.0.0.0 --port 10000`
   - Add environment variables:
     - `FRONTEND_URL`: Your frontend URL (e.g., https://tikdown.netlify.app)

3. **Connect Frontend to Backend:**
   - After deploying the backend, get the URL of your backend API
   - Set the `REACT_APP_BACKEND_URL` environment variable in your Netlify deployment settings to point to your backend URL
   - Alternatively, create a `.env.production` file in the frontend directory with `REACT_APP_BACKEND_URL=https://your-backend-url.com`
   - Redeploy the frontend to apply these changes

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `build`

### Backend Deployment (Render)

See the detailed instructions in the [backend README.md](backend/README.md), [DEPLOYMENT.md](DEPLOYMENT.md), or [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) file for step-by-step instructions on deploying the backend to Render.


## Environment Variables

### Backend Environment Variables
Create a .env file in the backend directory using the provided .env.example template:

```
# Backend server port
PORT=5000

# Frontend URL for CORS configuration
FRONTEND_URL=http://localhost:3000

# Set to 'production' in production environment
NODE_ENV=development
```

### Frontend Environment Variables
Create .env, .env.development, and .env.production files in the frontend directory:

```
# Backend API URL
REACT_APP_BACKEND_URL=http://localhost:5000  # for development
REACT_APP_BACKEND_URL=https://your-backend-url.com  # for production
```

When deploying to a hosting service, make sure to set these environment variables in your hosting platform's dashboard.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This application is for personal use only. Please respect copyright and intellectual property rights. We do not store any videos on our servers. This tool simply helps users download content for personal viewing. Always make sure you have the right to download and use the content.