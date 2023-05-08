import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAdminLogout } from '../../../hooks/useLogout'
import { useSelector } from 'react-redux'
import { IBookingDetail } from '../../../interface/booking.interface'
import { TbArrowsDownUp } from 'react-icons/tb'
import { CgArrowLongDown, CgArrowLongUp } from 'react-icons/cg'
import Button from '../../UI/Button'
import TableService from '../../UI/table/TableService'
import DataTable from "../../UI/table/DataTable";
import { IStore } from '../../../interface/slice.interface'
import { getResortBookingDetailsApi, searchSortBookingResultApi } from '../../../api/booking.api'
import { toastMessage } from '../../../helpers/toast'


function ManageBooking() {
    
      const navigate = useNavigate()
    
      const location = useLocation()
    
      const logout = useAdminLogout()
    
      const adminToken = useSelector((state: IStore) => state.adminAuth.token)
      const currentResortId = useSelector((state: IStore) => state.resort.resortId)
      const [bookingDetails, setBookingDetails] = useState<IBookingDetail[]>()
      
      useEffect(() => {
        getResortBookingDetailsApi(currentResortId, adminToken)
            .then(res => setBookingDetails(res.data.data))
            .catch(err => toastMessage('error',err?.response?.data?.message))
      }, [])
       
    
    ///////////////////////////////////////////////// row data for table /////////////////////////////
    
      let renderData: any[] = [];
      if (bookingDetails) {
        bookingDetails.forEach((item, i) => {
            let status
            if(!item.status){
                status= "Cancelled"
            }else{
              if (new Date(item.checkInDate) > new Date()) {
                status = "Booked";
            } else if (new Date(item.checkOutDate) < new Date()) {
                status = "Checked Out";
            } else {
                status = "Checked In";
            }
            }
          let singelBookingDetail = {
            userEmail: item.email,
            bookingDate: new Date(item.BookingDate).toLocaleDateString(),
            checkInDate: new Date(item.checkInDate).toLocaleDateString(),
            chekcOutDate: new Date(item.checkOutDate).toLocaleDateString(),
            amount: <span>₹ {item.amount.totalRoomCost}</span>,
            status
          };
          renderData.push(singelBookingDetail);
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
      useEffect(() => {
        searchSortBookingResultApi(currentResortId, adminToken, searchInput, sortOrder, sortBy)
          .then(res => {console.log(res);setBookingDetails(res.data.data)})
          .catch(err => {console.log(err); toastMessage('error', err?.response?.data?.message)})
          // eslint-disable-next-line
      }, [searchInput, sortOrder, sortBy]);
    
      //////////////////////////////////////// defining the headers for my table data ///////////////////////////
    
      // will use this headers and change them into sortable buttons or labels according the to the table data
      const headers = ["Email", "Booking Date", "CheckIn Date", "CheckOut Date", "Amount", "Status",];
    
      /////////////////////////////////////////// sorting logic //////////////////////////////////////
    
      // i will call the API when there is a change in the state
      const handleHeaderClick = async (headingLabel: string) => {
        // logic for changing the sort arrows to asc when clicked a new header
        let sortByValue: string | null
        switch (headingLabel) {
          case "Booking Date":
            sortByValue = "bookingDate"
            break;
          case "CheckIn Date":
            sortByValue = "checkInDate"
            break;
          case "CheckOut Date":
            sortByValue = "checkOutDate"
            break;
          case "Status":
            sortByValue = "status"
            break;
          case "Amount":
            sortByValue = "amount.totalCost"
            break;
          default: 
            sortByValue = null
            break;
        }
        if (sortBy && headingLabel !== sortBy) {
          setsortBy(sortByValue);
          setSortOrder("asc");
          return;
        }
    
        // logic for changing the sort order to its next sort order
        if (sortOrder === null) {
          setSortOrder("asc");
          setsortBy(sortByValue);
        } else if (sortOrder === "asc") {
          setSortOrder("des");
          setsortBy(sortByValue);
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
        if (item === "Email") {
            return (
              <span key={item}>{item}</span>
           
          );
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
          </Button>);
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
        <div className="mt-5 text-center">
          <h1 className="text-center mb-8 font-normal tracking-wide text-5xl">BOOKINGS</h1>
          <div className="text-green-700 text-lg">{location?.state?.message}</div>
          <div className='max-w-[1100px]'>
            <TableService
              inputOnchange={handleChangeSearch}
              buttonOnclick={handleClickSearch}
              // pages={gallaryDetails?.largeBanner.length!}
            />
            <DataTable rows={renderData}  headers={headerDiv} />
          </div>
        </div>
        </>
      );
    }
    

export default ManageBooking