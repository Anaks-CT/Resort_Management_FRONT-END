////////////////////////////////////////// formik onsubmit function ////////////////////////////

import { toast } from "react-toastify";
import {
  addCommunityBannerApi,
  editCommunityBannerApi,
} from "../../../api/gallary.api";
import { updateGallary } from "../../../store/slices/gallarySlice";


// formik onsubmit based on edit or add
export function formikSubmit(
  // type: "add" | "edit",
  // values: { image: string },
  // resetForm: () => void,
  // setloading: any, // setfunction
  // dispatch: any,
  // seterror: any,
  // resortId: string
) {
  // if (type === "add") {
  //   // putting the loading button
  //   setloading(true);
  //   // setting up to upload to cloudinary
  //   const data = new FormData();
  //   data.append("file", values.image);
  //   data.append("upload_preset", "resortManagemen");
  //   data.append("cloud_name", "dhcvbjebj");
  //   // uploading to cloudinary and taking the url
  //   fetch("https://api.cloudinary.com/v1_1/dhcvbjebj/image/upload", {
  //     method: "post",
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // sending the data to the bacckend to save by calling the api
  //       addCommunityBannerApi(resortId, data.url)
  //         .then((res) => {
  //           // setting the newly fetched data from database ******* might change it to redux *******
  //           dispatch(updateGallary(res.data.data));

  //           // toast message saying its suceess
  //           toast.success("Banner added successfully", {
  //             position: "top-right",
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             theme: "light",
  //           });
  //           // closing the modal
  //           // reseting the form details in the modal to ''
  //           resetForm();
  //           seterror("");
  //         })
  //         .catch((err) => {
  //           seterror("Image not stored in the database");
  //         });
  //     })
  //     .catch((err) => {
  //       seterror("Image not uploaded to cloudinary");
  //     })
  //     .finally(() => {
  //       setloading(false);
  //     });
  // } else if (type === "edit") {
  //   // putting the loading button
  //   setloading(true);
  //   // setting up to upload to cloudinary
  //   const data = new FormData();
  //   data.append("file", values.image);
  //   data.append("upload_preset", "resortManagemen");
  //   data.append("cloud_name", "dhcvbjebj");
  //   // uploading to cloudinary and taking the url
  //   fetch("https://api.cloudinary.com/v1_1/dhcvbjebj/image/upload", {
  //     method: "post",
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // sending the data to the bacckend to save by calling the api
  //       editCommunityBannerApi(resortId, data.url, imageUrl)
  //         .then((res) => {
  //           // setting the newly fetched data from database ******* might change it to redux *******
  //           dispatch(updateGallary(res.data.data));

  //           // toast message saying its suceess
  //           toast.success("Banner image edited successfully", {
  //             position: "top-right",
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             theme: "light",
  //           });
  //           // closing the modal
  //           // reseting the form details in the modal to ''
  //           resetForm();
  //           seterror("");
  //         })
  //         .catch((err) => {
  //           seterror("Image not stored in the database");
  //         });
  //     })
  //     .catch((err) => {
  //       seterror("Image not uploaded to cloudinary");
  //     })
  //     .finally(() => {
  //       setloading(false);
  //     });
  }
// }