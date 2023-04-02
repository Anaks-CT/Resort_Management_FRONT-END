import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { getGallaryDetailsbyResortIdApi } from "../../../../api/gallary.api";
import {
  IBannerDetails,
  IGallary,
} from "../../../../interface/gallary.interface";
import {
  addBanner,
  editBanner,
  editImage,
} from "../../../../schema/admin/AddLargeBannerForm";
import TransitionsModal from "../../../UI/Modal";
import { Header } from "../../Header";
import Sidebar from "../../Sidebar";
import DataTable from "../../../UI/table/DataTable";
import largeBannerDataforTable from "../../../UI/table/dataFunctions/largeBannerDataforTable";
import { formikSubmit } from "./formikSubmitFunction";
import { modalForm } from "./modalForm";
import TableService from "../../../UI/table/TableService";
import { TbArrowsDownUp } from "react-icons/tb";
import { CgArrowLongDown, CgArrowLongUp } from "react-icons/cg";
import Button from "../../../UI/Button";
import { useSelector } from "react-redux";
import { IResort } from "../../../../interface/resort.interface";
import { useDispatch } from "react-redux";
import { updateGallary } from "../../../../store/slices/gallarySlice";

type store = {
  resort: IResort
  gallary: IGallary
}

function LargeBannerManagement() {
  // const [gallaryDetails, setgallaryDetails] = useState<IGallary>();
  const gallaryDetails = useSelector((state: store) => state.gallary)
  const dispatch = useDispatch()
  
  

  ////////////////////////////// state for loading /////////////////////
  const [loading, setloading] = useState(false);

  ////////////////////////////// state for error management //////////////////////
  const [error, seterror] = useState("");

  ////////////////////////////// state for search and sort //////////////////////

  // search input
  const [searchInput, setSearchInput] = useState("");
  // sort order of the table data
  const [sortOrder, setSortOrder] = useState<"asc" | "des" | null>(null);
  // sort by header
  const [sortBy, setsortBy] = useState<string | null>(null);

  ////////////////////////////// edit button click toggle for conditional modal control /////////////////////
  type user = "nothingClicked" | "editDescription" | "editImage";
  const [editButtonClicked, seteditButtonClicked] =
    useState<user>("nothingClicked");

  //////////////////////////// storing the largebanner id when edit button clicked to pass the largebanner id to front end ///////////
  const [largeBannerId, setlargeBannerId] = useState("");

  //initial value will be changed when clicking edit button the set function is passed inside datafunctions
  // writing this top and calling setformikinitailvalues in closemodal
  const [formikInitialValues, setformikInitialValues] = useState({
    image: "",
    description1: "",
    description2: "",
  });

  ///////////////////////////////////////// for opening the modal and closing the modal ////////////////

  // we pass this funtions and state to the modal component and make use of it
  const [open, setOpen] = React.useState(false);
  const openModal = () => {
    setOpen(true);
    // seteditButtonClicked(true);
  };

  const closeModal = () => {
    setOpen(false);
    seteditButtonClicked("nothingClicked");
    // seteditImageClicked(true)
    setformikInitialValues({
      image: "",
      description1: "",
      description2: "",
    });
  };

  ///////////////////////////////////// fetching gallary details by corrresponding resortId ///////////////////
  //******************************** will change this in to redux *************************/
  useEffect(() => {
    getGallaryDetailsbyResortIdApi("64158c7a80aa0bca76b639b5")
      .then((res) => {
        // setgallaryDetails(res.data.data);
        dispatch(updateGallary(res.data.data))
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  ///////////////////////////////////////changing the data according to the search input and sortby  API ///////////////////////////////
  // state which is given to the table after searching and sorting
  const [renderingData, setRenderingData] = useState<unknown>();
  useEffect(() => {
    // searched data is stored in filtered data
    const filteredData = gallaryDetails?.largeBanner.filter((item) =>
      item.description1.toLowerCase().includes(searchInput.toLowerCase())
    );
    function getSortValue(largeBannerElement: IBannerDetails) {
      if (sortBy === "Description1") {
        return largeBannerElement.description1;
      } else {
        return largeBannerElement.description2;
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
      arr = sortedData.map((item: any) =>
        largeBannerDataforTable(
          item,
          // setgallaryDetails,
          dispatch,
          setformikInitialValues,
          setOpen,
          seteditButtonClicked,
          setlargeBannerId
          // seteditImageClicked
        )
      );
    }
    setRenderingData(arr);
  }, [searchInput, sortBy, sortOrder, gallaryDetails]);

  //////////////////////////////////////// defining the headers for my table data ///////////////////////////

  // will use this headers and change them into sortable buttons or labels according the to the table data
  const headers = ["Image", "Description1", "Description2", "Make-Changes"];

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

  // logic for showing the sort buttons for table head if sortable
  const headerDiv = headers.map((item) => {
    if (item === "Image" || item === "Make-Changes") {
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

  //////////////////////////////////////////// search////////////////////////////////////

  let searchInputValue: string;
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchInputValue = e.target.value;
  };
  const handleClickSearch = () => {
    if (searchInputValue) setSearchInput(searchInputValue);
    if (searchInputValue === "") setSearchInput("");
  };

  ///////////////////////////////////////////// formik for addimage form validation //////////////////////////

  // changing the schema if add image or edit banner is clicked
  function validationSchemaFormik() {
    if (editButtonClicked === "nothingClicked") {
      return addBanner;
    } else if (editButtonClicked === "editDescription") {
      return editBanner;
    } else if (editButtonClicked === "editImage") {
      return editImage;
    }
  }

  function formikOnsubmitType() {
    if (editButtonClicked === "nothingClicked") {
      return "add";
    } else if (editButtonClicked === "editDescription") {
      return "editDes";
    } else {
      return "editImage";
    }
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      image: formikInitialValues.image,
      description1: formikInitialValues.description1,
      description2: formikInitialValues.description2,
    },
    validationSchema: validationSchemaFormik(),
    //  calling the onsubmit according to which button is called
    onSubmit: (values, { resetForm }) => {
      // calling the onsubmit function
      formikSubmit(
        formikOnsubmitType(),
        values,
        resetForm,
        setloading,
        dispatch,
        setOpen,
        seterror,
        largeBannerId
      );
    },
  });

  return (
    <div>
      <Header />
      <Sidebar sideBarElems={[]} />
      <div className="mt-20 p-10 text-center">
        <h1 className="text-center mb-10">LARGE BANNER</h1>
        <TransitionsModal
          buttonMessage="ADD BANNER"
          modalForm={() =>
            modalForm(
              error,
              loading,
              editButtonClicked,
              formik,
              setOpen,
              seteditButtonClicked,
              setformikInitialValues
            )
          }
          open={open}
          openModal={openModal}
          closeModal={closeModal}
        />
        <TableService
          inputOnchange={handleChangeSearch}
          buttonOnclick={handleClickSearch}
          // searchInput={searchInput}
          // pages={gallaryDetails?.largeBanner.length!}
        />
        <DataTable rows={renderingData} headers={headerDiv} />
      </div>
    </div>
  );
}

export default LargeBannerManagement;
