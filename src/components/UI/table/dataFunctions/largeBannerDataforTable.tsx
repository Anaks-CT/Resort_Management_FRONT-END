import { toast } from "react-toastify";
import { deleteLargeBannerApi } from "../../../../api/gallary.api";
import { Idataa } from "../../../../interface/gallary.interface";
import { updateGallary } from "../../../../store/slices/gallarySlice";
import { toastMessage } from "../../../../helpers/toast";

export default function largeBannerDataforTable(
  item: Idataa,
  dispatch: any,
  setformikInitialValues: any,
  setOpen: any,
  seteditButtonClicked: any,
  setlargeBannerId: any,
  resortId: string,
  adminToken: string,
  logout: any
) {
  const { _id, image, description1, description2 } = item;



  
  ///////////////////////////// makind a cancel and delete function here and passing to tablecell///////////////////////////

  //delete a selected large banner
  const handleDelete = (largeBannerId: string) => {
    deleteLargeBannerApi(resortId, largeBannerId, adminToken)
      .then((res) => {
        dispatch(updateGallary(res.data.data)); //********************cant use this here will change this to redux */

        // giving a toast message deleted
        toastMessage("success", res.data.message)
      })
      .catch((err) => {
        if(err.response.status === 401) logout()
        toastMessage("error", err.message)
      });
  };

  // edit selected largebanner
  const handleEdit = (largeBannerId: string) => {
    setlargeBannerId(largeBannerId)
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
    setlargeBannerId(largeBannerId)
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
