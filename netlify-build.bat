@echo on

:: This script is used by Netlify to build the frontend

:: Navigate to the frontend directory
cd frontend

:: Install dependencies
npm install

:: Build the frontend
npm run build

:: Return to the root directory
cd ..

:: Print success message
echo Frontend build completed successfully!