#!/usr/bin/env python3
import subprocess
import sys
import os

def check_python_version():
    """Check if Python version is 3.6 or higher"""
    if sys.version_info < (3, 6):
        print("Error: Python 3.6 or higher is required.")
        sys.exit(1)

def install_ytdlp():
    """Install yt-dlp if not already installed"""
    try:
        # Check if yt-dlp is already installed
        subprocess.run(["yt-dlp", "--version"], capture_output=True, text=True)
        print("yt-dlp is already installed.")
    except FileNotFoundError:
        print("Installing yt-dlp...")
        try:
            subprocess.run([sys.executable, "-m", "pip", "install", "yt-dlp"], check=True)
            print("yt-dlp installed successfully.")
        except subprocess.CalledProcessError as e:
            print(f"Error installing yt-dlp: {e}")
            sys.exit(1)

def main():
    """Main function"""
    print("Setting up TikDown dependencies...")
    check_python_version()
    install_ytdlp()
    print("Setup completed successfully!")

if __name__ == "__main__":
    main()