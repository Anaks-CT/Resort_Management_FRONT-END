////////////////////////////////////////// formik onsubmit function ////////////////////////////

import { Ifaq } from "../../../interface/company.interface";
import { addFaqApi, editApi } from "../../../api/company.api";
import { toastMessage } from "../../../helpers/toast";

// formik onsubmit based on edit or add
export function formikSubmit(
  type: "add" | "edit",
  values: { question: string; answer: string },
  resetForm: () => void,
  setloading: React.Dispatch<React.SetStateAction<boolean>>,
  seterror: React.Dispatch<React.SetStateAction<string>>,
  closeModal: () => void,
  setFaqDetail: React.Dispatch<React.SetStateAction<Ifaq[] | undefined>>,
  currentFaqId: string
) {
  if (type === "add") {
    setloading(true);
    addFaqApi(values.question, values.answer)
      .then((res) => {
        setFaqDetail(res.data.data);
        closeModal();
        resetForm();
        seterror("");
        // toast message saying its suceess
        toastMessage("success", res.data.message);
      })
      .catch((err) => seterror(err.response.data.message))
      .finally(() => setloading(false));
  } else if (type === "edit") {
    setloading(true);
    editApi(currentFaqId, values.question, values.answer)
      .then((res) => {
        setFaqDetail(res.data.data);
        closeModal();
        resetForm();
        seterror("");
        // toast message saying its suceess
        toastMessage("success", res.data.message);
      })
      .catch((err) => {
        console.log(err);
        seterror(err.response.data.messaage)
      })
      .finally(() => setloading(false));
  }
}
