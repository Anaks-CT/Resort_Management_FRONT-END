import React from 'react'
import { Header } from '../../components/Manager/Header';
import { useSelector } from 'react-redux';
import { IStore } from '../../interface/slice.interface';
import AdminResortSideBar from '../../components/Manager/sidebar/AdminResortSideBar';



function ResortDashboard() {
  const resortName = useSelector((state: IStore) => state.resort.resortName)
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0),rgba(0, 0, 0, 0.7)), url("https://res.cloudinary.com/dhcvbjebj/image/upload/v1683015725/wallpaperflare.com_wallpaper_9_s9z82o.jpg")`,
  };

  return (
      <>
      <Header />
      <div
        className="bg-no-repeat bg-fixed bg-center h-screen w-screen pt-[60px] flex justify-center" // doubt in mobile view
        style={style}
      >
      <h1 className="pt-20 font-normal tracking-wide text-5xl">{resortName.toUpperCase()} DASHBOARD</h1>

        <AdminResortSideBar />
      </div>
    </>
  )
}

export default ResortDashboard