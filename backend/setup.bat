@echo off
echo Setting up Python environment for TikDown...

:: Check Python version
python --version
if %ERRORLEVEL% neq 0 (
  echo Error: Python is not installed or not in PATH
  exit /b 1
)

:: Create virtual environment if it doesn't exist
if not exist venv (
  echo Creating virtual environment...
  python -m venv venv
  if %ERRORLEVEL% neq 0 (
    echo Error: Failed to create virtual environment
    exit /b 1
  )
)

:: Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat
if %ERRORLEVEL% neq 0 (
  echo Error: Failed to activate virtual environment
  exit /b 1
)

:: Install dependencies
echo Installing dependencies...
pip install -r requirements.txt
if %ERRORLEVEL% neq 0 (
  echo Error: Failed to install dependencies
  exit /b 1
)

echo Setup completed successfully!
echo To activate the virtual environment, run: venv\Scripts\activate.bat
echo To start the server, run: uvicorn app:app --reload