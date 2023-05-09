import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../UI/Sidebar";
import { IStore } from "../../../interface/slice.interface";

function AdminResortSideBar() {
  const navigate = useNavigate();
  const resortName = useSelector((state: IStore) => state.resort.resortName);

  const handleSideBarHeadingClick = (_: string, sidebarHeading: string) => {
    navigate(`/admin/${resortName}/${sidebarHeading}`);
  };
  const handleAdminDashboardClick = () => {
    navigate("/admin/adminDashboard");
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
      _id: "6",
      name: "Admin DashBoard",
      onClick: handleAdminDashboardClick,
    },
  ];
  return <Sidebar sideBarElems={sideBarHeadings} />;
}

export default AdminResortSideBar;
