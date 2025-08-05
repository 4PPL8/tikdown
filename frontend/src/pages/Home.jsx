import React, { useState } from 'react';
import LinkInput from '../components/LinkInput';
import VideoPreview from '../components/VideoPreview';
import DownloadButton from '../components/DownloadButton';

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [videoUrl, setVideoUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (url) => {
    if (!url) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // This would be replaced with actual API call
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch video');
      }
      
      const data = await response.json();
      setVideoData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Download TikTok Videos</h1>
          <p className="text-lg opacity-80">Paste a TikTok link to download videos without watermark</p>
        </div>
        
        <LinkInput onSubmit={handleSubmit} setVideoUrl={setVideoUrl} />
        
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto"></div>
            <p className="mt-4">Fetching video...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-900 bg-opacity-30 border border-red-500 text-white p-4 rounded-md my-4">
            <p>{error}</p>
          </div>
        )}
        
        {videoData && !loading && (
          <div className="mt-8 fade-in">
            <VideoPreview videoData={videoData} />
            <DownloadButton videoData={videoData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;