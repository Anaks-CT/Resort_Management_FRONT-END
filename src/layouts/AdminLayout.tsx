import React from 'react'
import { Header } from '../components/Manager/Header'
import AdminSideBar from '../components/Manager/sidebar/AdminSideBar'
import { Outlet } from 'react-router-dom';

function AdminLayout() {
    const style = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1)), url("https://res.cloudinary.com/dhcvbjebj/image/upload/v1683015725/wallpaperflare.com_wallpaper_9_s9z82o.jpg")`,
      };
  return (
    <>
      <Header />
      <div
        className="bg-no-repeat bg-cover bg-fixed flex flex-col items-center bg-center min-h-screen h-full w-screen pt-[60px] p-9" // doubt in mobile view
        style={style}
      >
        <AdminSideBar />
        <Outlet />
        </div>
    </>
  )
}

export default AdminLayout