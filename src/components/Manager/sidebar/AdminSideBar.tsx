import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateResort } from "../../../store/slices/resortSlice";
import { getAllResortDetailsApi } from "../../../api/resort.api";
import Sidebar from "../../UI/Sidebar";
import { updateAllResortDetails } from "../../../store/slices/allResortSlice";
import { useSelector } from "react-redux";
import { IStore } from "../../../interface/slice.interface";
import { toastMessage } from "../../../helpers/toast";
import { removeAdminToken } from "../../../store/slices/adminTokenSlice";
type resortProp = {
  _id: string;
  name: string;
  onClick: (resortId: string, resortName: string) => void;
};

function AdminSideBar() {
  const [resortNames, setResortNames] = useState<resortProp[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // when clicking resorts in sidebar
  const handleClickResort = (resortId: string, resortName: string) => {
    dispatch(updateResort({ resortId, resortName }));
    navigate(`/admin/${resortName}/dashboard`);
  };

  const resortDetails = useSelector((state: IStore) => state.allResort)

  // fetching all resorts and dispatching to redux state
  useEffect(() => {
    getAllResortDetailsApi()
      .then((res) => {
        dispatch(updateAllResortDetails(res.data.data))
      })
      .catch((err) => toastMessage('error', err?.response?.data?.message))
      // eslint-disable-next-line
  },[])

  const handleAddResortClick = () => navigate("/admin/resortManagement");

  const handleManageFaqs = () => navigate("/admin/faqManagement");

  const handleManagerClick = () => navigate("/admin/managerManagement");
  
  const handleDashBoardClick = () => navigate("/admin/dashboard");

  const handleLogoutClick = () => dispatch(removeAdminToken())
  
  useEffect(() => {
    let arr: resortProp[] = [];
    arr.push({
      _id: "ResortManagement",
      name: "Resorts",
      onClick: handleAddResortClick,
    });
    arr.push({
      _id: "FaqManagement",
      name: "F A Q S",
      onClick: handleManageFaqs,
    });
    arr.push({
      _id: "Manager",
      name: "Manager",
      onClick: handleManagerClick,
    });
    arr.push({
      _id: "Dashboard",
      name: "Dashboard",
      onClick: handleDashBoardClick,
    });

    resortDetails?.forEach(item => {
      arr.push({
        _id: item._id,
        name: item.resortDetails.name,
        onClick: handleClickResort,
      })
    })
    setResortNames(arr)

    arr.push({
      _id: "Logout",
      name: "Logout",
      onClick: handleLogoutClick,
    });
    // eslint-disable-next-line
  }, [resortDetails]);

  return <Sidebar sideBarElems={resortNames} />;
}

export default AdminSideBar;
