#!/bin/bash

# Setup script for TikDown backend

echo "Setting up Python environment for TikDown..."

# Check Python version
python_version=$(python3 --version 2>&1)
if [[ $? -ne 0 ]]; then
  echo "Error: Python 3 is not installed or not in PATH"
  exit 1
fi

echo "Using $python_version"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
  echo "Creating virtual environment..."
  python3 -m venv venv
  if [[ $? -ne 0 ]]; then
    echo "Error: Failed to create virtual environment"
    exit 1
  fi
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate
if [[ $? -ne 0 ]]; then
  echo "Error: Failed to activate virtual environment"
  exit 1
fi

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt
if [[ $? -ne 0 ]]; then
  echo "Error: Failed to install dependencies"
  exit 1
fi

echo "Setup completed successfully!"
echo "To activate the virtual environment, run: source venv/bin/activate"
echo "To start the server, run: uvicorn app:app --reload"