import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { IStore } from '../../interface/slice.interface';
import { useManagerLogout } from '../../hooks/useLogout';
import ManagerDashboard from '../../components/Manager/ManagerDashboard';
import { getManagerdashboardDetailsAPi } from '../../api/manager.api';
import { toastMessage } from '../../helpers/toast';

function DashboardManager() {
  const managerToken = useSelector((state: IStore) => state.managerAuth.token);
  const logout = useManagerLogout()

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
  if(managerToken){
    getManagerdashboardDetailsAPi(managerToken)
    .then(res => {
      setTotalBooking(res.data.totalBooking)
      setTotalUsers(res.data.totalUser)
      setResortRevenue(res.data.resortRevenue)
      setmonthlyRevenue(res.data.monthlyRevenue)
      setroomOccupancy(res.data.roomOccupancy)})
    .catch( err => {
      if(err.response.status === 401) logout()
      toastMessage("error", err.response?.data?.message)});
  }
    // eslint-disable-next-line
}, []);
  return (
    <>
      <h1 className="pt-8 font-normal tracking-wide text-5xl">
         DASHBOARD
      </h1>
      <ManagerDashboard monthlyRevenue={monthlyRevenue} resortRevenue={resortRevenue} roomOccupancy={roomOccupancy} totalBooking={totalBooking} totalUsers={totalUsers} />
    </>
  );
}

export default DashboardManager