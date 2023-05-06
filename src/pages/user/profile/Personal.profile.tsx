import React, { useState, useEffect } from "react";
import { Header2 } from "../../../components/User/Header/Header";
import { useFormik } from "formik";
import { profileSchema } from "../../../schema/user/profile";
import { Iuser } from "../../../interface/user.interface";
import ProfileSidebar from "../../../components/User/Sidebar";
import ProfileDetails from "../../../components/User/ProfileDetails";
import ProfileNavbar from "../../../components/User/ProfileNavbar";
import { getUserDetailsApi, updateUserDetailsApi } from "../../../api/user.api";
import { useSelector } from "react-redux";
import { IStore } from "../../../interface/slice.interface";

function PersonalPage() {
  // background image style
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0),rgba(0, 0, 0, 0.5)), url("https://res.cloudinary.com/dhcvbjebj/image/upload/v1683088154/wallpaperflare.com_wallpaper_1_txni0h.jpg")`,
  };
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
      <ProfileSidebar />
      <Header2 />
      <div
        className="bg-no-repeat bg-cover bg-center min-h-screen  text-white w-screen pt-[60px] flex justify-center" // doubt in mobile view
        style={style}
      >
        <div className="mt-10 md:mt-20 z-10 px-3 w-full flex flex-col md:items-center">
          <div className="text-sm md:text-2xl md:tracking-widest tracking-wide text-center flex justify-around items-center">
            WELCOME TO TRINITY, ANAKS
          </div>
          <ProfileNavbar currentNav="profile" />
          <div className="border border-premium md:border-2 my-5 max-w-[900px] lg:w-[900px] md:min-w-[600px]">
            <div className="p-5 bg-white bg-opacity-25">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalPage;
