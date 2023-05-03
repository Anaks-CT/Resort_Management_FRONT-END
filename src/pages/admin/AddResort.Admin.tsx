import React, { useState } from "react";
import { Header } from "../../components/Manager/Header";
import { IAddResort } from "../../interface/resort.interface";
import { createResortApi, editResortApi } from "../../api/resort.api";
import { useDispatch } from "react-redux";
import { updateAllResortDetails } from "../../store/slices/allResortSlice";
import { useLocation, useNavigate } from "react-router-dom";
import FormikDataForResortManagement from "../../components/Manager/resort/FormikDataForAdd&EditResort";
import { useSelector } from "react-redux";
import { IStore } from "../../interface/slice.interface";
import { useAdminLogout } from "../../hooks/useLogout";

function AddResort() {
  //////////////////////////// message passed from other pages //////////////////////////////
  // current resortDetails of the editClicked resort in resort management table
  const location = useLocation();

  const logout = useAdminLogout();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminToken = useSelector((state: IStore) => state.adminAuth.token);

  ////////////////////////////// state for loading /////////////////////

  const [loading, setloading] = useState<boolean>(false);

  ////////////////////////////// state for error management //////////////////////

  const [error, seterror] = useState<string>("");

  //////////////////////////////////////////// setting up initial values for formik //////////////////////////

  // when navigating from resortmanagement page to edit resort data of
  // the edit clicked resort is provided for edit resort page to make
  // the initial value of formik to this values
  const state = location?.state;
  let data:
    | {
        _id: string;
        resortDetails: {
          name: string;
          heading: string;
          description: string;
          image: string;
          features: string[];
        };
        location: string;
        email: string;
        customerCareNo: string;
      }[]
    | undefined;
  if (state) data = state?.data;

  let editInitialValues;
  if (data) {
    editInitialValues = {
      image: "",
      name: data[0].resortDetails.name as string,
      heading: data[0].resortDetails.heading as string,
      description: data[0].resortDetails.description as string,
      location: data[0].location as string,
      email: data[0].email as string,
      customerCareNo: data[0].customerCareNo as string,
      features: data[0].resortDetails.features as string[],
    };
  }

  const initialValues = {
    image: "",
    name: "",
    heading: "",
    description: "",
    location: "",
    email: "",
    customerCareNo: "",
    // managerId: '',
    features: [""],
  };

  ////////////////////////////// formik onsubmit function ////////////////////////
  // function according to add resort or edit resort
  const formikOnSubmit = (formValues: IAddResort) => {
    setloading(true);
    if (!data) {
      const data = new FormData();
      data.append("file", formValues.image);
      data.append("upload_preset", "resortManagemen");
      data.append("cloud_name", "dhcvbjebj");
      // uploading to cloudinary and taking the url
      fetch("https://api.cloudinary.com/v1_1/dhcvbjebj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          createResortApi(formValues, data?.url, adminToken)
            .then((res) => {
              // updating the all resort slice in redux
              dispatch(updateAllResortDetails(res.data.data));
              // sending the message to resort management paage
              navigate("/admin/resortmanagement", {
                state: { message: res.data.message },
              });
              seterror("");
            })
            .catch((err) => {
              if (err.response.status === 401) logout();
              seterror(err.response.data.message);
              setloading(false);
            });
        })
        .catch((err) => {
          seterror("Image not uploaded to cloudinary");
        })
        .finally(() => {
          setloading(false);
        });
    } else {
      //////////////////////////////////////////// edit details when image is added ///////////////////////////////

      if (formValues.image) {
        const formData = new FormData();
        formData.append("file", formValues.image);
        formData.append("upload_preset", "resortManagemen");
        formData.append("cloud_name", "dhcvbjebj");
        // uploading to cloudinary and taking the url
        fetch("https://api.cloudinary.com/v1_1/dhcvbjebj/image/upload", {
          method: "post",
          body: formData,
        })
          .then((res) => res.json())
          .then((responseData) => {
            editResortApi(
              formValues,
              responseData?.url,
              data && data[0]._id,
              adminToken
            )
              .then((res) => {
                // updating the all resort slice in redux
                dispatch(updateAllResortDetails(res.data.data));
                // sending the message to resort management page
                navigate("/admin/resortmanagement", {
                  state: { message: res.data.message },
                });
                seterror("");
              })
              .catch((err) => {
                if (err.response.status === 401) logout();
                seterror(err.response.data.message);
                setloading(false);
              });
          })
          .catch((err) => {
            seterror("Image not uploaded to cloudinary");
          })
          .finally(() => {
            setloading(false);
          });
      } else {
        ////////////////////////////////////// edit details when image is not added ////////////////////////////////

        editResortApi(formValues, null, data && data[0]._id, adminToken)
          .then((res) => {
            // updating the all resort slice in redux
            dispatch(updateAllResortDetails(res.data.data));
            // seding the messaage to resort management page to display the message sent from backend
            navigate("/admin/resortmanagement", {
              state: { message: res.data.message },
            });
            seterror("");
          })
          .catch((err) => {
            if (err.response.status === 401) logout();
            seterror(err.response.data.message);
            setloading(false);
          })
          .finally(() => {
            setloading(false);
          });
      }
    }
  };
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.7)), url("https://res.cloudinary.com/dhcvbjebj/image/upload/v1683015725/wallpaperflare.com_wallpaper_9_s9z82o.jpg")`,
  };
  return (
    <>
      <Header />
      <div
        className="bg-no-repeat bg-fixed bg-center h-full w-screen pt-[60px] flex justify-center" // doubt in mobile view
        style={style}
      >
        <FormikDataForResortManagement
          data={data}
          editInitialValues={editInitialValues}
          error={error}
          formikOnSubmit={formikOnSubmit}
          initialValues={initialValues}
          loading={loading}
        />
      </div>
    </>
  );
}

export default AddResort;
