import React from 'react'
import { FaSearch } from 'react-icons/fa'

function SearchFilters({ searchTerm, setSearchTerm, platformFilter, setPlatformFilter }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="x">X (Twitter)</option>
          <option value="email">Email</option>
          <option value="vpn">VPN</option>
          <option value="tiktok">TikTok</option>
        </select>
      </div>
    </div>
  )
}

export default SearchFilters