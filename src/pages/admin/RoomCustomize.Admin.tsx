import React, { useState } from "react";
import AddEditRoomForm from "../../components/Manager/room/AddEditRoomForm";
import { Header } from "../../components/Manager/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { IAddRoom } from "../../interface/room.interface";
import AdminResortSideBar from "../../components/Manager/sidebar/AdminResortSideBar";
import { createRoomApi, updateRoomApi } from "../../api/room.api";
import { useSelector } from "react-redux";
import { IStore } from "../../interface/slice.interface";
import {useAdminLogout} from "../../hooks/useLogout";

function RoomCustomize() {
  //////////////////////////// message passed from other pages //////////////////////////////
  // current roomDetails of the editClicked room in room management table
  const location = useLocation();

  const navigate = useNavigate();

  const currentResort = useSelector((state: IStore) => state.resort);
  const adminToken = useSelector((state: IStore) => state.adminAuth.token);

  const logout = useAdminLogout()

  ////////////////////////////// state for loading /////////////////////

  const [loading, setloading] = useState<boolean>(false);

  ////////////////////////////// state for error management //////////////////////

  const [error, seterror] = useState<string>("");

  //////////////////////////////////////////// setting up initial values for formik //////////////////////////

  // when navigating from roommanagement page to edit room data of
  // the edit clicked room is provided for edit room page to make
  // the initial value of formik to this values
  const state = location?.state;
  let data: any;
  // | {
  //     _id: string;

  //     location: string;
  //     email: string;
  //     customerCareNo: string;
  //   }[]
  // | undefined;
  if (state) data = state?.data;

  let editInitialValues;
  if (data) {
    editInitialValues = {
      images: [],
      name: data[0].name,
      description: data[0].description,
      area: data[0].area,
      packages: data[0].packages,
      maxPeople: data[0].maxPeople,
      noOfRooms: data[0].roomNumbers.length,
      highlights: data[0].highlights,
      amenities: data[0].amenities,
      facilities: data[0].facilities,
    };
  }

  const initialValues = {
    images: [],
    name: "",
    description: "",
    area: "",
    packages: [
      {
        packageName: "",
        cost: "",
        features: [""],
      },
    ],
    maxPeople: "",
    noOfRooms: "",
    highlights: [""],
    amenities: [""],
    facilities: [""],
  };

  ////////////////////////////// formik onsubmit function ////////////////////////
  // function according to add room or edit room
  const formikOnSubmit = (formValues: IAddRoom, roomId?: string) => {
    setloading(true);
    // checking if the data has value
    // if data has value it means it means it is an edit submit
    if (!data) {
      // making a function for making formData to send to cloudinary so that can be called in a loop 
      const uploadImage = (image: any) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "resortManagemen");
        data.append("cloud_name", "dhcvbjebj");

        return fetch("https://api.cloudinary.com/v1_1/dhcvbjebj/image/upload", {
          method: "post",
          body: data,
        }).then((response) => response.json());
      };
      // sending all the images at the same time to cloudinary to reduce time
      Promise.all(formValues.images.map((item) => uploadImage(item)))
        .then((data) => {
          let images: any[] = [];
          data.forEach((item) => images.push(item.secure_url));
          createRoomApi(currentResort.resortId, {
            ...formValues,
            images: images,
          }, adminToken)
            .then((res) => {
              navigate(`/admin/${currentResort}/room`, {
                state: { message: res.data.message },
              });
              seterror("");
            })
            .catch((err) => {
              if(err.response.status === 401) logout()
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

      if (formValues.images.length > 0) {
        const uploadImage = (image: any) => {
          const data = new FormData();
          data.append("file", image);
          data.append("upload_preset", "resortManagemen");
          data.append("cloud_name", "dhcvbjebj");

          return fetch(
            "https://api.cloudinary.com/v1_1/dhcvbjebj/image/upload",
            {
              method: "post",
              body: data,
            }
          ).then((response) => response.json());
        };
        Promise.all(formValues.images.map((item) => uploadImage(item)))
        .then((data) => {
          let images: any[] = [];
          data.forEach((item) => images.push(item.secure_url));
            updateRoomApi(currentResort.resortId, {...formValues, images}, adminToken, roomId,)
              .then((res) => {
                // navigating and passing the message to the table page
            navigate(`/admin/${currentResort.resortName}/room`, {
              state: { message: res.data.message },
            });
            // setting the previous error if any to empty
            seterror('')
              })
              .catch((err) => {
                if(err.response.status === 401) logout()
                seterror(err.response.data.message)})
              .finally(() => setloading(false))  
          })
          .catch((err) => seterror("Image not uploaded to cloudinary"))
          .finally(() => setloading(false));
      } else {
        ////////////////////////////////////// edit details when image is not added ////////////////////////////////
        updateRoomApi(currentResort.resortId, formValues, adminToken, roomId)
          .then((res) => {
            // navigating and passing the message to the table page
            navigate(`/admin/${currentResort.resortName}/room`, {
              state: { message: res.data.message },
            });
            // setting the previous error if any to empty
            seterror('')
          })
          .catch((err) => {
            if(err.response.status === 401) logout()
            seterror(err.response.data.message)})
          .finally(() => setloading(false))
      }
    }
  };

  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0),rgba(0, 0, 0, 0.7)), url("https://res.cloudinary.com/dhcvbjebj/image/upload/v1683015725/wallpaperflare.com_wallpaper_9_s9z82o.jpg")`,
  };
  return (
<>
      <Header />
      <div
        className="bg-no-repeat bg-fixed bg-center h-full w-screen pt-[60px] flex justify-center" // doubt in mobile view
        style={style}
      >
      <AdminResortSideBar />
      <AddEditRoomForm
        data={data && data[0]}
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

export default RoomCustomize;
