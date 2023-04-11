import React, { useState } from "react";
import AddEditRoomForm from "../../components/Manager/room/AddEditRoomForm";
import { Header } from "../../components/Manager/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IAddRoom } from "../../interface/room.interface";
import AdminResortSideBar from "../../components/Manager/sidebar/AdminResortSideBar";
import { createRoomApi, updateRoomApi } from "../../api/room.api";
import { useSelector } from "react-redux";
import { IStore } from "../../interface/slice.interface";

function RoomCustomize() {
  //////////////////////////// message passed from other pages //////////////////////////////
  // current roomDetails of the editClicked room in room management table
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentResort = useSelector((state: IStore) => state.resort)


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
    
    // setloading(true);
    if (!data) {
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
      Promise.all(formValues.images.map(item =>uploadImage(item)))
        .then((data) => {
          console.log(data)
          let images:any[] = []
          data.forEach(item => images.push(item.secure_url))
          createRoomApi(currentResort.resortId,  {...formValues, images: images})
            .then((res) => {
              navigate(`/admin/${currentResort}/room`, {
                state: { message: res.data.message },
              });
              seterror("");
            })
            .catch((err) => {
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
        console.log('enhfd');
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
        Promise.all(formValues.images.map(item =>uploadImage(item)))
          .then((responseData) => {
            updateRoomApi(currentResort.resortId, formValues)
              .then(res => console.log(res))
              .catch(err => console.log(err))
            // editResortApi(formValues, responseData?.url, data && data[0]._id)
            //   .then((res) => {
            //     // updating the all resort slice in redux
            //     dispatch(updateAllResortDetails(res.data.data));
            //     // sending the message to resort management page
            //     navigate("/admin/resortmanagement", {
            //       state: { message: res.data.message },
            //     });
            //     seterror("");
            //   })
            //   .catch((err) => {
            //     seterror(err.response.data.message);
            //     setloading(false);
            //   });
          })
          .catch((err) => {
            seterror("Image not uploaded to cloudinary");
          })
          .finally(() => {
            setloading(false);
          });
      } else {
        ////////////////////////////////////// edit details when image is not added ////////////////////////////////
        console.log('object');
          console.log(roomId)
          updateRoomApi(currentResort.resortId, formValues, roomId)
              .then(res => {navigate(`/admin/${currentResort.resortName}/room`)})
              .catch(err => console.log(err))
        // editResortApi(formValues, null, data && data[0]._id)
        //   .then((res) => {
        //     // updating the all resort slice in redux
        //     dispatch(updateAllResortDetails(res.data.data));
        //     // seding the messaage to resort management page to display the message sent from backend
        //     navigate("/admin/resortmanagement", {
        //       state: { message: res.data.message },
        //     });
        //     seterror("");
        //   })
        //   .catch((err) => {
        //     seterror(err.response.data.message);
        //     setloading(false);
        //   })
        //   .finally(() => {
        //     setloading(false);
        //   });
      }
    }
  };
  return (
    <div className="bg-slate-400 w-full h-full min-h-screen">
      <Header />
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
  );
}

export default RoomCustomize;
