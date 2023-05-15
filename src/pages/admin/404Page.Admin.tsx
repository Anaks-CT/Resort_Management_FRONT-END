import React from 'react'
import Button from '../../components/UI/Button'
import { useLocation, useNavigate } from 'react-router-dom'

function PageNotFoundAdmin() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
      <div className='text-white flex flex-col justify-center items-center'>
        <div className='text-5xl md:text-9xl tracking-widest'>404</div>
        <div className='text-xl md:text-2xl tracking-widest'>Page Not Found</div>
        <div className='text-center md:text-lg md:tracking-wide mt-3'>Requested URL {location.state ? location.state : location.pathname} is not in our server.</div>
        <div className='w-40 py-4'><Button class='w-full' color='premium' onClick={navigate} OnClickItem={'/admin/dashboard'}>GO DASHBOARD</Button></div>
      </div>
  )
}

export default PageNotFoundAdmin