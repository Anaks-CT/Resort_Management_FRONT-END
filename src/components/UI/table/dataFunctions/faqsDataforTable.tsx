import { deleteFaqApi } from "../../../../api/company.api";
import { Ifaq } from "../../../../interface/company.interface";
import { toastMessage } from "../../../../helpers/toast";
// import UnauthorizedRoute from "../../../../helpers/unauthorizedRoute";

type user = "nothingClicked" | "editClicked";
export default function faqsDataforTable(
  item: Ifaq,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  seteditButtonClicked: React.Dispatch<React.SetStateAction<user>>,
  setFaqDetail: React.Dispatch<React.SetStateAction<Ifaq[] | undefined>>,
  setformikInitialValues: React.Dispatch<React.SetStateAction<{
    question: string;
    answer: string;
}>>,
setCurrentFaqId: React.Dispatch<React.SetStateAction<string>>,
adminToken: string,
logout: any
) {
  const { _id, Q, A } = item;


  
  ///////////////////////////// makind a cancel and delete function here and passing to tablecell///////////////////////////

  //delete a selected faq
  const handleDelete = (id: string) => {
    deleteFaqApi(id, adminToken)
        .then(res => {
            setFaqDetail(res.data.data)
            toastMessage("success",res.data.message)
        })
        .catch(err => {
          if(err.response.status === 401) logout()
          toastMessage("error", err.response.data.message)
        })
        
  };

  // edit selected faq
  const handleEdit = (id: string) => {
    setCurrentFaqId(id)
    setformikInitialValues({question: Q, answer: A})
    seteditButtonClicked('editClicked');
    setOpen(true);
  };


  return {
    description1: <div className="mx-auto text-start">{Q}</div>,
    description2: <div className="mx-auto text-start">{A}</div>,
    makeChanges: { _id, handleDelete, handleEdit },
  };
}
