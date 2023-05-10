import React from 'react'
import { Header } from '../components/Manager/Header';
import AdminResortSideBar from '../components/Manager/sidebar/AdminResortSideBar';
import { Outlet } from 'react-router-dom';

function ResortAdmin() {
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.7)), url("https://res.cloudinary.com/dhcvbjebj/image/upload/v1683015725/wallpaperflare.com_wallpaper_9_s9z82o.jpg")`,
  };
  return (
    <>
      <Header />
      <div
        className="bg-no-repeat bg-fixed bg-center min-h-screen h-full w-screen pt-[60px] flex flex-col items-center" // doubt in mobile view
        style={style}
      >
        <AdminResortSideBar />
        <Outlet />
      </div>
    </>
  );
}

export default ResortAdmin