import React from 'react'
import { Header } from '../components/Manager/Header';
import AdminResortSideBar from '../components/Manager/sidebar/AdminResortSideBar';
import { Outlet, useLocation } from 'react-router-dom';
import ManagerSideBar from '../components/Manager/sidebar/ManagerSideBar';

function ManagerLayout() {
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.7)), url("https://res.cloudinary.com/dhcvbjebj/image/upload/v1683015725/wallpaperflare.com_wallpaper_9_s9z82o.jpg")`,
  };
  const location = useLocation()

  return (
    <>
      <Header />
      <div
        className="bg-no-repeat bg-fixed bg-center min-h-screen h-full w-screen pt-[60px] flex flex-col items-center justify-center" // doubt in mobile view
        style={style}
      >
        {location.pathname.startsWith('/manager') ? <ManagerSideBar /> :  <AdminResortSideBar />}
        <Outlet />
      </div>
    </>
  );
}

export default ManagerLayout