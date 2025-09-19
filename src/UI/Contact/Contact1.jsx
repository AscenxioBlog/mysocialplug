import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Contact1() {
  return (
    <div className="bg-main py-20 px-4 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
          Get In <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-500">
          Have questions about our premium social media accounts? We're here to help you grow your online presence.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 animate-fade-in-up animation-delay-1000">
            <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
            <p className="text-gray-300">support@mysociallog.com</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 animate-fade-in-up animation-delay-1500">
            <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPhone className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
            <p className="text-gray-300">+1 (555) 123-4567</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 animate-fade-in-up animation-delay-2000">
            <div className="bg-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaMapMarkerAlt className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
            <p className="text-gray-300">New York, NY 10001</p>
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
      `}</style>
    </div>
  );
}

export default Contact1;