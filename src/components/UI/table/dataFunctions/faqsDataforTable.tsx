import { toast } from "react-toastify";
import { deleteFaqApi } from "../../../../api/company.api";
import { Ifaq } from "../../../../interface/company.interface";
import { toastMessage } from "../../../../helpers/toast";

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
setCurrentFaqId: React.Dispatch<React.SetStateAction<string>>
) {
  const { _id, Q, A } = item;



  
  ///////////////////////////// makind a cancel and delete function here and passing to tablecell///////////////////////////

  //delete a selected faq
  const handleDelete = (id: string) => {
    deleteFaqApi(id)
        .then(res => {
            setFaqDetail(res.data.data)
            toastMessage("success",res.data.message)
        })
        .catch(err => toastMessage("error", err.response.data.message))
        
  };

  // edit selected faq
  const handleEdit = (id: string) => {
    setCurrentFaqId(id)
    setformikInitialValues({question: Q, answer: A})
    seteditButtonClicked('editClicked');
    setOpen(true);
  };


  return {
    description1: <div className="pl-12 mx-auto text-start">{Q}</div>,
    description2: <div className="w-[600px] mx-auto text-start">{A}</div>,
    makeChanges: { _id, handleDelete, handleEdit },
  };
}
