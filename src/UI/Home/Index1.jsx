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
    <div className="h-[250px] md:h-[500px] lg:h-[600px] relative overflow-hidden ">
      {/* Sliding Banner Background Images */}
      <div className="  h-[250px] md:h-[500px] lg:h-[600px]">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={` h-[250px] md:h-[500px] lg:h-[600px]  transition-opacity duration-1000  ${
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
                  className=" h-[250px] md:h-[500px] lg:h-[600px]  w-full"
                />
              </picture>
            </a>
           
            {/* <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none z-10"></div> */}
          </div>
         ))} 
      </div>

      

      
    </div>
  );
}
export default Index1;