import React from 'react'
import { Outlet } from 'react-router-dom'

function MainDash() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default MainDash