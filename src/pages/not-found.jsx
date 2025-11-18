import React from 'react'
import { Link } from 'react-router'

const NotFoundPage = () => {
  return (
    <div className='container text-center'>
        <h1 className=''>404</h1>
        <p>Oops! The page you are looking for not existed</p>
        <Link to="/">Go back Home</Link>
    </div>
  )
}

export default NotFoundPage