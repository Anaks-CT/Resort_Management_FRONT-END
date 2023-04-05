import { useEffect, useState } from "react";
import { Header } from "../../components/Manager/Header";
import Sidebar from "../../components/Manager/Sidebar";
import { getAllResortDetailsApi, getResortByIdApi } from "../../api/resort.api";
import { IResort } from "../../interface/resort.interface";
import { useDispatch } from "react-redux";
import { updateResort } from "../../store/slices/resortSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

type resortProp = {
  _id: string;
  name: string;
  onClick: (resortId: string, resortName: string) => void;
};
type store = {
  resort: { resortId: string; resortName: string };
};

function AdminDashboard() {
  const [resortNames, setResortNames] = useState<resortProp[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resort = useSelector((state: store) => state.resort);

  // when clicking resorts in sidebar
  const handleClickResort = (resortId: string, resortName: string) => {
    dispatch(updateResort({ resortId, resortName }));
  };
  // if(resort.resortName){
  // }
  useEffect(() => {
    if(resort.resortName)
      navigate(`/admin/${resort.resortName}/dashboard`);
  }, [resort.resortName]);

  const handleAddResortClick = () => {
    navigate('/admin/resortManagement')
  }

  useEffect(() => {
    let arr: resortProp[] = [];
    getAllResortDetailsApi()
      .then((res) => {
        res.data.data.forEach((item: IResort) => {
          arr.push({
            _id: item._id,
            name: item.resortDetails.name,
            onClick: handleClickResort,
          });
        });
        setResortNames(arr);
      })
      .catch((err) => {
        console.log(err);
      });
      arr.push({_id: 'ResortManagement', name: "Manage Resorts", onClick: handleAddResortClick})
  }, []);

  return (
    <div className="bg-slate-400 flex flex-col items-center w-full h-screen">
      <h1 className="pt-20 ">DASHBOARD</h1>
      <Header />
      <Sidebar sideBarElems={resortNames} />
    </div>
  );
}

export default AdminDashboard;
