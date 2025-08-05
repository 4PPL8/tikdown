import React, { useState } from 'react';

const LinkInput = ({ onSubmit, setVideoUrl }) => {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateTikTokUrl = (url) => {
    // Basic validation for TikTok URLs
    const regex = /^(https?:\/\/)?(www\.|vm\.)?tiktok\.com\/.+/i;
    return regex.test(url);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsValid(value === '' || validateTikTokUrl(value));
    setVideoUrl(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;

    if (validateTikTokUrl(inputValue)) {
      setIsValid(true);
      onSubmit(inputValue);
    } else {
      setIsValid(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-grow">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Paste TikTok link here..."
            className={`w-full px-4 py-3 rounded-md bg-gray-800 border ${isValid ? 'border-gray-700 focus:border-accent' : 'border-red-500'} focus:outline-none transition-colors`}
          />
          {!isValid && (
            <p className="text-red-500 text-sm mt-1">Please enter a valid TikTok URL</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-accent text-black font-medium px-6 py-3 rounded-md hover:bg-opacity-80 transition-all whitespace-nowrap"
        >
          Get Video
        </button>
      </div>
    </form>
  );
};

export default LinkInput;