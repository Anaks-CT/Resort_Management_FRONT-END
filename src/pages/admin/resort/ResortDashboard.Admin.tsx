import React , {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { IStore } from "../../../interface/slice.interface";
import ManagerDashboard from "../../../components/Manager/ManagerDashboard";
import { useAdminLogout } from "../../../hooks/useLogout";
import { getResortDashoboardDetailsApi } from "../../../api/company.api";
import { toastMessage } from "../../../helpers/toast";



function ResortDashboard() {
  const resortName = useSelector((state: IStore) => state.resort.resortName);
  const adminToken = useSelector((state: IStore) => state.adminAuth.token);
  const currentResortId = useSelector((state: IStore) => state.resort.resortId)
  const logout = useAdminLogout()

  // const [monthlyRevenueDetails, setDetails] = useState<RevenueReport[]>();
  const [resortRevenue, setResortRevenue] = useState<number>()
  const [totalUsers, setTotalUsers] = useState<number>()
  const [totalBooking, setTotalBooking] = useState<number>()
  const [roomOccupancy, setroomOccupancy] = useState<number>();
  const [monthlyRevenue, setmonthlyRevenue] = useState<
  { totalRevenue: number }[]
>();
    // fetching all the required details from the backend
useEffect(() => {
  getResortDashoboardDetailsApi(adminToken, currentResortId)
    .then(res => {
      setTotalBooking(res.data.totalBooking)
      setTotalUsers(res.data.totalUser)
      setResortRevenue(res.data.resortRevenue)
      setmonthlyRevenue(res.data.monthlyRevenue)
      setroomOccupancy(res.data.roomOccupancy)})
    .catch( err => {
      if(err.response.status === 401) logout()
      toastMessage("error", err.response?.data?.message)});
    // eslint-disable-next-line
}, []);
  return (
    <>
      <h1 className="pt-8 font-normal tracking-wide text-5xl">
        {resortName.toUpperCase()} DASHBOARD
      </h1>
      <ManagerDashboard monthlyRevenue={monthlyRevenue} resortRevenue={resortRevenue} roomOccupancy={roomOccupancy} totalBooking={totalBooking} totalUsers={totalUsers} />
    </>
  );
}

export default ResortDashboard;
