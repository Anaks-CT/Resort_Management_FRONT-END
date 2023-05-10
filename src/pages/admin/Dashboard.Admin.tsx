import AdminSideBar from "../../components/Manager/sidebar/AdminSideBar";
import { useState } from "react";
import { Header } from "../../components/Manager/Header";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IStore } from "../../interface/slice.interface";
import { useEffect } from "react";
import Button from "../../components/UI/Button";
import { removeAdminToken } from "../../store/slices/adminTokenSlice";
import BarChart from "../../components/UI/BarChart";
import PieChart from "../../components/UI/PieChart";
import {
  getAdminDashboardDetailsApi,
} from "../../api/booking.api";
import { toastMessage } from "../../helpers/toast";
import { RevenueReport } from "../../interface/booking.interface";
import { getAllResortDetailsApi } from "../../api/resort.api";
import { IResort } from "../../interface/resort.interface";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminToken = useSelector((state: IStore) => state.adminAuth.token);
  const [monthlyRevenueDetails, setDetails] = useState<RevenueReport[]>();
  const [allResorts, setAllResorts] = useState<string[]>();
  const [totalUsers, setTotalUsers] = useState()
const [totalResorts, setTotalResorts] = useState()
  const [totalBooking, setTotalBooking] = useState()
  const [resortRevenue, setResortRevenue] = useState<
    { totalRevenue: number }[] | null
  >();

  useEffect(() => {
    getAdminDashboardDetailsApi(adminToken)
      .then(res => {
        console.log(res);
        setTotalBooking(res.data.bookingCount)
        setTotalResorts(res.data.resortCount)
        setTotalUsers(res.data.userCount)
        setDetails(res.data.bookingRevenue)
        setAllResorts(res.data.allResorts)
        setResortRevenue(res.data.resortRevenue)})
      .catch( err => toastMessage("error", err.response?.data?.message));
  }, []);
  // datas for barchart
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "jun",
    "jul",
    "aug",
    "sept",
    "oct",
    "nov",
    "dec",
  ];
  const datas: any = monthlyRevenueDetails?.map((item) => item.totalRevenue);
  const totalRevenue: any = monthlyRevenueDetails?.reduce((acc, item) => acc+=item.totalRevenue,0)
  useEffect(() => {
    if (!adminToken) navigate("/admin/login");
    // eslint-disable-next-line
  }, [adminToken]);
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0),rgba(0, 0, 0, 0.0)), url("https://res.cloudinary.com/dhcvbjebj/image/upload/v1683015725/wallpaperflare.com_wallpaper_9_s9z82o.jpg")`,
  };

  const pieChartDatas = resortRevenue?.map((item) => item.totalRevenue);

  return (
    <>
      <Header />
      <div
        className="bg-no-repeat bg-cover bg-center md:h-screen h-full w-screen pt-[60px] p-9" // doubt in mobile view
        style={style}
      >
        <AdminSideBar />
        <div className="mt-10 z-10 grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-20 justify-center mx-auto">
          <div className="bg-red-500 bg-opacity-70 gap-3 h-40 rounded flex flex-col justify-center items-center w-64">
            <div className="tracking-wide  font-black">TOTAL USERS</div>
            <div className="tracking-wide font-black text-5xl">{totalUsers}</div>
          </div>
          <div className="bg-blue-500 bg-opacity-70 gap-3 h-40 rounded flex flex-col justify-center items-center w-64">
            <div className="tracking-wide  font-black">TOTAL RESORTS</div>
            <div className="tracking-wide font-black text-5xl">{totalResorts}</div>
          </div>
          <div className="bg-red-500 h-40 bg-opacity-70 gap-3 pb-3 rounded flex flex-col justify-center items-center w-64">
            <div className="tracking-wide  font-black">TOTAL REVENUE</div>
            <div className="tracking-wide font-black text-4xl">₹ {totalRevenue}</div>
          </div>
          <div className="bg-blue-500 h-40 bg-opacity-70 gap-3 rounded flex flex-col justify-center items-center w-64">
            <div className="tracking-wide  font-black">TOTAL BOOKINGS</div>
            <div className="tracking-wide font-black text-5xl">{totalBooking}</div>
          </div>

        </div>
        <div className="h-[450px] md:flex justify-center items-center mt-10">
          <BarChart datas={datas} labels={labels} />
          <PieChart labels={allResorts} datas={pieChartDatas} />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
