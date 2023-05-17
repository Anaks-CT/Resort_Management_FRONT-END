import React from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../UI/Sidebar'
import { useDispatch } from 'react-redux';
import { removeManagerToken } from '../../../store/slices/managerTokenSlice';

function ManagerSideBar() {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleSideBarHeadingClick = (_: string, sidebarHeading: string) => {
    navigate(`/manager/${sidebarHeading}`);
  };
  const handleLogoutClick = () => {
    dispatch(removeManagerToken())
  };
  const sideBarHeadings = [
    {
      _id: "1",
      name: "Dashboard",
      onClick: handleSideBarHeadingClick,
    },
    {
      _id: "2",
      name: "Gallary",
      onClick: handleSideBarHeadingClick,
    },
    {
      _id: "3",
      name: "Users",
      onClick: handleSideBarHeadingClick,
    },
    {
      _id: "4",
      name: "Booking",
      onClick: handleSideBarHeadingClick,
    },
    {
      _id: "5",
      name: "Room",
      onClick: handleSideBarHeadingClick,
    },
    {
      _id: "Logout",
      name: "Logout",
      onClick: handleLogoutClick,
    },
  ];
  return <Sidebar sideBarElems={sideBarHeadings} />;
}

export default ManagerSideBar