import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg opacity-80">How we handle your information</p>
        </div>
        
        <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-accent">Information Collection</h2>
          <p className="mb-4 opacity-80">
            TikDown does not collect any personal information from its users. We do not require registration
            or login to use our service. The only data we process is the TikTok video URL that you provide
            for downloading purposes.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-accent">How We Use Your Information</h2>
          <p className="mb-4 opacity-80">
            The TikTok video URL you provide is only used to process and download the requested video.
            We do not store the URLs or any information about the videos you download after your session ends.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-accent">Cookies and Tracking</h2>
          <p className="mb-4 opacity-80">
            TikDown does not use cookies or any tracking technologies to monitor user activity.
            We do not analyze user behavior or collect analytics data.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-accent">Third-Party Services</h2>
          <p className="mb-4 opacity-80">
            Our service interacts with TikTok's platform to download videos. We do not share any user
            information with TikTok or any other third parties.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-accent">Data Security</h2>
          <p className="mb-4 opacity-80">
            We take reasonable measures to protect the limited information we process during your use of TikDown.
            Since we don't store user data, there is minimal risk of data breaches affecting your personal information.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-accent">Changes to This Policy</h2>
          <p className="mb-4 opacity-80">
            We may update our Privacy Policy from time to time. We will notify users of any changes by posting
            the new Privacy Policy on this page.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-accent">Contact Us</h2>
          <p className="opacity-80">
            If you have any questions about our Privacy Policy, please contact us through the Contact page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;