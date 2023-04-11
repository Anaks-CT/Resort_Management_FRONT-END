import React from 'react'
import { Header } from '../../components/Manager/Header'
import AdminResortSideBar from '../../components/Manager/sidebar/AdminResortSideBar'
import RoomManagement from '../../components/Manager/room/RoomManagement'

function ResortRoom() {


  return (
    <div className="bg-slate-400 w-full h-full min-h-screen">
      <Header />
      <AdminResortSideBar />
      <RoomManagement />
    </div>
  )
}

export default ResortRoom