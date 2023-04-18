////////////////////////////////////////// formik onsubmit function ////////////////////////////

import { toastMessage } from "../../../helpers/toast";
import { IManager } from "../../../interface/manager.interface";
import { addManager } from "../../../api/manager.api";

// formik onsubmit based on edit or add
export function formikSubmit(
  values: IManager,
  resetForm: () => void,
  setloading: React.Dispatch<React.SetStateAction<boolean>>,
  seterror: React.Dispatch<React.SetStateAction<string>>,
  closeModal: () => void,
  setmanagerDetails: React.Dispatch<React.SetStateAction<IManager[] | undefined>>,
  adminToken: string,
  logout: any
) {
    addManager(values, adminToken)
      .then(res => {
        setmanagerDetails(res.data.data)
        closeModal();
        resetForm();
        seterror("");
        // toast message saying its suceess
        toastMessage("success", res.data.message);
      })
      .catch((err) => {
        if(err.response.status === 401) logout()
        seterror(err.response.data.message)})
      .finally(() => setloading(false));
}
