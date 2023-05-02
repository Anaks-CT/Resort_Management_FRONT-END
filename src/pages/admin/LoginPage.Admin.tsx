import React from 'react'
import AdminLogin from '../../components/Manager/Login.Admin'
import { Header } from '../../components/Manager/Header'

function LoginPage() {
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.7)), url("https://res.cloudinary.com/dhcvbjebj/image/upload/v1683015725/wallpaperflare.com_wallpaper_9_s9z82o.jpg")`,
  };
  return (
    <div className="conatainer-fluid">
    <Header />
    <div
      className="bg-no-repeat bg-cover bg-center md:h-screen h-screen w-screen pt-[60px] flex justify-center" // doubt in mobile view
      style={style}
      >
      <div className="bg-gradient-to-t from-transparent to-black absolute w-screen h-64 "></div>
      <AdminLogin />
      <div className="bg-gradient-to-b from-transparent to-black absolute w-screen bottom-0 h-64"></div>
    </div>
  </div>
  )
}

export default LoginPage