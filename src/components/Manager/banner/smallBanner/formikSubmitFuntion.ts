 ////////////////////////////////////////// formik onsubmit function ////////////////////////////

 import { toast } from "react-toastify";
 import { addSmallBannerApi, editSmallBannerDetailsApi, editSmallBannerImageApi } from "../../../../api/gallary.api";
 import { IBannerDetails } from "../../../../interface/gallary.interface";
import { updateGallary } from "../../../../store/slices/gallarySlice";
 const resortId = "64158c7a80aa0bca76b639b5";
 
   // formik onsubmit based on edit or add
   export function formikSubmit(
     type: "add" | "editDes" | "editImage",
     values: IBannerDetails,
     resetForm: () => void,
     setloading: any, // setfunction
     dispatch: any,
     setOpen: any,
     seterror: any,
     smallBannerId: string
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
             values.description2
           )
             .then((res) => {
               // setting the newly fetched data from database ******* might change it to redux *******
               dispatch(updateGallary(res.data.data))
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
     } else if (type === "editDes") {
       editSmallBannerDetailsApi(
         resortId,
         smallBannerId,
         values.description1,
         values.description2
       )
         .then((res) => {
           setloading(true);
           // setting the newly fetched data from database ******* might change it to redux *******
           dispatch(updateGallary(res.data.data))
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
           editSmallBannerImageApi(resortId, smallBannerId, data.url)
             .then((res) => {
               // setting the newly fetched data from database ******* might change it to redux *******
               dispatch(updateGallary(res.data.data))
               // toast message saying its suceess
               toast.success("Banner image edited successfully", {
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
     }
   }