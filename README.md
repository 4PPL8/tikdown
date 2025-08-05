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
- Node.js
- Express
- Python (yt-dlp)

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
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
npm install
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
npm run dev
```

The backend API will be available at http://localhost:5000

### Production Mode

#### Frontend

```bash
cd frontend
npm run build
```

#### Backend

```bash
cd backend
npm start
```

## Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `build`

### Backend Deployment (Railway or Render)

1. Push your code to GitHub
2. Connect your GitHub repository to Railway or Render
3. Configure the build settings:
   - Build Command: `npm install`
   - Start Command: `npm start`

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
FRONTEND_URL=http://localhost:3000
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This application is for personal use only. Please respect copyright and intellectual property rights. We do not store any videos on our servers. This tool simply helps users download content for personal viewing. Always make sure you have the right to download and use the content.