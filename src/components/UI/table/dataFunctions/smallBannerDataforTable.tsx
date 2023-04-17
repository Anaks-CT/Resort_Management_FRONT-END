import { toast } from "react-toastify";
import { deleteSmallBannerApi } from "../../../../api/gallary.api";
import { Idataa } from "../../../../interface/gallary.interface";
import { updateGallary } from "../../../../store/slices/gallarySlice";

export default function smallBannerDataforTable(
  item: Idataa,
  dispatch: any,
  setformikInitialValues: any,
  setOpen: any,
  seteditButtonClicked: any,
  setSmallBannerId: any,
  resortId: string,
  adminToken: string
) {
  const { _id, image, description1, description2 } = item;



  ///////////////////////////// makind a cancel and delete function here and passing to tablecell///////////////////////////

  //delete a selected large banner
  const handleDelete = (largeBannerId: string) => {
    deleteSmallBannerApi(resortId, largeBannerId, adminToken)
      .then((res) => {
        dispatch(updateGallary(res.data.data))
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
