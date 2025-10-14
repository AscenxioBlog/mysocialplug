import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaUser, FaBars, FaTimes, FaSignInAlt, FaEnvelope } from 'react-icons/fa';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products',  href: '/products' },
    { name: 'Login', href: '/login' },
    { name: 'Contact',  href: '/contact' },
    // { name: 'Account',  href: '/account' }
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block bg-gradient-to-r  shadow-md ">
        <div className="max-w-6xl h-[80px] mx-auto flex items-center justify-between">
          <img src="/webp/Mysocialplug.png" className='h-[130px] object-contain transform scale-110' alt="MySocialPlug Logo" />

          
          <nav className="flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link 
                key={index}
                to={item.href} 
                className="text-black hover:text-blue-100 transition-colors duration-200 font-medium flex items-center gap-2"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden    shadow-md py-4 box-border h-[80px]">
        <div className="flex h-[50px] px-4 box-border justify-start items-center">
          <img src="/webp/Mysocialplug1.png" className='h-[130px] ml-[-100px] object-contain transform scale-110' alt="MySocialPlug Logo" />
          <img src="/webp/Mysocialplug2.png" className='h-[80px] object-contain  ml-[-100px]' alt="MySocialPlug Logo" />
      
        </div>
        
        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-2xl z-50 border-b border-gray-100">
            <div className="px-4 py-2">
              {navItems.map((item, index) => (
                <Link 
                  key={index}
                  to={item.href}
                  className="flex items-center gap-4 px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-300 hover:text-blue-700 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-xl group-hover:text-blue-600 transition-colors">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-2xl z-40">
        <div className="flex justify-around px-2 py-1">
          {navItems.slice(0, 4).map((item, index) => (
            <Link 
              key={index}
              to={item.href}
              className="group flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 hover:bg-gradient-to-t hover:from-blue-50 hover:to-purple-50 active:scale-95"
            >
              <div className="relative">
                <span className="text-2xl text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                  {item.icon}
                </span>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <span className="text-xs font-medium text-gray-600 group-hover:text-blue-700 mt-1 transition-colors duration-300">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Header