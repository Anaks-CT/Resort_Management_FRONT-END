import BarChart from '../UI/BarChart';

type props = {
  resortRevenue?: number
  totalUsers?: number
  totalBooking?: number
  roomOccupancy?: number
  monthlyRevenue?: { totalRevenue?: number }[]
}

function ManagerDashboard({monthlyRevenue, resortRevenue, roomOccupancy, totalBooking, totalUsers}: props) {


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