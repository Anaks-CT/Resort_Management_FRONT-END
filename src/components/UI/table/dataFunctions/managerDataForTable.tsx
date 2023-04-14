import { toastMessage } from "../../../../helpers/toast";
import { IManager } from "../../../../interface/manager.interface";
import { ChangeManagerStatusApi } from "../../../../api/manager.api";

export default function managerDataForTable(
  item: any,
  setmanagerDetails: React.Dispatch<React.SetStateAction<IManager[] | undefined>>,
) {

  ///////////////////////////// makind a cancel and delete function here and passing to tablecell///////////////////////////

  //change status of selected manager
  const handleDelete = (managerId: string) => {
    // api call to change room status
    ChangeManagerStatusApi(managerId)
      .then(res => {
        setmanagerDetails(res.data.data)
        toastMessage("success", res.data.message)
      })
      .catch(err => toastMessage("error", err.response.data.message))
    
  };


  return {
        image: (
          item.profile ?(
            <img
              src={item.profile}
              className="object-contain"
              width="100px"
              height="150px"
              alt=""
            ></img>
          ):"Profile Not Added"
        ),
        name: item.name,
        email: item.email,
        phone: item.phone,
        resort: item.resortId?.resortDetails?.name,
        makeChanges: {
          _id: item._id,
          active: item.active,
          handleDelete,
        },
    }
  };
