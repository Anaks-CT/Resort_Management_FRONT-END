import React from 'react'
import ProfileSidebar from '../../../components/User/Sidebar';
import { Header2 } from '../../../components/User/Header/Header';
import ProfileNavbar from '../../../components/User/ProfileNavbar';
import MemberTableProfile from '../../../components/User/MemberTableProfile';

function MemberPage() {
  // background image style
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0),rgba(0, 0, 0, 0.5)), url("https://res.cloudinary.com/dhcvbjebj/image/upload/v1683088154/wallpaperflare.com_wallpaper_1_txni0h.jpg")`,
  };
  return (
    <>
      <ProfileSidebar />
      <Header2 />
      <div
        className="bg-no-repeat bg-cover bg-center min-h-screen  text-white w-screen pt-[60px] flex justify-center" // doubt in mobile view
        style={style}
      >
        <div className="mt-10 md:mt-20 z-10 px-3 w-full flex flex-col md:items-center">
          <div className="text-sm md:text-2xl md:tracking-widest tracking-wide text-center flex justify-around items-center">
            WELCOME TO TRINITY, ANAKS
          </div>
          <ProfileNavbar currentNav="member" />

          <div className="border border-premium md:border-2 my-5 max-w-[900px] lg:w-[900px] md:min-w-[600px] ">
            <div className="p-3 bg-white bg-opacity-25 relative  ">
              <div className="text-white grid gap-5 p-2 max-h-[440px] overflow-y-auto scroll-0 rounded">
                <MemberTableProfile />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberPage