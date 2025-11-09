import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutPublic = () => {
  return (
  <>
    <main>
      <Outlet />
    </main>
  </>
  )
}

export default LayoutPublic