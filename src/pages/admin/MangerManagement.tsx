import { useLocation, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react'
import { useSelector } from "react-redux";
import { TbArrowsDownUp } from "react-icons/tb";
import { CgArrowLongDown, CgArrowLongUp } from "react-icons/cg";
import Button from "../../components/UI/Button";
import TableService from "../../components/UI/table/TableService";
import DataTable from "../../components/UI/table/DataTable";
import { getAllManagerDetails } from "../../api/manager.api";
import { IManager } from "../../interface/manager.interface";
import { IResort } from "../../interface/resort.interface";
import { Header } from "../../components/Manager/Header";
import AdminSideBar from "../../components/Manager/sidebar/AdminSideBar";


function ManagerManagement() {
  const navigate = useNavigate();

  const location = useLocation();
  const [managerDetails, setmanagerDetails] = useState<IManager[]>(); //******************will change later to IRoom interface */


  // useEffect(() => {
  //   getAllManagerDetails()
  //     .then((res: any) => setmanagerDetails(res.data.data))
  //     .catch((err: any) => console.log(err));
  //   // eslint-disable-next-line
  // }, []);

  // changing the room Status
  const handleDelete = (managerId: string) => {
    // api call to change room status
    console.log(managerId);
  };

  // editing the resortDetails
  const handleEdit = (managerId: string) => {
    // const currentRoom = roomDetails?.filter((item: any) => item._id === managerId);
    // navigate(`/admin/${currentResort.resortName}/room/customizeRoom`, {
    //   state: {
    //     data: currentRoom,
    //   },
    // });
    console.log(managerId)
  };


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

  ///////////////////////////////////////changing the data according to the search input and sortby  API ///////////////////////////////
  // state which is given to the table after searching and sorting
  let renderData
      // //// calling the function and passing the data as arguments in a loop
      if (managerDetails) {
          renderData=  managerDetails.map((item: any) => {
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
            resort: item.resortId.resortDetails.name,
            makeChanges: {
              _id: item._id,
              active: item.active,
              handleDelete,
              handleEdit,
            },
          };
        });
      }
      // eslint-disable-next-line
  useEffect(() => {
    
    // const managerDetailsForTable = managerDetails?.map((item: any) => {
    // const packagePrice = item.packages;
    // // sorting the package cost
    // const sortedPackagePrice = packagePrice.sort(
    //   (a: any, b: any) => a.cost - b.cost
    // );
    // // adding an extra field to the table for starting price to sort
    // const startingPrice = sortedPackagePrice[0].cost;
    //   return {...item, startingPrice}
    // })
    // // searched data is stored in filtered data

    // const filteredData = managerDetails?.filter((item: IManager) =>
    //   item.email.toLowerCase().includes(searchInput.toLowerCase())
    // );
    // function getSortValue(managerDetail: any) {
    //   if (sortBy === "Name") {
    //     return managerDetail.name;
    //   } else if (sortBy === "Email") {
    //     return managerDetail.email;
    //   } else if(sortBy === "Phone Number") {
    //     return (managerDetail.phone);
    //   }else if(sortBy === "Resort"){
    //     return (managerDetail.resortId)
    //   }
    // }
    // const sortedData = filteredData?.sort((a: any, b: any) => {
    //   const valueA = getSortValue(a);
    //   const valueB: any = getSortValue(b);

    //   const reverseOrder = sortOrder === "asc" ? 1 : -1;

    //   if (typeof valueA === "string") {
    //     return valueA.localeCompare(valueB) * reverseOrder;
    //   } else {
    //     return (valueA - valueB) * reverseOrder;
    //   }
    // });
    // let arr;

    getAllManagerDetails(searchInput, sortOrder, sortBy)
    .then((res: any) => setmanagerDetails(res.data.data))
    .catch((err: any) => console.log(err));



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

  //////////////////////////////////////////// search////////////////////////////////////

  let searchInputValue: string;
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchInputValue = e.target.value;
  };
  const handleClickSearch = () => {
    if (searchInputValue) setSearchInput(searchInputValue);
    if (searchInputValue === "") setSearchInput("");
  };

  //////////////////////////////////////// add resort ///////////////////////////////
  const handleAddRoomClick = () => {
    // navigate(`/admin/${currentResort.resortName}/room/customizeRoom`, {
    //   state: { roomDetails: setRoomDetails },
    // });
    console.log('to add room page');
  };

  return (
    <div className="bg-slate-400 flex flex-col items-center w-full">
      <Header />
      <AdminSideBar />
      <div className="mt-20 w-full h-full p-10 text-center">
        <h1 className="text-center mb-10">MANAGER</h1>
        <Button class="mb-10" color="black" onClick={handleAddRoomClick}>
          ADD MANAGER
        </Button>
        <div className="text-green-700 text-lg">{location?.state?.message}</div>
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
  );
}

export default ManagerManagement;

// import React from 'react'

// function MangerManagement() {
//   return (
//     <div className='text-white'>MangerManagement</div>
//   )
// }

// export default MangerManagement