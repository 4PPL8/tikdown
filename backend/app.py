from fastapi import FastAPI, HTTPException, Request, Response, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse, FileResponse
from pydantic import BaseModel, validator
import os
import json
import subprocess
import time
import shutil
from pathlib import Path
from typing import Optional, Dict, Any
import re

# Create FastAPI app
app = FastAPI(title="TikDown API", description="API for downloading TikTok videos without watermark")

# Get allowed frontend URL from environment variable
origins = [os.getenv("FRONTEND_URL", "*")]

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create downloads directory if it doesn't exist
downloads_dir = Path(__file__).parent / "downloads"
downloads_dir.mkdir(exist_ok=True)

# Define request model
class DownloadRequest(BaseModel):
    url: str
    
    @validator('url')
    def validate_tiktok_url(cls, v):
        # Validate TikTok URL
        tiktok_regex = re.compile(r'^(https?:\/\/)?(www\.|vm\.)?tiktok\.com\/.+', re.IGNORECASE)
        if not tiktok_regex.match(v):
            raise ValueError('Invalid TikTok URL')
        return v

# Define response model
class DownloadResponse(BaseModel):
    title: str
    author: str
    duration: str
    thumbnail: str
    videoUrl: str
    downloadUrl: str

# Define error response model
class ErrorResponse(BaseModel):
    error: str

# Helper function to download TikTok video
def download_tiktok(url: str, output_path: str) -> Dict[str, Any]:
    """
    Download TikTok video without watermark using yt-dlp
    """
    try:
        # First, get video info
        info_command = [
            'yt-dlp',
            '--dump-json',
            '--no-playlist',
            url
        ]
        
        # Run the command to get video info with a timeout
        info_process = subprocess.run(info_command, capture_output=True, text=True, timeout=30)
        
        if info_process.returncode != 0:
            raise Exception(f"Error getting video info: {info_process.stderr}")
        
        # Parse the JSON output
        video_info = json.loads(info_process.stdout)
        
        # Extract relevant information
        title = video_info.get('title', 'TikTok Video')
        author = video_info.get('uploader', 'Unknown')
        duration = video_info.get('duration', 0)
        thumbnail = video_info.get('thumbnail', '')
        
        # Format duration as MM:SS
        duration_formatted = f"{int(duration) // 60}:{int(duration) % 60:02d}"
        
        # Download the video without watermark
        download_command = [
            'yt-dlp',
            '--no-playlist',
            '-f', 'best',  # Get the best quality
            '-o', f"{output_path}.mp4",
            url
        ]
        
        # Run the download command with a timeout
        download_process = subprocess.run(download_command, capture_output=True, text=True, timeout=60)
        
        if download_process.returncode != 0:
            raise Exception(f"Error downloading video: {download_process.stderr}")
        
        # Verify the file exists and get its size
        file_path = f"{output_path}.mp4"
        if not os.path.exists(file_path):
            raise Exception(f"File not found at {file_path}")
        
        # Return the video information
        result = {
            'title': title,
            'author': author,
            'duration': duration_formatted,
            'thumbnail': thumbnail,
            'file_path': f"{output_path}.mp4"
        }
        
        return result
    
    except subprocess.TimeoutExpired:
        return {'error': f"Timeout error: The download process took too long to complete. Please try again with a different video."}
    except Exception as e:
        return {'error': str(e)}

# API endpoint for downloading TikTok videos
@app.post("/api/download", response_model=DownloadResponse, responses={400: {"model": ErrorResponse}, 500: {"model": ErrorResponse}})
async def download_video(request: DownloadRequest, background_tasks: BackgroundTasks):
    try:
        url = request.url
        
        print(f"Received download request for URL: {url}")
        
        # Generate a unique filename
        timestamp = int(time.time())
        video_id = url.split('/')[-1].split('?')[0]
        filename = f"tiktok_{video_id}_{timestamp}"
        output_path = str(downloads_dir / filename)
        
        print(f"Generated output path: {output_path}")
        
        # Download the video
        result = download_tiktok(url, output_path)
        
        # Check if the result contains an error
        if 'error' in result:
            print(f"Download error: {result['error']}")
            raise HTTPException(status_code=400, detail=result['error'])
        
        # Verify the file exists
        video_file_path = f"{output_path}.mp4"
        if not os.path.exists(video_file_path):
            print(f"Video file not found at path: {video_file_path}")
            raise HTTPException(status_code=500, detail="Video file not created")
        
        print(f"Video successfully downloaded to: {video_file_path}")
        
        # Prepare the response
        response_data = {
            "title": result["title"],
            "author": result["author"],
            "duration": result["duration"],
            "thumbnail": result["thumbnail"],
            "videoUrl": f"/api/video/{filename}.mp4",  # For preview
            "downloadUrl": f"/api/download/{filename}.mp4"  # For download
        }
        
        return response_data
    
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Server error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

# Serve video files for preview
@app.get("/api/video/{filename}")
async def get_video(filename: str):
    file_path = downloads_dir / filename
    
    # Check if file exists
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Video not found")
    
    # Return the video file for streaming
    def iterfile():
        with open(file_path, mode="rb") as file_like:
            yield from file_like
    
    return StreamingResponse(iterfile(), media_type="video/mp4")

# Download endpoint
@app.get("/api/download/{filename}")
async def download_file(filename: str):
    file_path = downloads_dir / filename
    
    # Check if file exists
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Video not found")
    
    # Return the file as an attachment
    return FileResponse(
        path=file_path,
        filename=filename,
        media_type="video/mp4"
    )

# Root endpoint
@app.get("/")
def home():
    return {"message": "TikDown API is running!"}

# Run the application with uvicorn when script is executed directly
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 10000))
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)