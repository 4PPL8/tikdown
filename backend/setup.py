#!/usr/bin/env python3
import sys
import subprocess
import os

def check_python_version():
    """Check if Python version is 3.6 or higher"""
    if sys.version_info < (3, 6):
        print("Error: Python 3.6 or higher is required.")
        sys.exit(1)
    print(f"Python version: {sys.version}")

def install_yt_dlp():
    """Install yt-dlp if not already installed"""
    try:
        # Try to import yt_dlp to check if it's installed
        import yt_dlp
        print(f"yt-dlp is already installed (version: {yt_dlp.version.__version__})")
    except ImportError:
        print("Installing yt-dlp...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "yt-dlp"])
            print("yt-dlp installed successfully")
        except subprocess.CalledProcessError as e:
            print(f"Error installing yt-dlp: {e}")
            sys.exit(1)

def main():
    """Main function"""
    print("Setting up Python environment for TikDown...")
    check_python_version()
    install_yt_dlp()
    print("Setup completed successfully!")

if __name__ == "__main__":
    main()