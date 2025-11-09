import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

const NotFound = () => {
    const error = useRouteError()
    console.log(error)
  return (
    <div>
        <h1>404</h1>
        <h3>Error - Página no encontrada</h3>
        <Link to={"/"}>Back to home</Link>
    </div>
  )
}

export default NotFound