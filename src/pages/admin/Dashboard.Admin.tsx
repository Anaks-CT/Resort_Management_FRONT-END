import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IStore } from "../../interface/slice.interface";
import { useEffect } from "react";
import BarChart from "../../components/UI/BarChart";
import PieChart from "../../components/UI/PieChart";

import { toastMessage } from "../../helpers/toast";
import { RevenueReport } from "../../interface/booking.interface";
import { useAdminLogout } from "../../hooks/useLogout";
import { getAdminDashboardDetailsApi } from "../../api/company.api";

function AdminDashboard() {
  const navigate = useNavigate();
  // taking admin token from redux
  const adminToken = useSelector((state: IStore) => state.adminAuth.token);
  const logout = useAdminLogout();
  ////////////////////////////////////// declaring states for displaying in admin dashboared ///////////////////////
  const [monthlyRevenueDetails, setDetails] = useState<RevenueReport[]>();
  const [allResorts, setAllResorts] = useState<string[]>();
  const [totalUsers, setTotalUsers] = useState<number>();
  const [totalResorts, setTotalResorts] = useState<number>();
  const [totalBooking, setTotalBooking] = useState<number>();
  const [resortRevenue, setResortRevenue] = useState<
    { totalRevenue: number }[] | null
  >();
  const [loading, setLoading] = useState(false);

  // fetching all the required details from the backend
  useEffect(() => {
    setLoading(true);
    getAdminDashboardDetailsApi(adminToken)
      .then((res) => {
        setTotalBooking(res.data.bookingCount);
        setTotalResorts(res.data.resortCount);
        setTotalUsers(res.data.userCount);
        setDetails(res.data.bookingRevenue);
        setAllResorts(res.data.allResorts);
        setResortRevenue(res.data.resortRevenue);
      })
      .catch((err) => {
        if (err.response.status === 401) logout();
        toastMessage("error", err.response?.data?.message);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
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
  const totalRevenue: any = monthlyRevenueDetails?.reduce(
    (acc, item) => (acc += item.totalRevenue),
    0
  );

  // navigating back to login page if admin token is not there
  useEffect(() => {
    if (!adminToken) navigate("/admin/login");
    // eslint-disable-next-line
  }, [adminToken]);

  const pieChartDatas = resortRevenue?.map((item) => item.totalRevenue);
  return (
    <>
      <h1 className="pt-8 font-normal tracking-wide text-5xl">DASHBOARD</h1>
      {loading && (
        <div className="flex justify-center">
        <img
          width={50}
          src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1680669482/Spinner-1s-200px_4_ontbds.gif"
          alt=""
        />
      </div>  
      )}
      <div className="mt-10 z-10 grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-20 justify-center mx-auto">
        <div className="bg-red-500 bg-opacity-70 gap-3 h-32 rounded flex flex-col justify-center items-center w-64">
          <div className="tracking-wide  font-black">TOTAL USERS</div>
          <div className="tracking-wide font-black text-4xl">{totalUsers}</div>
        </div>
        <div className="bg-blue-500 bg-opacity-70 gap-3 h-32 rounded flex flex-col justify-center items-center w-64">
          <div className="tracking-wide  font-black">TOTAL RESORTS</div>
          <div className="tracking-wide font-black text-4xl">
            {totalResorts}
          </div>
        </div>
        <div className="bg-red-500 h-32 bg-opacity-70 gap-3 pb-3 rounded flex flex-col justify-center items-center w-64">
          <div className="tracking-wide  font-black">TOTAL REVENUE</div>
          <div className="tracking-wide font-black text-3xl">
            ₹ {totalRevenue ? totalRevenue?.toLocaleString("en-IN") : 0}
          </div>
        </div>
        <div className="bg-blue-500 h-32 bg-opacity-70 gap-3 rounded flex flex-col justify-center items-center w-64">
          <div className="tracking-wide  font-black">TOTAL BOOKINGS</div>
          <div className="tracking-wide font-black text-4xl">
            {totalBooking}
          </div>
        </div>
      </div>
      <div className="h-[400px] md:flex justify-center items-center mt-10">
        <BarChart datas={datas} labels={labels} />
        <PieChart labels={allResorts} datas={pieChartDatas} />
      </div>
    </>
  );
}

export default AdminDashboard;
