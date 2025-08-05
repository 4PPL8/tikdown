import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">About TikDown</h1>
          <p className="text-lg opacity-80">A simple tool to download TikTok videos without watermark</p>
        </div>
        
        <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-accent">How to use</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>Copy the link of the TikTok video you want to download</li>
            <li>Paste the link in the input box on the home page</li>
            <li>Click the "Get Video" button</li>
            <li>Wait for the video to load and preview</li>
            <li>Click the "Download" button to save the video</li>
          </ol>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-accent">Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Download TikTok videos without watermark</li>
            <li>Preview videos before downloading</li>
            <li>Fast and reliable downloads</li>
            <li>Simple and intuitive interface</li>
            <li>No registration required</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-accent">Disclaimer</h2>
          <p className="opacity-80">
            TikDown is designed for personal use only. Please respect copyright and intellectual property rights.
            We do not store any videos on our servers. This tool simply helps users download content for personal viewing.
            Always make sure you have the right to download and use the content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;