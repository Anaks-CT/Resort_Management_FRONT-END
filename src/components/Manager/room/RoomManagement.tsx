import React, { useEffect, useState } from "react";
import Button from "../../UI/Button";
import TableService from "../../UI/table/TableService";
import DataTable from "../../UI/table/DataTable";
import { TbArrowsDownUp } from "react-icons/tb";
import { CgArrowLongDown, CgArrowLongUp } from "react-icons/cg";
import { sortSearchResortDetailsApi } from "../../../api/resort.api";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IStore } from "../../../interface/slice.interface";
import { useDispatch } from "react-redux";
import { updateAllResortDetails } from "../../../store/slices/allResortSlice";
import { getRoomsByResortIdApi } from "../../../api/room.api";

function RoomManagement() {
  const navigate = useNavigate()

  const location = useLocation()
    const [roomDetails, setRoomDetails] = useState<any>()//******************will change later to IRoom interface */

  const currentResort = useSelector((state: IStore) => state.resort)

  useEffect(()=>{
    getRoomsByResortIdApi(currentResort.resortId)
      .then(res => setRoomDetails(res.data.data))
      .catch(err => console.log(err))
      
  },[])

  const dispatch = useDispatch()

  // changing the room Status
  const handleDelete = (resortId: string) => {
    //api call to change room status
  }

  // editing the resortDetails
  const handleEdit = (resortId: string) => {
    console.log(resortId)
    const currentRoom = roomDetails?.filter((item: any) => item._id === resortId)
    navigate(`/admin/${currentResort.resortName}/room/customizeRoom`, {
      state: {
        data: currentRoom
      }
    })
  }


///////////////////////////////////////////////// row data for table /////////////////////////////
  let renderData: any[] = [];
  if (roomDetails) {
    roomDetails.forEach((item: any) => {
      let singleRoom = {
        image: (
          <img
            src={item.images[1]}
            className="object-contain"
            width="100px"
            height="150px"
            alt=""
          ></img>
        ),
        name: item.name,
        description: item.description,
        area: item.area,
        package: item.packages.map((item: any, i: number) => <div className="flex flex-col"><div>{item.packageName}{item.cost}</div></div>),
        // viewMore: 
        makeChanges: { _id: item._id, active: item.active, handleDelete, handleEdit },
      };
      renderData.push(singleRoom);
    });
  }

  ////////////////////////////// state for search and sort //////////////////////

  // search input
  const [searchInput, setSearchInput] = useState("");
  // sort order of the table data
  const [sortOrder, setSortOrder] = useState<"asc" | "des" | null>(null);
  // sort by header
  const [sortBy, setsortBy] = useState<string | null>(null);

  ///////////////////////////////////////changing the data according to the search input and sortby  API ///////////////////////////////
  // state which is given to the table after searching and sorting
  // useEffect(() => {
  //   sortSearchResortDetailsApi(searchInput, sortOrder)
  //     .then((res) => {
  //       dispatch(updateAllResortDetails(res.data.data));
  //     })
  //     .catch((err) => console.log(err));
  //     // eslint-disable-next-line
  // }, [searchInput, sortOrder]);

  //////////////////////////////////////// defining the headers for my table data ///////////////////////////

  // will use this headers and change them into sortable buttons or labels according to the table data
  const headers = ["Image", "Name", "Description", "Area", "Package", "Make-Changes"];

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
    if (item === "Name" || item === "Area") {
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
    navigate(`/admin/${currentResort.resortName}/room/customizeRoom`,{state: {roomDetails: setRoomDetails}})
  }


  return (
    <>
    <div className="mt-20 w-full h-full p-10 text-center">
      <h1 className="text-center mb-10">ROOM</h1>
      <Button class="mb-10" color="black" onClick={handleAddRoomClick}>ADD RESORT</Button>
      <div className="text-green-700 text-lg">{location?.state?.message}</div>
      <TableService
        inputOnchange={handleChangeSearch}
        buttonOnclick={handleClickSearch}
        // pages={gallaryDetails?.largeBanner.length!}
      />
      <DataTable rows={renderData} editImage={true} deleteButtonValue={true} headers={headerDiv} />
    </div>
    </>
  );
}

export default RoomManagement;
