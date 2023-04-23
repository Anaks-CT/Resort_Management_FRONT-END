import { deleteCommunityBannerApi } from "../../../../api/gallary.api";
import { updateGallary } from "../../../../store/slices/gallarySlice";
import { toastMessage } from "../../../../helpers/toast";

export default function communityDataforTable(
  item: string,
  dispatch: any,
  setOpen: any,
  setImageUrl: any,
  seteditButtonClicked: any,
  resortId: string,
  adminToken: string,
  logout: any
) {


  

  ///////////////////////////// makind a cancel and delete function here and passing to tablecell///////////////////////////

  //delete a selected large banner
  const handleDelete = (imageUrl: string) => {
    deleteCommunityBannerApi(resortId, imageUrl, adminToken)
      .then((res) => {
        dispatch(updateGallary(res.data.data))
        // giving a toast message deleted
        toastMessage("success", res.data.message)
      })
      .catch((err) => {
        if(err.response.status === 401) logout()
        toastMessage("error", err.message)
      });
  };

  // edit selected largebanner
  const handleEdit = (imageurl: string) => {
    seteditButtonClicked("editImage")
    setImageUrl(imageurl)
    setOpen(true);
  };



  return {
    image: (
      <div className="h-32 w-32 mx-auto object-contain">
        <img className="object-contain" width={100} height={32}  src={item} alt="" />
      </div>
    ),

    makeChanges: { _id: item, handleDelete, handleEdit,},
  };
}
