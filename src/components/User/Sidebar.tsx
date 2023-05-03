import React from 'react'
import Sidebar from '../UI/Sidebar';
import { useNavigate } from 'react-router-dom';

function ProfileSidebar() {
    const navigate = useNavigate();

    const sideBarHeadings = [
      {
        _id: "1",
        name: "Personal",
        onClick: () => navigate('/profile'),
      },
      {
        _id: "2",
        name: "Member",
        onClick: () => navigate('/profile/member'),
      },
      {
        _id: "3",
        name: "Booking",
        onClick: () => navigate('/profile/bookings'),
      },
      {
        _id: "4",
        name: "Room Service",
        onClick: () => navigate('/profile/roomservice'),
      },
      {
        _id: "5",
        name: "Wishlist",
        onClick: () => navigate('/profile/wishlist'),
      },
    ];
    return <Sidebar sideBarElems={sideBarHeadings} userSideBar/>;
}

export default ProfileSidebar