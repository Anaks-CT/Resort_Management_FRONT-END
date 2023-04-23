import React, { useEffect, useState } from "react";
import Button from "../../UI/Button";
import TableService from "../../UI/table/TableService";
import DataTable from "../../UI/table/DataTable";
import { TbArrowsDownUp } from "react-icons/tb";
import { CgArrowLongDown, CgArrowLongUp } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IStore } from "../../../interface/slice.interface";
import { getRoomsByResortIdApi } from "../../../api/room.api";
import { Link } from "react-router-dom";

function RoomManagement() {
  const navigate = useNavigate();

  const location = useLocation();
  const [roomDetails, setRoomDetails] = useState<any>(); //******************will change later to IRoom interface */

  const currentResort = useSelector((state: IStore) => state.resort);

  useEffect(() => {
    getRoomsByResortIdApi(currentResort.resortId)
      .then((res) => setRoomDetails(res.data.data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  // changing the room Status
  const handleDelete = (roomId: string) => {
    // api call to change room status
    console.log(roomId);
  };

  // editing the resortDetails
  const handleEdit = (roomId: string) => {
    const currentRoom = roomDetails?.filter((item: any) => item._id === roomId);
    navigate(`/admin/${currentResort.resortName}/room/customizeRoom`, {
      state: {
        data: currentRoom,
      },
    });
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
    "Image",
    "Name",
    "Description",
    "Area",
    "Starting Price",
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

  ///////////////////////////////////////changing the data according to the search input and sortby  API ///////////////////////////////
  // state which is given to the table after searching and sorting
  const [renderingData, setRenderingData] = useState<unknown>();
  useEffect(() => {
    
    const roomDetailsForTable = roomDetails?.map((item: any) => {
    const packagePrice = item.packages;
    // sorting the package cost
    const sortedPackagePrice = packagePrice.sort(
      (a: any, b: any) => a.cost - b.cost
    );
    // adding an extra field to the table for starting price to sort
    const startingPrice = sortedPackagePrice[0].cost;
      return {...item, startingPrice}
    })
    // searched data is stored in filtered data

    const filteredData = roomDetailsForTable?.filter((item: any) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    function getSortValue(roomDetail: any) {
      if (sortBy === "Name") {
        return roomDetail.name;
      } else if (sortBy === "Area") {
        return roomDetail.area;
      } else if(sortBy === "Starting Price") {
        return (roomDetail.startingPrice);
      }
    }
    const sortedData = filteredData?.sort((a: any, b: any) => {
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
      arr = sortedData.map((item: any) => {
        const packagePrice = item.packages;
        const sortedPackagePrice = packagePrice.sort(
          (a: any, b: any) => a.cost - b.cost
        );
        const startingPrice = sortedPackagePrice[0].cost;
        console.log(startingPrice);
        return {
          image: (
            <img
              src={item.images[0]}
              className="object-contain"
              width="100px"
              height="150px"
              alt=""
            ></img>
          ),
          name: item.name,
          description: item.description,
          area: item.area,
          staringPrice: `₹${startingPrice} /day`,
          makeChanges: {
            _id: item._id,
            active: item.active,
            handleDelete,
            handleEdit,
          },
        };
      });
    }
    setRenderingData(arr);
    // eslint-disable-next-line
  }, [searchInput, sortBy, sortOrder, roomDetails]);

  // logic for showing the sort buttons for table head if sortable
  const headerDiv = headers.map((item) => {
    if (item === "Name" || item === "Area" || item === "Starting Price") {
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
  // const handleAddRoomClick = () => {
  //   navigate(`/admin/${currentResort.resortName}/room/customizeRoom`, {
  //     state: { roomDetails: setRoomDetails },
  //   });
  // };

  return (
    <>
      <div className="mt-20 w-full h-full p-10 text-center">
        <h1 className="text-center mb-10">ROOM</h1>
        <Link  to={`/admin/${currentResort.resortName}/room/customizeRoom`} className="mb-10" color="black">
        {/* //  onClick={handleAddRoomClick} */}
          ADD ROOM
        </Link>
        <div className="text-green-700 text-lg">{location?.state?.message}</div>
        <TableService
          inputOnchange={handleChangeSearch}
          buttonOnclick={handleClickSearch}
          // pages={gallaryDetails?.largeBanner.length!}
        />
        <DataTable
          rows={renderingData}
          editImage={true}
          deleteButtonValue={true}
          headers={headerDiv}
        />
      </div>
    </>
  );
}

export default RoomManagement;
