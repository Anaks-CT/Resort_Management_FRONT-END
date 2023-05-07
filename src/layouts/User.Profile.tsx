import { Outlet, useLocation } from "react-router-dom";
import ProfileSidebar from "../components/User/Sidebar";
import { Header2 } from "../components/User/Header/Header";
import ProfileNavbar from "../components/User/profile/ProfileNavbar";
import { Iuser } from "../interface/user.interface";
import {useState, useEffect} from "react"
import { useSelector } from "react-redux";
import { IStore } from "../interface/slice.interface";
import { getUserDetailsApi } from "../api/user.api";

function UserProfile() {
  // background image style
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0),rgba(0, 0, 0, 0.5)), url("https://res.cloudinary.com/dhcvbjebj/image/upload/v1683088154/wallpaperflare.com_wallpaper_1_txni0h.jpg")`,
  };
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<Iuser>();
  // getting user token from redux
  const userToken = useSelector((state: IStore) => state.userAuth.token);
  // fetching user Detials
  useEffect(() => {
    setLoading(true);
    getUserDetailsApi(userToken)
      .then((res) => setUser(res.data.data))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  const location = useLocation()
  let currentNav: "profile" | "member" | "booking" | "wishlist"
  switch (location.pathname) {
    case ("/profile"):
        currentNav="profile"
        break;
    case ("/profile/member"): 
        currentNav="member"
        break;
    case ("/profile/bookings"): 
        currentNav="booking"
        break;
    case ("/profile/wishlist"): 
        currentNav="wishlist"
        break;
    default:
        currentNav="profile"
        break;
  }
  return (
    <>
      <ProfileSidebar />
      <Header2 />
      <div
        className="bg-no-repeat bg-cover bg-center min-h-screen  text-white w-screen pt-[60px] flex justify-center" // doubt in mobile view
        style={style}
      >
        <div className="mt-10 md:mt-20 z-10 px-3 w-full flex flex-col md:items-center">
          <div className="text-sm md:text-2xl md:tracking-widest tracking-wide text-center flex justify-around items-center uppercase">
            {!loading && `WELCOME TO TRINITY, ${user?.name}`}
          </div>
          <ProfileNavbar currentNav={currentNav} />

          <div className="border border-premium md:border-2 my-5 max-w-[900px] lg:w-[900px] md:min-w-[600px] ">
            <div className="p-3 bg-white bg-opacity-25 relative  ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
