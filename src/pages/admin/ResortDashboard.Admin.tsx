import React, { useState } from 'react'
import { Header } from '../../components/Manager/Header';
import Sidebar from '../../components/Manager/Sidebar';
import { useSelector } from 'react-redux';
import { IStore } from '../../interface/slice.interface';
import { useNavigate } from 'react-router-dom';
import ManagerSideBar from '../../components/Manager/ManagerSideBar';

type resortProp = {
  _id: string;
  name: string;
  onClick: (resortId: string, resortName: string) => void;
};

function ResortDashboard() {
  // const [sideBarHeadings, setSideBarHeadings] = useState<resortProp[]>([]);
  const resortName = useSelector((state: IStore) => state.resort.resortName)
  

    // // when clicking resorts in sidebar
    // const handleClickResort = (resortId: string, sidebarheading: string) => {
      
    // };
  return (
    <div className="bg-slate-400 flex flex-col items-center w-full h-screen">
      <h1 className="pt-20 ">{resortName.toUpperCase()} DASHBOARD</h1>
      <Header />
      <ManagerSideBar />
    </div>
  )
}

export default ResortDashboard