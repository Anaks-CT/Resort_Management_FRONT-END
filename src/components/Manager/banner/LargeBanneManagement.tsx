import { useFormik } from "formik";
import React, { useEffect, useState, useRef } from "react";
import { getGallaryDetailsbyResortIdApi } from "../../../api/gallary.api";
import { IBannerDetails, Idataa, IGallary } from "../../../interface/gallary.interface";
import { addImageSchema } from "../../../schema/admin/AddLargeBannerForm";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import TransitionsModal from "../../UI/Modal";
import { Header } from "../Header";
import Sidebar from "../Sidebar";
import DataTable from "../../UI/table/DataTable";
import PreviewImage from "../../UI/PreviewImage";
import CreateData from "../../UI/table/dataFunctions/CreateData";
// import CreateData from "../../UI/table/dataFunctions/CreateData";

function LargeBanneManagement() {
  const [gallaryDetails, setgallaryDetails] = useState<IGallary>();

  ///////////////////////////////////////// for opening the modal and closing the modal ////////////////

  // we pass this funtions and state to the modal component and make use of it
  const [open, setOpen] = React.useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  ///////////////////////////////////// fetching gallary details by corrresponding resortId ///////////////////

  useEffect(() => {
    getGallaryDetailsbyResortIdApi("64158c7a80aa0bca76b639b5")
      .then((res) => {
        setgallaryDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  

  //// calling the function and passing the data as arguments in a loop
  let arr;
  if (gallaryDetails) {
    arr = gallaryDetails.largeBanner.map((item: any) => CreateData(item));
  }

  /// setting up the heading for the table
  const headers = ["Image", "Description1", "Description2", "Make-Changes"];

  ///////////////////////////////////////////// formik for addimage form validation //////////////////////////

  const formik = useFormik({
    initialValues: {
      image: "",
      description1: "",
      description2: "",
    },
    validationSchema: addImageSchema,
    onSubmit: (values, { resetForm }) => {
      // uploading to cloudinary
      const data = new FormData();
      data.append("file", values.image);
      data.append("upload_preset", "resortManagemen");
      data.append("cloud_name", "dhcvbjebj");

      fetch("https://api.cloudinary.com/v1_1/dhcvbjebj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });

      setOpen(false);
      resetForm();
      console.log(values);
    },
  });

  const modalForm = () => {
    return (
      <div className="flex flex-col justify-center items-center p-10">
        <form className="w-full bg-black bg-opacity-70">
          <h1 className="text-center mb-10">ADD BANNER</h1>
          {formik.values.image && <PreviewImage file={formik.values.image} />}
          <Input
            type="file"
            class="bg-black "
            onChange={(event) => {
              event.target.files &&
                formik.setFieldValue("image", event.target.files[0]);
            }}
            placeholder="Choose File"
            required
            name="image"
            value={undefined}
          />
          {formik.touched.image && formik.errors.image && (
            <div className="text-red-500">{formik.errors.image}</div>
          )}
          <Input
            type="text"
            class="bg-black "
            onChange={formik.handleChange}
            placeholder="Description1"
            required
            name="description1"
            value={formik.values.description1}
          />
          {formik.touched.description1 && formik.errors.description1 && (
            <div className="text-red-500">{formik.errors.description1}</div>
          )}
          <Input
            type="text"
            class="bg-black "
            onChange={formik.handleChange}
            placeholder="Description2"
            required
            name="description2"
            value={formik.values.description2}
          />
          {formik.touched.description2 && formik.errors.description2 && (
            <div className="text-red-500">{formik.errors.description2}</div>
          )}
          <div className="flex w-full justify-around mt-10">
            <Button
              color="success"
              onClick={formik.handleSubmit}
              class="px-10 py-3"
            >
              ADD
            </Button>
            <Button
              color="danger"
              class="px-10 py-3"
              onClick={() => {
                setOpen(false);
              }}
            >
              CANCEL
            </Button>
          </div>
        </form>
      </div>
    );
  };
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="mt-20 p-10 text-center">
        <h1 className="text-center mb-10">LARGE BANNER</h1>
        <TransitionsModal
          modalForm={modalForm}
          open={open}
          openModal={openModal}
          closeModal={closeModal}
        />
        <DataTable rows={arr} headers={headers} />
      </div>
    </div>
  );
}

export default LargeBanneManagement;
