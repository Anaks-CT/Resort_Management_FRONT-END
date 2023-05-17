import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IBookingDetail } from "../../../interface/booking.interface";
import { TbArrowsDownUp } from "react-icons/tb";
import { CgArrowLongDown, CgArrowLongUp } from "react-icons/cg";
import Button from "../../UI/Button";
import DataTable from "../../UI/table/DataTable";
import { IStore } from "../../../interface/slice.interface";
import {
  getResortBookingDetailsApi,
  searchSortBookingResultApi,
} from "../../../api/booking.api";
import { toastMessage } from "../../../helpers/toast";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type props = {
  token: string;
  logout: () => void;
};
function ManageBooking({ token, logout }: props) {
  const currentResort = useSelector((state: IStore) => state.resort);
  const [bookingDetails, setBookingDetails] = useState<IBookingDetail[]>();
  const [showSalesReport, setShowSalesReport] = useState(false)
  const [fileteredBookingDetails, setFileteredBookingDetails] = useState<IBookingDetail[]>()

  useEffect(() => {
    getResortBookingDetailsApi(currentResort.resortId, token)
      .then((res) => setBookingDetails(res.data.data))
      .catch((err) => {
        if (err.response.status === 401) logout();
        toastMessage("error", err?.response?.data?.message);
      });
    // eslint-disable-next-line
  }, []);

  ///////////////////////////////////////////////// row data for table /////////////////////////////

  let renderData: any[] = [];
  let dataToIterate
  if(showSalesReport){
      dataToIterate= fileteredBookingDetails
  }else{
    dataToIterate = bookingDetails
  }
  if (dataToIterate) {
    dataToIterate.forEach((item, i) => {
      let status;
      if (!item.status) {
        status = "Cancelled";
      } else {
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
        status,
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
    searchSortBookingResultApi(
      currentResort.resortId,
      token,
      searchInput,
      sortOrder,
      sortBy
    )
      .then((res) => setBookingDetails(res.data.data))
      .catch((err) => {
        if (err.response.status === 401) logout();
        toastMessage("error", err?.response?.data?.message);
      });
    // eslint-disable-next-line
  }, [searchInput, sortOrder, sortBy]);

  //////////////////////////////////////// defining the headers for my table data ///////////////////////////

  // will use this headers and change them into sortable buttons or labels according the to the table data
  const headers = [
    "Email",
    "Booking Date",
    "CheckIn Date",
    "CheckOut Date",
    "Amount",
    "Status",
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
    if (headingLabel === "Email") {
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



  const [startDate, setStartDate] = useState<any>()
  const [endDate, setEndDate] = useState<any>()
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    setStartDate(formatDate(oneMonthAgo));
    setEndDate(formatDate(today));
  }, []);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const handleStartDateChange = (e: any) => {
    const selectedStartDate = e.target.value;
    setShowSalesReport(false)
    if (selectedStartDate > formatDate(new Date())) {
      setError("Start date cannot be in the future.");
    } else {
      setError('');
    }
    setStartDate(selectedStartDate)
  }
  const handleEndDateChange = (e: any) => {
    const selectedEndDate = e.target.value;
    setShowSalesReport(false)

    if (selectedEndDate > formatDate(new Date())) {
      setError("End date cannot be in the future.");
    } else if (selectedEndDate < startDate) {
      setError("End date cannot be earlier than the start date.");
    } else {
      setError('');
    }

    setEndDate(selectedEndDate);
  }

  const handleSalesReport= () => {
    console.log(bookingDetails && typeof bookingDetails[0].BookingDate);
    const filteredBookings = bookingDetails?.filter((booking) => {
      const bookingDate = new Date(booking.BookingDate);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return bookingDate >= start && bookingDate <= end;
      
    });
    setFileteredBookingDetails(filteredBookings)
    setShowSalesReport(!showSalesReport)
  }


  return (
    <>
      <div className="mt-5 text-center">
        <h1 className="text-center mb-8 font-normal tracking-wide text-5xl">
          BOOKINGS
        </h1>
        <div className="flex justify-between my-5 items-start">
          <div className="flex items-center gap-4">
            <div className="text-white uppercase whitespace-nowrap">Start Date : </div>
            <input type="date" value={startDate} onChange={(e) => handleStartDateChange(e)}/>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-white uppercase whitespace-nowrap">END Date : </div>
            <input type="date" value={endDate} onChange={(e) => handleEndDateChange(e)}/>
          </div>
          <div>
          <Button disable={!!error} class="py-2 px-3 text-sm" rounded color="success" onClick={handleSalesReport}>{showSalesReport ? "SHOW ALL BOOKINGS" : "SHOW SALES REPORT"}</Button>
          {error && <div className="text-red-500">{error}</div>}
          </div>
        </div>
        <div className="max-w-[1100px]">
         
          <DataTable rows={renderData} headers={headerDiv} />
          {showSalesReport && <div className="flex justify-end mt-1"><Button class="py-2 px-2 uppercase" rounded color="success" onClick={() => handleDownload("divId")}>download pdf</Button></div>}
        </div>
      </div>
    </>
  );
}

export default ManageBooking;


const handleDownload = (divId: string) => {
  const input = document.getElementsByClassName(divId)[0] as HTMLElement;

  if (input) {
    const inputWidth = input.offsetWidth;
    const inputHeight = input.offsetHeight;

    html2canvas(input, { width: inputWidth, height: inputHeight })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: inputWidth > inputHeight ? 'landscape' : 'portrait',
          unit: 'px',
          format: [inputWidth, inputHeight]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, inputWidth, inputHeight);
        pdf.save('download.pdf');
      });
  }
};