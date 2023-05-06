import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { profileSchema } from "../../../schema/user/profile";
import { Iuser } from "../../../interface/user.interface";
import ProfileDetails from "../../../components/User/ProfileDetails";
import { getUserDetailsApi, updateUserDetailsApi } from "../../../api/user.api";
import { useSelector } from "react-redux";
import { IStore } from "../../../interface/slice.interface";

function PersonalPage() {
  const [success, setSuccess] = useState('')
  const [error, setError] = useState("");
  // loading states
  const [saveButtonClicked, setSaveButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Iuser>();
  // getting user token from redux
  const userToken = useSelector((state: IStore) => state.userAuth.token);
  // fetching user Detials
  useEffect(() => {
    setLoading(true);
    getUserDetailsApi(userToken)
      .then((res) => setUser(res.data.data))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  // formik
  const initialValues = {
    image: "",
    name: user?.name ? user.name : "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: profileSchema,
    onSubmit: (values) => {
      setSaveButtonClicked(true)
      if(values.image){const data = new FormData();
      data.append("file", values.image);
      data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET!);
      data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME!);
      // uploading to cloudinary and taking the url
      fetch("https://api.cloudinary.com/v1_1/dhcvbjebj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // sending the data to the bacckend to save by calling the api
          updateUserDetailsApi(userToken, values.name,  data.url)
            .then((res) => {
              setUser(res.data.data);
              setError("");
              setSuccess("Changes saved successfully")
            })
            .catch((err) => setError(err?.response?.data?.message));
        })
        .catch((err) => setError("Image not uploaded to cloudinary"))
        .finally(() => setSaveButtonClicked(false));}
        else{
          updateUserDetailsApi(userToken, values.name)
            .then((res) => {
              setUser(res.data.data);
              setError("");
              setSuccess("Changes saved successfully")
            })
            .catch((err) => setError(err?.response?.data?.message))
            .finally(() => setSaveButtonClicked(false))
        }
    },
  });
  return (
    <>

              <div className="text-green-500 text-center">{success}</div>
              {loading ? (
                <div className="flex justify-center">
                  <img
                    width={50}
                    src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1680669482/Spinner-1s-200px_4_ontbds.gif"
                    alt=""
                  />
                </div>
              ) : (
                <ProfileDetails
                  formik={formik}
                  user={user}
                  saveButtonClicked={saveButtonClicked}
                  error={error}
                />
              )}
    </>
  );
}

export default PersonalPage;
