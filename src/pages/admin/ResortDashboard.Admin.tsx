import React from 'react'
import { Header } from '../../components/Manager/Header';
import { useSelector } from 'react-redux';
import { IStore } from '../../interface/slice.interface';
import AdminResortSideBar from '../../components/Manager/sidebar/AdminResortSideBar';



function ResortDashboard() {
  const resortName = useSelector((state: IStore) => state.resort.resortName)
  

  return (
    <div className="bg-slate-400 flex flex-col items-center w-full h-screen">
      <h1 className="pt-20 ">{resortName.toUpperCase()} DASHBOARD</h1>
      <Header />
      <AdminResortSideBar />
    </div>
  )
}

export default ResortDashboard