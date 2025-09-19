import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mb-16 md:mb-0">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">MYSOCIALLOG</h3>
            <p className="text-gray-400 text-sm">Premium Social Media Accounts</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              <FaFacebook className="text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
              <FaTwitter className="text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
              <FaInstagram className="text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <FaLinkedin className="text-xl" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 MySocialLog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer