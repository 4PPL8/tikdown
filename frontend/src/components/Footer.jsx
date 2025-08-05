import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 bg-opacity-50 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold text-accent">TikDown</div>
            <p className="text-sm opacity-70 mt-1">Download TikTok videos without watermark</p>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-sm hover:text-accent transition-colors">Home</Link>
            <Link to="/about" className="text-sm hover:text-accent transition-colors">About</Link>
            <a href="#" className="text-sm hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="text-sm hover:text-accent transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-sm opacity-70">
          <p>© {new Date().getFullYear()} TikDown. All rights reserved.</p>
          <p className="mt-1">This service is for personal use only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;