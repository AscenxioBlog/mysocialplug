import React from 'react';
import { FaRocket, FaLock, FaUsers, FaArrowRight } from 'react-icons/fa';

function Index1() {
  return (
    <div className=" h-[250px] md:h-[400px] bg-main relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <h1 className="md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Premium Social Media
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Accounts Store
            </span>
          </h1>
          <p className="hidden md:block text-xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-500">
            Get instant access to verified social media accounts with real followers. 
            Boost your online presence across all major platforms.
          </p>
          <div className="hidden md:flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-1000">
            <button className="bg-minor text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2">
              Browse Accounts <FaArrowRight />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>


      </div>

      
    </div>
  );
}
export default Index1;