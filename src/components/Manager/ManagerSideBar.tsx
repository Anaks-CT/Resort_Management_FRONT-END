import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { IStore } from '../../interface/slice.interface'

function ManagerSideBar() {

  const navigate = useNavigate()
  const resortName = useSelector((state: IStore) => state.resort.resortName)

    const handleSideBarHeadingClick = (_: string, sidebarHeading:string) => {
        navigate(`/admin/${resortName}/${sidebarHeading}`)
      }
      const sideBarHeadings = [
        {
          _id: '1',
          name: "Gallary",
          onClick: handleSideBarHeadingClick
        },
        {
          _id: '2',
          name: "Booking",
          onClick: handleSideBarHeadingClick
        },
        {
          _id: '3',
          name: "Room",
          onClick: handleSideBarHeadingClick
        },
      ]
  return (
    <Sidebar sideBarElems={sideBarHeadings}/>
  )
}

export default ManagerSideBar