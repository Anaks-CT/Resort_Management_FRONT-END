import React from "react";
import ResortManagement from "../../components/Manager/resort/ResortManagement";
import { Header } from "../../components/Manager/Header";

function ResortManagementAdmin() {
  return (
    <div className="bg-slate-400 flex flex-col items-center w-full">
      <Header />
      <ResortManagement />
    </div> 
  );
}

export default ResortManagementAdmin;
