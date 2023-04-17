 ////////////////////////////////////////// formik onsubmit function ////////////////////////////

 import { addSmallBannerApi, editSmallBannerDetailsApi, editSmallBannerImageApi } from "../../../../api/gallary.api";
 import { IBannerDetails } from "../../../../interface/gallary.interface";
import { updateGallary } from "../../../../store/slices/gallarySlice";
import { toastMessage } from "../../../../helpers/toast";
 
   // formik onsubmit based on edit or add
   export function formikSubmit(
     type: "add" | "editDes" | "editImage",
     values: IBannerDetails,
     resetForm: () => void,
     setloading: any, // setfunction
     dispatch: any,
     setOpen: any,
     seterror: any,
     smallBannerId: string,
     resortId: string,
     closeModal: any,
     adminToken: string
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
           addSmallBannerApi(
             resortId,
             data.url,
             values.description1,
             values.description2,
             adminToken
           )
             .then((res) => {
               // setting the newly fetched data from database ******* might change it to redux *******
               dispatch(updateGallary(res.data.data))
               // toast message saying its suceess
               toastMessage("success", res.data.message)
               // closing the modal
              closeModal()
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
     } else if (type === "editDes") {
       editSmallBannerDetailsApi(
         resortId,
         smallBannerId,
         values.description1,
         values.description2,
         adminToken
       )
         .then((res) => {
           setloading(true);
           // setting the newly fetched data from database ******* might change it to redux *******
           dispatch(updateGallary(res.data.data))
           // toast message saying its suceess
           toastMessage("success", res.data.message)
           // closing the modal
          closeModal()
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
     } else if (type === "editImage") {
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
           editSmallBannerImageApi(resortId, smallBannerId, data.url, adminToken)
             .then((res) => {
               // setting the newly fetched data from database ******* might change it to redux *******
               dispatch(updateGallary(res.data.data))
               // toast message saying its suceess
               toastMessage('success', res.data.message)
               // closing the modal
              closeModal()
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
     }
   }