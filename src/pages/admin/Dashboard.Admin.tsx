import AdminSideBar from "../../components/Manager/sidebar/AdminSideBar";
import { Header } from "../../components/Manager/Header";



function AdminDashboard() {
  
  return (
    <div className="bg-slate-400 flex flex-col items-center w-full h-screen">
      <h1 className="pt-20 ">DASHBOARD</h1>
      <Header />
      <AdminSideBar />
    </div>
  );
}

export default AdminDashboard;
