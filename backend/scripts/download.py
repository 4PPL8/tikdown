#!/usr/bin/env python3
import sys
import json
import subprocess
import os
import time

def download_tiktok(url, output_path):
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
    
    except subprocess.TimeoutExpired as e:
        return {'error': f"Timeout error: The download process took too long to complete. Please try again with a different video."}
    except Exception as e:
        return {'error': str(e)}

def main():
    """
    Main function to handle command line arguments
    """
    if len(sys.argv) < 3:
        print(json.dumps({'error': 'URL and output path are required'}))
        sys.exit(1)
    
    url = sys.argv[1]
    output_path = sys.argv[2]
    
    result = download_tiktok(url, output_path)
    
    # Print the result as JSON only
    print(json.dumps(result))

if __name__ == "__main__":
    main()