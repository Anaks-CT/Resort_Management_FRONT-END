import AdminSideBar from "../../components/Manager/sidebar/AdminSideBar";
import { Header } from "../../components/Manager/Header";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IStore } from "../../interface/slice.interface";
import { useEffect } from "react";
import Button from "../../components/UI/Button";
import { removeAdminToken } from "../../store/slices/adminTokenSlice";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminToken = useSelector((state: IStore) => state.adminAuth.token);
  useEffect(() => {
    if (!adminToken) navigate("/admin/login");
    // eslint-disable-next-line
  }, [adminToken]);
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.7)), url("https://res.cloudinary.com/dhcvbjebj/image/upload/v1683015725/wallpaperflare.com_wallpaper_9_s9z82o.jpg")`,
  };
  return (
    <>
      <Header />
      <div
        className="bg-no-repeat bg-cover bg-center md:h-screen h-screen w-screen pt-[60px] flex justify-center" // doubt in mobile view
        style={style}
      >
        <AdminSideBar />
        <div className="bg-gradient-to-t from-transparent to-black absolute w-screen h-64 "></div>
        <div className="mt-10 z-10">
          <Button
            color="danger"
            OnClickItem={removeAdminToken()}
            class="px-4 py-2"
            onClick={dispatch}
          >
            LOGOUT
          </Button>
        </div>
        <div className="bg-gradient-to-b from-transparent to-black absolute w-screen bottom-0 h-64"></div>
      </div>
    </>
  );
}

export default AdminDashboard;
