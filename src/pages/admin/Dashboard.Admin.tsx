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
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const adminToken = useSelector((state: IStore) => state.adminAuth.token)
  useEffect(() => {
    if(!adminToken)
      navigate('/admin/login')
      // eslint-disable-next-line
  },[adminToken])
  return (
    <div className="bg-slate-400 flex flex-col items-center w-full h-screen">
      <h1 className="pt-20 ">DASHBOARD</h1>
      <Header />
      <AdminSideBar />
      <Button color="danger" OnClickItem={removeAdminToken()}  class="px-4 py-2" onClick={dispatch}>LOGOUT</Button>
    </div>
  );
}

export default AdminDashboard;
