import React from 'react'
import Loader from './Loader'

function FullPageLoader({ text = 'Loading...' }) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <Loader size="large" text={text} />
      </div>
    </div>
  )
}

export default FullPageLoader