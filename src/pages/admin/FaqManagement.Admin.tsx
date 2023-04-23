import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Header } from "../../components/Manager/Header";
import TransitionsModal from "../../components/UI/Modal";
import faqsDataforTable from "../../components/UI/table/dataFunctions/faqsDataforTable";
import { modalForm } from "../../components/Manager/faq/modalForm.Faq";
import { formikSubmit } from "../../components/Manager/faq/formikSubmitFunction";
import { faqSchema } from "../../schema/admin/addFaqForm";
import DataTable from '../../components/UI/table/DataTable'
import { getFaqApi } from "../../api/company.api";
import { Ifaq } from "../../interface/company.interface";
import TableService from "../../components/UI/table/TableService";
import Button from "../../components/UI/Button";
import { TbArrowsDownUp } from "react-icons/tb";
import { CgArrowLongDown, CgArrowLongUp } from "react-icons/cg";
import AdminSideBar from "../../components/Manager/sidebar/AdminSideBar";
import { useSelector } from "react-redux";
import { IStore } from "../../interface/slice.interface";
import useLogout from '../../hooks/useLogout'

function FaqManagement() {
  //////////////////////////////////// faq details state ////////////////////////////////
  const [faqDetail, setFaqDetail] = useState<Ifaq[]>()
  // state to store the current faq id when clicked edit faq, to send to the backend for editing
  const [currentFaqId, setCurrentFaqId] = useState<string>('')

  ////////////////////////////// state for search and sort //////////////////////

  // search input
  const [searchInput, setSearchInput] = useState("");
  // sort order of the table data
  const [sortOrder, setSortOrder] = useState<"asc" | "des" | null>(null);
  // sort by header
  const [sortBy, setsortBy] = useState<string | null>(null);
  // admin token
  const adminToken = useSelector((state: IStore) => state.adminAuth.token)

  ////////////////////////////////////// fetching faq details //////////////////////
  useEffect(() => {
    getFaqApi()
      .then(res => setFaqDetail(res.data.data))
      .catch(err => console.log(err))
  }, [])
  
  const logout = useLogout()


  ////////////////////////////// state for loading /////////////////////
  const [loading, setloading] = useState(false);

  ////////////////////////////// state for error management //////////////////////
  const [error, seterror] = useState("");

  ////////////////////////////// edit button click toggle for conditional modal control /////////////////////
  type user = "nothingClicked" | "editClicked";
  const [editButtonClicked, seteditButtonClicked] =
    useState<user>("nothingClicked");



  ///////////////////////////////////////// for opening the modal and closing the modal ////////////////

  // we pass this funtions and state to the modal component and make use of it
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
// close modal function
  const closeModal = () => {
    // formik.resetForm()
    setOpen(false);
    seteditButtonClicked("nothingClicked");
    setloading(false)
    seterror('')
  };

///////////////////////////////////////changing the data according to the search input and sortby  API ///////////////////////////////
  // state which is given to the table after searching and sorting
  const [renderingData, setRenderingData] = useState<unknown>();
  useEffect(() => {
    // searched data is stored in filtered data
    const filteredData = faqDetail?.filter((item) =>
      item.Q.toLowerCase().includes(searchInput.toLowerCase())
    );
    function getSortValue(faqDetail: Ifaq) {
      if (sortBy === "Question") {
        return faqDetail.Q;
      } else {
        return faqDetail.A;
      }
    }
    const sortedData = filteredData?.sort((a, b) => {
      const valueA = getSortValue(a);
      const valueB: any = getSortValue(b);

      const reverseOrder = sortOrder === "asc" ? 1 : -1;

      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
    let arr;

    //// calling the function and passing the data as arguments in a loop
    if (sortedData) {
       arr = sortedData?.map((item: any) =>
      faqsDataforTable(item, setOpen, seteditButtonClicked, setFaqDetail, setformikInitialValues, setCurrentFaqId, adminToken, logout)
      );
    }
    setRenderingData(arr);
    // eslint-disable-next-line
  }, [searchInput, sortBy, sortOrder, faqDetail]);

    /////////////////////////////////////////// sorting logic //////////////////////////////////////

  // i will call the API when there is a change in the state
  const handleHeaderClick = async (headingLabel: string) => {
    // logic for changing the sort arrows to asc when clicked a new header
    if (sortBy && headingLabel !== sortBy) {
      setsortBy(headingLabel);
      setSortOrder("asc");
      return;
    }

    console.log(searchInput, sortBy, sortOrder);

    // logic for changing the sort order to its next sort order
    if (sortOrder === null) {
      setSortOrder("asc");
      setsortBy(headingLabel);
    } else if (sortOrder === "asc") {
      setSortOrder("des");
      setsortBy(headingLabel);
    } else if (sortOrder === "des") {
      setSortOrder(null);
      setsortBy(null);
    }
  };
  // arrow icons
  const showSortIcons = (
    headingLabel: string,
    sortOrder: "asc" | "des" | null,
    sortBy: string | null
  ): JSX.Element => {
    // not showing the sorting arrows for non sortable table head
    if (headingLabel === "Image" || headingLabel === "Make-Changes") {
      return <></>;
    } else if (headingLabel !== sortBy) {
      return <TbArrowsDownUp />;
    }

    //showing the correct arrows for the sort order value state
    if (sortOrder === "asc") {
      return <CgArrowLongUp />;
    } else if (sortOrder === "des") {
      return <CgArrowLongDown />;
    } else if (sortOrder === null) {
      return <TbArrowsDownUp />;
    } else {
      return <></>;
    }
  };

  //////////////////////////////////////// defining the headers for my table data ///////////////////////////

  // will use this headers and change them into sortable buttons or labels according the to the table data
  const headers = ["Question", 'Answer' , "Make-Changes"];

    // logic for showing the sort buttons for table head if sortable
    const headerDiv = headers.map((item) => {
      if (item === "Make-Changes") {
        return <span key={item}>{item}</span>;
      }
      return (
        <Button
          key={item}
          class="flex mx-auto gap-3"
          onClick={handleHeaderClick}
          OnClickItem={item}
          color="black"
        >
          {item} {showSortIcons(item, sortOrder, sortBy)}
        </Button>
      );
    });


const [formikInitialValue, setformikInitialValues] = useState<{question: string, answer: string}>({
  question: '',
  answer: ''
})

  function formikOnsubmitType() {
    if (editButtonClicked === "nothingClicked") {
      return "add";
    } else {
      return "edit";
    }
  }


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formikInitialValue,
    validationSchema: faqSchema,
    //  calling the onsubmit according to which button is called
    onSubmit: (values, { resetForm }) => {
      // calling the onsubmit function
      formikSubmit(
        formikOnsubmitType(),
        values,
        resetForm,
        setloading,
        seterror,
        closeModal,
        setFaqDetail,
        currentFaqId,
        adminToken  ,
        logout
      );
    },
  });

  
  //////////////////////////////////////////// search////////////////////////////////////

  let searchInputValue: string;
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchInputValue = e.target.value;
  };
  const handleClickSearch = () => {
    if (searchInputValue) setSearchInput(searchInputValue);
    if (searchInputValue === "") setSearchInput("");
  };


  return (
    <div className="bg-slate-400">
      <Header />
      <AdminSideBar />
      <div className="mt-20 p-10 text-center">
        <h1 className="text-center mb-10">F A Q s</h1>
        <TransitionsModal
          buttonMessage="ADD  FAQ"
          modalForm={() => modalForm(error, loading, formik, closeModal, setformikInitialValues)}
          open={open}
          openModal={openModal}
          closeModal={closeModal}
        />
        <TableService
          inputOnchange={handleChangeSearch}
          buttonOnclick={handleClickSearch}
        />
        
        <DataTable rows={renderingData} headers={headerDiv} />
      </div>
    </div>
  );
}

export default FaqManagement;
