import React from 'react'
import { Header } from '../../components/Manager/Header'
import ManagerSideBar from '../../components/Manager/sidebar/ManagerSideBar'

function ResortRoom() {


  return (
    <div className="bg-slate-400 flex flex-col items-center w-full h-screen">
      <h1 className="pt-20 ">ROOMS</h1>
      <Header />
      <ManagerSideBar />
    </div>
  )
}

export default ResortRoom