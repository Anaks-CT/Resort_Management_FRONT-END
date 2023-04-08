import React from "react";
import ResortManagement from "../../components/Manager/resort/ResortManagement";
import { Header } from "../../components/Manager/Header";
import AdminSideBar from "../../components/Manager/sidebar/AdminSideBar";

function ResortManagementAdmin() {
  return (
    <div className="bg-slate-400 flex flex-col items-center w-full">
      <Header />
      <AdminSideBar />
      <ResortManagement />
    </div> 
  );
}

export default ResortManagementAdmin;
