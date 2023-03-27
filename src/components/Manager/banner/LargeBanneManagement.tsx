import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  addLargeBannerApi,
  editLargeBannerDetailsApi,
  getGallaryDetailsbyResortIdApi,
} from "../../../api/gallary.api";
import { IBannerDetails, IGallary } from "../../../interface/gallary.interface";
import {
  addBanner,
  editBanner,
  editImage,
} from "../../../schema/admin/AddLargeBannerForm";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import TransitionsModal from "../../UI/Modal";
import { Header } from "../Header";
import Sidebar from "../Sidebar";
import DataTable from "../../UI/table/DataTable";
import PreviewImage from "../../UI/PreviewImage";
import largeBannerDataforTable from "../../UI/table/dataFunctions/largeBannerDataforTable";
import { toast } from "react-toastify";

function LargeBanneManagement() {
  const [gallaryDetails, setgallaryDetails] = useState<IGallary>();

  ////////////////////////////// state for loading /////////////////////
  const [loading, setloading] = useState(false);

  ////////////////////////////// state for error management //////////////////////
  const [error, seterror] = useState("");

  ////////////////////////////// edit button click toggle for conditional modal control /////////////////////
  const [editButtonClicked, seteditButtonClicked] = useState(false);

  ////////////////////////////// edit image button click toggle for conditional modal control /////////////////////
  const [editImageClicked, seteditImageClicked] = useState(false);

  //////////////////////////// storing the largebanner id when edit button clicked to pass the largebanner id to front end ///////////
  const [largeBannerId, setlargeBannerId] = useState("");

  //************************* will remove  and add it to redux when a persone logged in********************//
  const resortId = "64158c7a80aa0bca76b639b5";

  //initial value will be changed when clicking edit button the set function is passed inside datafunctions
  // writing this top and calling setformikinitailvalues in closemodal
  const [formikInitialValues, setformikInitialValues] = useState({
    image: "",
    description1: "",
    description2: "",
  });

  ///////////////////////////////////////// for opening the modal and closing the modal ////////////////

  // we pass this funtions and state to the modal component and make use of it
  const [open, setOpen] = React.useState(false);
  const openModal = () => {
    setOpen(true);
    // seteditButtonClicked(true);
  };
  const closeModal = () => {
    seteditButtonClicked(true);
    setformikInitialValues({
      image: "",
      description1: "",
      description2: "",
    });
    setOpen(false);
  };

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

  /// setting up the heading for the table
  const headers = ["Image", "Description1", "Description2", "Make-Changes"];

  ////////////////////////////////////////// formik onsubmit function ////////////////////////////
  // formik onsubmit based on edit or add
  function formikAddImage(
    type: "add" | "edit",
    values: IBannerDetails,
    resetForm: () => void
  ) {
    if (type === "add") {
      // putting the loading button
      setloading(true);
      // setting up to upload to cloudinary
      const data = new FormData();
      data.append("file", values.image);
      data.append("upload_preset", "resortManagemen");
      data.append("cloud_name", "dhcvbjebj");
      // uploading to cloudinary and taking the url
      fetch("https://api.cloudinary.com/v1_1/dhcvbjebj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // sending the data to the bacckend to save by calling the api
          addLargeBannerApi(
            resortId,
            data.url,
            values.description1,
            values.description2
          )
            .then((res) => {
              // setting the newly fetched data from database ******* might change it to redux *******
              setgallaryDetails(res.data.data);
              // toast message saying its suceess
              toast.success("Banner added successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              // closing the modal
              setOpen(false);
              // reseting the form details in the modal to ''
              resetForm();
              seterror("");
            })
            .catch((err) => {
              seterror("Image not stored in the database");
            });
        })
        .catch((err) => {
          seterror("Image not uploaded to cloudinary");
        })
        .finally(() => {
          setloading(false);
        });
    } else {
      editLargeBannerDetailsApi(
        resortId,
        largeBannerId,
        values.description1,
        values.description2
      )
        .then((res) => {
          setloading(true);
          // setting the newly fetched data from database ******* might change it to redux *******
          setgallaryDetails(res.data.data);
          // toast message saying its suceess
          toast.success("Banner edited successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // closing the modal
          setOpen(false);
          // reseting the form details in the modal to ''
          resetForm();
          seterror("");
        })
        .catch((err) => {
          seterror("Image not stored in the database");
        })
        .finally(() => {
          setloading(false);
        });
    }
  }
  ///////////////////////////////////////////// formik for addimage form validation //////////////////////////

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      image: formikInitialValues.image,
      description1: formikInitialValues.description1,
      description2: formikInitialValues.description2,
    },
    // changing the schema if add image or edit banner is clicked
    validationSchema: !editButtonClicked
      ? editBanner
      : !editImageClicked
      ? editImage
      : addBanner,
    //  calling the onsubmit according to which button is called
    onSubmit: (values, { resetForm }) => {
      formikAddImage(values.image ? "add" : "edit", values, resetForm);
    },
  });

  //// calling the function and passing the data as arguments in a loop
  let arr;
  if (gallaryDetails) {
    arr = gallaryDetails.largeBanner.map((item: any) =>
      largeBannerDataforTable(
        item,
        setgallaryDetails,
        setformikInitialValues,
        setOpen,
        seteditButtonClicked,
        setlargeBannerId,
        seteditImageClicked
      )
    );
  }

  const modalForm = () => {
    return (
      <div className="flex flex-col justify-center items-center p-10">
        {error && <div className="text-red-500">{error}</div>}
        {loading && (
          <img
            width={50}
            src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1679738426/Spinner-1s-200px_1_twv42p.gif"
            alt=""
          />
        )}
        <form className="w-full bg-black bg-opacity-70">
          <h1 className="text-center mb-10">ADD BANNER</h1>
          {editButtonClicked && formik.values.image && (
            <PreviewImage file={formik.values.image} />
          )}
          {editButtonClicked && (
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
          )}
          {editButtonClicked && formik.touched.image && formik.errors.image && (
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
                setformikInitialValues({
                  image: "",
                  description1: "",
                  description2: "",
                });
                formik.resetForm();
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
        <DataTable
          rows={arr}
          headers={headers}
          setgallaryDetails={setgallaryDetails}
        />
      </div>
    </div>
  );
}

export default LargeBanneManagement;
