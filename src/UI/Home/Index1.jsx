import React from 'react';
import { FaRocket, FaLock, FaUsers, FaArrowRight } from 'react-icons/fa';

function Index1() {
  return (
    <div className="min-h-screen bg-main relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Premium Social Media
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Accounts Store
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-500">
            Get instant access to verified social media accounts with real followers. 
            Boost your online presence across all major platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-1000">
            <button className="bg-minor text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2">
              Browse Accounts <FaArrowRight />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300 animate-fade-in-up animation-delay-1500">
            <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaRocket className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Delivery</h3>
            <p className="text-gray-300">Get your accounts within minutes of purchase. No waiting, no delays.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300 animate-fade-in-up animation-delay-2000">
            <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLock className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">100% Secure</h3>
            <p className="text-gray-300">All accounts are verified and come with lifetime warranty protection.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300 animate-fade-in-up animation-delay-2500">
            <div className="bg-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUsers className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Real Followers</h3>
            <p className="text-gray-300">Authentic accounts with genuine followers and engagement rates.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in-up animation-delay-3000">
            <div className="text-4xl font-bold text-white mb-2 counter" data-target="10000">10K+</div>
            <div className="text-gray-300">Happy Customers</div>
          </div>
          <div className="animate-fade-in-up animation-delay-3200">
            <div className="text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-gray-300">Countries</div>
          </div>
          <div className="animate-fade-in-up animation-delay-3400">
            <div className="text-4xl font-bold text-white mb-2">99.9%</div>
            <div className="text-gray-300">Success Rate</div>
          </div>
          <div className="animate-fade-in-up animation-delay-3600">
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-300">Support</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
          opacity: 0;
        }
        
        .animation-delay-1500 {
          animation-delay: 1.5s;
          opacity: 0;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
          opacity: 0;
        }
        
        .animation-delay-2500 {
          animation-delay: 2.5s;
          opacity: 0;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
          opacity: 0;
        }
        
        .animation-delay-3200 {
          animation-delay: 3.2s;
          opacity: 0;
        }
        
        .animation-delay-3400 {
          animation-delay: 3.4s;
          opacity: 0;
        }
        
        .animation-delay-3600 {
          animation-delay: 3.6s;
          opacity: 0;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
export default Index1;