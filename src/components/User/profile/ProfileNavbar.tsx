import React from 'react'
import { useNavigate } from 'react-router-dom'

type currentNav = "profile" | "member" | "booking" | "wishlist"

type props = {
    currentNav: currentNav
}

function ProfileNavbar({currentNav}: props) {
    const navigate = useNavigate()
    const className = "underline underline-offset-4"  
  return (
    <div className="hidden md:flex max-w-[900px] lg:w-[900px] min-w-[600px] justify-between px-1 mt-10">
        <div className={`${currentNav==='profile' && className} cursor-pointer`} onClick={() => navigate('/profile')}>Personal</div>
        <div className={`${currentNav==='member' && className} cursor-pointer`} onClick={() => navigate('/profile/member')}>Member</div>
        <div className={`${currentNav==='booking' && className} cursor-pointer`} onClick={() => navigate('/profile/bookings')}>Booking</div>
        <div className={`${currentNav==='wishlist' && className} cursor-pointer`} onClick={() => navigate('/profile/wishlist')}>Wishlist</div>
    </div>
  )
}

export default ProfileNavbar