import React from 'react'
import { FaTelegram, FaWhatsapp, FaTimes } from 'react-icons/fa'

function SupportModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes className="text-xl" />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Need Help?</h2>
          <p className="text-gray-600">
            If you have any issues, need assistance, or have questions, our support team is here to help!
          </p>
        </div>
        
        <div className="space-y-4">
          <a
            href="https://t.me/+KHKwoQa3ieg5MjU8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <FaTelegram className="text-blue-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-gray-800">Telegram Support</h3>
              <p className="text-sm text-gray-600">Join our Telegram group</p>
            </div>
          </a>
          
          <a
            href="https://chat.whatsapp.com/KQuPSWyfMSJ2Bdza7ucSTE?mode=wwt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
          >
            <FaWhatsapp className="text-green-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-gray-800">WhatsApp Support</h3>
              <p className="text-sm text-gray-600">Chat with us on WhatsApp</p>
            </div>
          </a>
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-6 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Got it, thanks!
        </button>
      </div>
    </div>
  )
}

export default SupportModal