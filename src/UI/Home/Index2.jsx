import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";

function Index2() {
  const categories = [
    {
      name: "Facebook",
      icon: <FaFacebook className="text-blue-600 text-3xl" />,
      color: "bg-blue-50 border-blue-200",
      products: [
        { country: "🇺🇸 USA", type: "Standard", friends: "+100 Friends", price: "$25", stock: 12 },
        { country: "🇬🇧 UK", type: "Premium", friends: "+500 Friends", price: "$45", stock: 3 },
        { country: "🇨🇦 Canada", type: "Standard", friends: "+200 Friends", price: "$30", stock: 8 },
        { country: "🇨🇦 Canada", type: "Standard", friends: "+200 Friends", price: "$30", stock: 8 }
      ]
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-pink-500 text-3xl" />,
      color: "bg-pink-50 border-pink-200",
      products: [
        { country: "🇺🇸 USA", type: "Standard", friends: "+1K Followers", price: "$35", stock: 15 },
        { country: "🇩🇪 Germany", type: "Premium", friends: "+2K Followers", price: "$60", stock: 2 },
        { country: "🇫🇷 France", type: "Standard", friends: "+800 Followers", price: "$28", stock: 7 },
        { country: "🇫🇷 France", type: "Standard", friends: "+800 Followers", price: "$28", stock: 7 }
      ]
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="text-sky-500 text-3xl" />,
      color: "bg-sky-50 border-sky-200",
      products: [
        { country: "🇺🇸 USA", type: "Standard", friends: "+500 Followers", price: "$20", stock: 9 },
        { country: "🇯🇵 Japan", type: "Premium", friends: "+1.5K Followers", price: "$40", stock: 1 },
        { country: "🇯🇵 Japan", type: "Premium", friends: "+1.5K Followers", price: "$40", stock: 1 },
        { country: "🇦🇺 Australia", type: "Standard", friends: "+300 Followers", price: "$18", stock: 14 }
      ]
    },
    {
      name: "TikTok",
      icon: <FaTiktok className="text-black text-3xl" />,
      color: "bg-gray-50 border-gray-200",
      products: [
        { country: "🇺🇸 USA", type: "Standard", friends: "+2K Followers", price: "$50", stock: 6 },
        { country: "🇮🇳 India", type: "Premium", friends: "+5K Followers", price: "$80", stock: 0 },
        { country: "🇮🇳 India", type: "Premium", friends: "+5K Followers", price: "$80", stock: 0 },
        { country: "🇧🇷 Brazil", type: "Standard", friends: "+1.5K Followers", price: "$35", stock: 11 }
      ]
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-blue-700 text-3xl" />,
      color: "bg-blue-50 border-blue-200",
      products: [
        { country: "🇺🇸 USA", type: "Standard", friends: "+200 Connections", price: "$30", stock: 5 },
        { country: "🇺🇸 USA", type: "Standard", friends: "+200 Connections", price: "$30", stock: 5 },
        { country: "🇸🇬 Singapore", type: "Premium", friends: "+500 Connections", price: "$55", stock: 4 },
        { country: "🇳🇱 Netherlands", type: "Standard", friends: "+150 Connections", price: "$25", stock: 13 }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Social Media Accounts Store</h1>
          <p className="text-gray-600">Choose your platform and country</p>
        </div>

        <div className="space-y-8">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                {category.icon}
                <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.products.map((product, productIndex) => (
                  <div key={productIndex} className={`${category.color} p-4 rounded-lg border hover:shadow-md transition-all cursor-pointer`}>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-lg font-semibold">{product.country}</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{product.type}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-2">{product.friends}</p>
                    <p className="text-sm text-gray-500 mb-3">{product.stock} left</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-green-600">{product.price}</span>
                      <button 
                        className={`px-3 py-1 rounded text-sm ${
                          product.stock === 0 
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                            : 'bg-black text-white hover:bg-gray-800'
                        }`}
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? 'Sold Out' : 'Buy'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Index2;
