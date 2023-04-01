import { useEffect, useState } from "react";
import { Header } from "../../components/Manager/Header";
import Sidebar from "../../components/Manager/Sidebar";
import { getAllResortDetailsApi, getResortByIdApi } from "../../api/resort.api";
import { IResort } from '../../interface/resort.interface'

type resortProp = {_id: string, name: string, onClick: (resortId: string)  => void}

function AdminDashboard() {
  const [resortNames, setResortNames] = useState<resortProp[]>([])
  
  // when clicking resorts in sidebar
  const handleClickResort = (resortId: string) => {
    getResortByIdApi(resortId)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getAllResortDetailsApi()
      .then((res) => {
        let arr:resortProp[] = []
        res.data.data.forEach((item: IResort) => {
          arr.push({_id: item._id, name: item.resortDetails.name, onClick: handleClickResort})
        })
        setResortNames(arr)
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);

  return (
    <div className="bg-slate-400 w-full h-screen">
      <Header />
      <Sidebar sideBarElems={resortNames}/>
    </div>
  );
}

export default AdminDashboard;
