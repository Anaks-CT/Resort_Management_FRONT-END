import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateResort } from "../../../store/slices/resortSlice";
import { getAllResortDetailsApi } from "../../../api/resort.api";
import { IResort } from "../../../interface/resort.interface";
import Sidebar from "./Sidebar";
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

  const handleAddResortClick = () => navigate("/admin/resortManagement");

  const handleManageFaqs = () => navigate("/admin/faqManagement");

  const handleManagerClick = () => navigate("/admin/managerManagement");
  
  useEffect(() => {
    let arr: resortProp[] = [];
    arr.push({
      _id: "ResortManagement",
      name: "Manage Resorts",
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
    // eslint-disable-next-line
  }, []);

  return <Sidebar sideBarElems={resortNames} />;
}

export default AdminSideBar;
