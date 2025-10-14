import React, { useState, useEffect } from 'react';
import { FaRocket, FaLock, FaUsers, FaArrowRight } from 'react-icons/fa';

function Index1() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const banners = [
    {
      webp: '/webp/WhatsappBanner.webp',
      fallback: '/WhatsappBanner.jpg',
      alt: 'WhatsApp Support',
      link: 'https://chat.whatsapp.com/KQuPSWyfMSJ2Bdza7ucSTE?mode=wwc',
      external: true
    },
    {
      webp: '/webp/TelegramBanner.webp',
      fallback: '/TelegramBanner.jpg',
      alt: 'Telegram Support', 
      link: 'https://t.me/+KHKwoQa3ieg5MjU8',
      external: true
    },
    {
      webp: '/webp/Customer SupportBanner.webp',
      fallback: '/Customer SupportBanner.jpg',
      alt: 'Customer Support',
      link: 'https://t.me/https://t.me/username',
      external: false
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-[350px] md:h-[500px] lg:h-[600px] relative overflow-hidden">
      {/* Sliding Banner Background Images */}
      <div className="absolute inset-0">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <a
              href={banner.link}
              target={banner.external ? "_blank" : "_self"}
              rel={banner.external ? "noopener noreferrer" : ""}
              className="absolute inset-0 z-20"
            >
              <picture>
                <source srcSet={banner.webp} type="image/webp" />
                <img
                  src={banner.fallback}
                  alt={banner.alt}
                  className="w-full h-full object-cover md:object-contain lg:object-cover"
                />
              </picture>
            </a>
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none z-10"></div>
          </div>
        ))}
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-4 py-20 pointer-events-none">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <h1 className="md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            {/* Premium Social Media */}
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {/* Accounts Store */}
            </span>
          </h1>
          {/* <p className="hidden md:block text-xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-500">
            Get instant access to verified social media accounts with real followers. 
            Boost your online presence across all major platforms.
          </p> */}
          <div className="hidden md:flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-1000">
            {/* <button className="bg-minor text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2 pointer-events-auto">
              Browse Accounts <FaArrowRight />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 pointer-events-auto">
              Learn More
            </button> */}
          </div>
        </div>



      </div>

      
    </div>
  );
}
export default Index1;