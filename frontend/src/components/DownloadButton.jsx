import React from 'react';

const DownloadButton = ({ videoData }) => {
  if (!videoData) return null;

  const handleDownload = () => {
    // Get the full URL by combining the base URL with the relative path
    const baseUrl = window.location.origin.replace('3000', '5000'); // Replace frontend port with backend port
    const fullDownloadUrl = `${baseUrl}${videoData.downloadUrl}`;
    
    console.log('Download URL:', fullDownloadUrl);
    
    // Create an anchor element and trigger a direct download
    const link = document.createElement('a');
    link.href = fullDownloadUrl;
    link.download = `tiktok_video_${Date.now()}.mp4`; // Set a filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="text-center">
      <button
        onClick={handleDownload}
        className="bg-accent text-black font-medium px-8 py-3 rounded-md hover:bg-opacity-80 transition-all inline-flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Video
      </button>
      <p className="text-sm mt-3 opacity-70">No watermark • MP4 format</p>
    </div>
  );
};

export default DownloadButton;