import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useAdminLogout } from '../../hooks/useLogout';
import { getResortDashoboardDetailsApi } from '../../api/company.api';
import { IStore } from '../../interface/slice.interface';
import { toastMessage } from '../../helpers/toast';
import BarChart from '../UI/BarChart';

function ManagerDashboard() {
    const adminToken = useSelector((state: IStore) => state.adminAuth.token);
    const currentResortId = useSelector((state: IStore) => state.resort.resortId)
    const logout = useAdminLogout()

    // const [monthlyRevenueDetails, setDetails] = useState<RevenueReport[]>();
    const [resortRevenue, setResortRevenue] = useState<number>()
    const [totalUsers, setTotalUsers] = useState<number>()
    const [totalBooking, setTotalBooking] = useState<number>()
    const [roomOccupancy, setroomOccupancy] = useState<number>();
    const [monthlyRevenue, setmonthlyRevenue] = useState<
    { totalRevenue: number }[] | null
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
  const datas: any = monthlyRevenue?.map((item) => item.totalRevenue);

  return (
    <>
     
    <div className="mt-10 z-10 grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-20 justify-center mx-auto">
      <div className="bg-red-500 bg-opacity-70 gap-3 h-32 rounded flex flex-col justify-center items-center w-64">
        <div className="tracking-wide  font-black text-center">TOTAL USERS</div>
        <div className="tracking-wide font-black text-center text-4xl">{totalUsers}</div>
      </div>
      <div className="bg-red-500 h-32 bg-opacity-70 gap-3 pb-3 rounded flex flex-col justify-center items-center w-64">
        <div className="tracking-wide  font-black text-center">TOTAL REVENUE</div>
        <div className="tracking-wide font-black text-center text-3xl">₹ {resortRevenue ? resortRevenue?.toLocaleString("en-IN") : 0}</div>
      </div>
      <div className="bg-blue-500 h-32 bg-opacity-70 gap-3 rounded flex flex-col justify-center items-center w-64">
        <div className="tracking-wide  font-black text-center">TOTAL BOOKINGS</div>
        <div className="tracking-wide font-black text-center text-4xl">{totalBooking}</div>
      </div>
      <div className="bg-blue-500 bg-opacity-70 gap-3 h-32 rounded flex flex-col justify-center items-center w-64">
        <div className="tracking-wide  font-black text-center">OCCUPANCY RATE</div>
        <div className="tracking-wide font-black text-center text-3xl">{roomOccupancy}%</div>
      </div>

    </div>
    <div className="h-[430px] w-full md:flex justify-center items-center mt-10"> 
      <BarChart datas={datas} labels={labels} />
      {/* <PieChart labels={allResorts} datas={pieChartDatas} /> */}
    </div>
</>
  )
}

export default ManagerDashboard