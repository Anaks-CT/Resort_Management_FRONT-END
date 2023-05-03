import React from 'react'
import ProfileSidebar from '../../../components/User/Sidebar';
import { Header2 } from '../../../components/User/Header/Header';
import ProfileNavbar from '../../../components/User/ProfileNavbar';

function BookingDetailsPage() {
    // background image style
    const style = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0),rgba(0, 0, 0, 0.5)), url("https://res.cloudinary.com/dhcvbjebj/image/upload/v1683088154/wallpaperflare.com_wallpaper_1_txni0h.jpg")`,
    };
  return (
    <>
      <ProfileSidebar />
      <Header2 />
      <div
        className="bg-no-repeat bg-cover bg-center min-h-screen  text-white w-screen pt-[60px] flex justify-center" // doubt in mobile view
        style={style}
      > 
        <div className="mt-10 md:mt-20 z-10 px-3 w-full flex flex-col md:items-center">
          <div className="text-sm md:text-2xl md:tracking-widest tracking-wide text-center flex justify-around items-center">
            WELCOME TO TRINITY, ANAKS
          </div>
          <ProfileNavbar currentNav="booking"/>
          
        </div>
      </div>
    </>
  )
}

export default BookingDetailsPage