import { toast } from "react-toastify";
import { deleteLargeBannerApi, deleteSmallBannerApi } from "../../../../api/gallary.api";
import { Idataa } from "../../../../interface/gallary.interface";

export default function smallBannerDataforTable(
  item: Idataa,
  setgallaryDetails: any,
  setformikInitialValues: any,
  setOpen: any,
  seteditButtonClicked: any,
  setSmallBannerId: any,
  // seteditImageClicked: any
) {
  const { _id, image, description1, description2 } = item;

  //************************* will remove  and add it to redux when a persone logged in********************//
  const resortId = "64158c7a80aa0bca76b639b5";

  ///////////////////////////// makind a cancel and delete function here and passing to tablecell///////////////////////////

  //delete a selected large banner
  const handleDelete = (largeBannerId: string) => {
    deleteSmallBannerApi(resortId, largeBannerId)
      .then((res) => {
        setgallaryDetails(res.data.data); //********************cant use this here will change this to redux */
        // giving a toast message deleted
        toast.error("Banner deleted !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  // edit selected largebanner
  const handleEdit = (largeBannerId: string) => {
    setSmallBannerId(largeBannerId)
    seteditButtonClicked('editDescription');
    // changing the formik initial values
    setformikInitialValues({
      description1: description1,
      description2: description2,
    });
    setOpen(true);
  };

  const handleEditImage = (largeBannerId: string) => {
    setformikInitialValues({
      image: ''
    });
    setSmallBannerId(largeBannerId)
    seteditButtonClicked('editImage')
    setOpen(true)
  }

  return {
    image: (
      <div className="h-32 w-32 mx-auto object-contain">
        <img src={image} alt="" />
      </div>
    ),
    description1: <div className="w-[300px] mx-auto">{description1}</div>,
    description2: <div className="w-[300px] mx-auto">{description2}</div>,
    makeChanges: { _id, handleDelete, handleEdit, handleEditImage, extraEditButton: true },
  };
}
