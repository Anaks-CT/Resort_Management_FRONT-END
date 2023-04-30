import { useFormik } from "formik";
import React, { useState } from "react";
import { editImage } from "../../../../schema/admin/addLargeBannerForm";
import TransitionsModal from "../../../UI/Modal";
import DataTable from "../../../UI/table/DataTable";
import { formikSubmit } from "./formikSubmitFuntion";
import { modalForm } from "./modalForm";
import communityDataforTable from "../../../UI/table/dataFunctions/communityDataforTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IStore } from "../../../../interface/slice.interface";
import {useAdminLogout} from "../../../../hooks/useLogout";



function CommunityBannerManagement() {
  const gallaryDetails = useSelector((state: IStore) => state.gallary) 
  const adminToken = useSelector((state: IStore) => state.adminAuth.token)
  const dispatch = useDispatch()

  const resortId = useSelector((state: IStore) => state.resort.resortId)

  const logout = useAdminLogout()

  ////////////////////////////// state for loading /////////////////////
  const [loading, setloading] = useState(false);

  ////////////////////////////// state for error management //////////////////////
  const [error, seterror] = useState("");

  ////////////////////////////// edit button click toggle for conditional modal control /////////////////////
  type user = "nothingClicked" | "editImage";
  const [editButtonClicked, seteditButtonClicked] =
    useState<user>("nothingClicked");

  //////////////////////////// storing the community banner id when edit button clicked to pass the community banner id to front end ///////////
  const [imageUrl, setImageUrl] = useState("");

  ///////////////////////////////////////// for opening the modal and closing the modal ////////////////

  // we pass this funtions and state to the modal component and make use of it
  const [open, setOpen] = React.useState(false);
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    formik.resetForm()
    setOpen(false);
    seteditButtonClicked("nothingClicked");
    setloading(false)
    seterror('')
  };



  //////////////////////////////////////// defining the headers for my table data ///////////////////////////

  // will use this headers and change them into sortable buttons or labels according the to the table data
  const headers = ["Image", "Make-Changes"];
  const headerDiv = headers.map((item) => {
    return <span key={item}>{item}</span>;
  });




  function formikOnsubmitType() {
    if (editButtonClicked === "nothingClicked") {
      return "add";
    } else {
      return "editImage";
    }
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      image: "",
    },
    validationSchema: editImage,
    //  calling the onsubmit according to which button is called
    onSubmit: (values, { resetForm }) => {
      // calling the onsubmit function
      formikSubmit(
        formikOnsubmitType(),
        values,
        resetForm,
        setloading,
        dispatch,
        setOpen,
        seterror,
        imageUrl,
        resortId,
        adminToken,
        logout
      );
    },
  });

  
  let arr = gallaryDetails?.communityPics.map((item: any) =>
  communityDataforTable(item, dispatch, setOpen, setImageUrl, seteditButtonClicked, resortId, adminToken, logout)
  );

  
console.log(gallaryDetails);

  return (
    <div>
      <div className="mt-20 p-10 text-center">
        <h1 className="text-center mb-10">COMMUNITY PICS</h1>
        <TransitionsModal
          buttonMessage="ADD BANNER"
          modalForm={() => modalForm(error, loading, formik, setOpen, closeModal)}
          open={open}
          openModal={openModal}
          closeModal={closeModal}
        />

        <DataTable rows={arr} headers={headerDiv} />
      </div>
    </div>
  );
}

export default CommunityBannerManagement;
