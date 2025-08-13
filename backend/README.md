# TikDown Backend

This is the backend API for TikDown, a TikTok video downloader application. It's built with FastAPI and uses yt-dlp to download TikTok videos without watermarks.

## Local Development

### Prerequisites

- Python 3.10 or higher
- pip (Python package manager)

### Setup

1. Create a virtual environment:

```bash
python -m venv venv
```

2. Activate the virtual environment:

- On Windows:
```bash
venv\Scripts\activate
```

- On macOS/Linux:
```bash
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the backend directory with the following content:

```
PORT=10000
FRONTEND_URL=http://localhost:3000
```

5. Run the application:

```bash
uvicorn app:app --reload
```

The API will be available at http://localhost:10000

## API Endpoints

- `GET /`: Home endpoint, returns a message indicating the API is running
- `POST /api/download`: Download a TikTok video
- `GET /api/video/{filename}`: Stream a video for preview
- `GET /api/download/{filename}`: Download a video file

## Deployment to Render

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Configure the service:
   - Name: Choose a name for your service
   - Region: Select a region close to your users
   - Branch: main (or your branch name)
   - Runtime: Python 3.10+
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app:app --host 0.0.0.0 --port 10000`
5. Add environment variables:
   - `FRONTEND_URL`: Your frontend URL (e.g., https://tikdown.netlify.app)
6. Deploy the service

Once deployed, your backend will be available at a URL like `https://your-service-name.onrender.com`

## Environment Variables

- `PORT`: The port on which the server will run (default: 10000)
- `FRONTEND_URL`: The URL of your frontend application for CORS configuration