import { toast } from "react-toastify";
import { deleteCommunityBannerApi } from "../../../../api/gallary.api";
import { updateGallary } from "../../../../store/slices/gallarySlice";

export default function communityDataforTable(
  item: string,
  dispatch: any,
  setOpen: any,
  setImageUrl: any,
  seteditButtonClicked: any
) {

  //************************* will remove  and add it to redux when a persone logged in********************//
  const resortId = "64158c7a80aa0bca76b639b5";

  ///////////////////////////// makind a cancel and delete function here and passing to tablecell///////////////////////////

  //delete a selected large banner
  const handleDelete = (imageUrl: string) => {
    deleteCommunityBannerApi(resortId, imageUrl)
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
