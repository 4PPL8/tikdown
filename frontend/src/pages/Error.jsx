import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl font-bold mb-6 text-accent">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-lg mb-8 opacity-80">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="bg-accent text-black font-medium px-6 py-3 rounded-md hover:bg-opacity-80 transition-all inline-block"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;