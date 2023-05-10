import { useLocation } from "react-router-dom";
import {useState, useEffect} from 'react'
import { TbArrowsDownUp } from "react-icons/tb";
import { CgArrowLongDown, CgArrowLongUp } from "react-icons/cg";
import Button from "../../components/UI/Button";
import TableService from "../../components/UI/table/TableService";
import DataTable from "../../components/UI/table/DataTable";
import { getAllManagerDetails } from "../../api/manager.api";
import { IManager } from "../../interface/manager.interface";
import { useFormik } from "formik";
import TransitionsModal from "../../components/UI/Modal";
import { modalForm } from "../../components/Manager/managerManagement/modalForm.manager";
import { signupSchema } from "../../schema/admin/addManager";
import { formikSubmit } from "../../components/Manager/managerManagement/formikSubmitFunction";
import managerDataForTable from "../../components/UI/table/dataFunctions/managerDataForTable";
import { useSelector } from "react-redux";
import { IStore } from "../../interface/slice.interface";
import {useAdminLogout} from "../../hooks/useLogout";
import { toastMessage } from "../../helpers/toast";


function ManagerManagement() {

  const location = useLocation();
  const [managerDetails, setmanagerDetails] = useState<IManager[]>();
  
  const logout = useAdminLogout()

  const resortDetails = useSelector((state: IStore) => state.allResort)
  const adminToken = useSelector((state: IStore) => state.adminAuth.token)

  ////////////////////////////// state for search and sort //////////////////////

  // search input
  const [searchInput, setSearchInput] = useState("");
  // sort order of the table data
  const [sortOrder, setSortOrder] = useState<"asc" | "des" | null>(null);
  // sort by header
  const [sortBy, setsortBy] = useState<string | null>(null);

  //////////////////////////////////////// defining the headers for my table data ///////////////////////////

  // will use this headers and change them into sortable buttons or labels according to the table data
  const headers = [
    "Profile",
    "Name",
    "Email",
    "Phone Number",
    "Resort",
    "Make-Changes",
  ];

  /////////////////////////////////////////// sorting logic //////////////////////////////////////

  // i will call the API when there is a change in the state
  const handleHeaderClick = async (headingLabel: string) => {
    // logic for changing the sort arrows to asc when clicked a new header
    if (sortBy && headingLabel !== sortBy) {
      setsortBy(headingLabel);
      setSortOrder("asc");
      return;
    }

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
    if (headingLabel === "Profile") {
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


    ////////////////////////////// state for loading /////////////////////
    const [loading, setloading] = useState(false);

    ////////////////////////////// state for error management //////////////////////
    const [error, seterror] = useState("");
  
    ////////////////////////////// edit button click toggle for conditional modal control /////////////////////


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
    setloading(false)
    seterror('')
  };



  useEffect(() => {
    getAllManagerDetails(searchInput, sortOrder, sortBy)
    .then((res: any) => setmanagerDetails(res.data.data))
    .catch((err: any) =>toastMessage('error', err?.response?.data?.message));
  }, [searchInput, sortBy, sortOrder]);


  // logic for showing the sort buttons for table head if sortable
  const headerDiv = headers.map((item) => {
    if (item !== "Profile") {
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
    }
    return <span key={item}>{item}</span>;
  });



////////////////////////////////////// data for table /////////////////////////////
  let renderData
  // //// calling the function and passing the data as arguments in a loop
  if (managerDetails) {
      renderData=  managerDetails.map((item: any) => {
        return managerDataForTable(item, setmanagerDetails, adminToken, logout)
      })
  }


  
  
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        name: '',
        email: '',
        phone: '',
        cPassword: '',
        password: '',
        resortId: ''
      },
      validationSchema: signupSchema,
      //  calling the onsubmit according to which button is called
      onSubmit: (values, { resetForm }) => {
        // calling the onsubmit function
        formikSubmit(
          values,
          resetForm,
          setloading,
          seterror,
          closeModal,
          setmanagerDetails,
          adminToken,
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
      <>
     
        <div className="mt-5 w-full text-center">
        <h1 className="text-center mb-8 font-normal tracking-wide text-5xl">MANAGER</h1>
        <TransitionsModal
          buttonMessage="ADD  MANAGER"
          modalForm={() => modalForm(error, loading, formik, closeModal, resortDetails)}
          open={open}
          openModal={openModal}
          closeModal={closeModal}
        />
        <div className="text-green-700 text-lg">{location?.state?.message}</div>
        <div className="max-w-5xl mx-auto">
        <TableService
          inputOnchange={handleChangeSearch}
          buttonOnclick={handleClickSearch}
          // pages={gallaryDetails?.largeBanner.length!}
        />
        <DataTable
          rows={renderData}
          editImage={true}
          deleteButtonValue={true}
          headers={headerDiv}
        />
        </div>
      </div>
    </>
  );
}

export default ManagerManagement;

