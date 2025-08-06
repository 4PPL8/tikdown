import React from 'react';

const VideoPreview = ({ videoData }) => {
  if (!videoData) return null;

  // Get the full URL by combining the base URL with the relative path
  const baseUrl = process.env.REACT_APP_BACKEND_URL || '';
  // Ensure videoUrl is properly formatted with the backend URL
  const fullVideoUrl = videoData.videoUrl.startsWith('http') ? videoData.videoUrl : `${baseUrl}${videoData.videoUrl}`;

  return (
    <div className="bg-gray-900 bg-opacity-50 rounded-lg overflow-hidden shadow-lg mb-6">
      <div className="aspect-w-9 aspect-h-16 max-h-[70vh] overflow-hidden">
        {/* Video preview with full URL */}
        <video 
          src={fullVideoUrl} 
          controls 
          className="w-full h-full object-contain"
          poster={videoData.thumbnail}
        >
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{videoData.title}</h3>
        <div className="flex items-center text-sm opacity-80">
          <span>@{videoData.author}</span>
          <span className="mx-2">•</span>
          <span>{videoData.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;