import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { IResort } from "../../interface/resort.interface";
import { getAllResortDetailsApi } from "../../api/resort.api";
import { Formik } from "formik";
import { bookingForm1 } from "../../schema/user/bookingForm1";
import MiniHeader from "../../components/User/Header/MiniHeader";
import BookingProgress from "../../components/User/BookingProgress";
import BookingForm1 from "../../components/User/formikForms/BookingForm1";
import { getAvailableRoomsApi } from "../../api/room.api";
import { IBookingForm1 } from "../../interface/booking.interface";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { IStore } from "../../interface/slice.interface";
import { useUserLogout } from "../../hooks/useLogout";
import { toastMessage } from "../../helpers/toast";

function BookingForm1Page() {
  // state for storing all resort details to show in the destination dropdown
  const [allResorts, setAllResorts] = useState<IResort[] | null>(null);
  
  const currentResort = useSelector((state: IStore) => state.currentResort)

  const logout = useUserLogout()

  const navigate = useNavigate()

  // state for error if any error occured from the backed
  const [error, setError] = useState<string>("");

  // state for loading
  const [loading, setLoading] = useState<boolean>(false)

  //state for toggling the destination dropdown
  const [destinationOpen, setDestinationOpen] = useState(false);

  // state for toggling the roomDetails toggle dropdown
  const [roomDetailsOpen, setRoomDetailsOpen] = useState(false);

  // fetching all the resorts from backend and storing the value in to state
  useEffect(() => {
    getAllResortDetailsApi()
      .then((res) => setAllResorts(res.data.data))
      .catch((err) => setError(err.message));
  }, []);

  // style for background image
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.3)), url(https://res.cloudinary.com/dhcvbjebj/image/upload/v1681805628/photo-1582719508461-905c673771fd_onodbc.jpg)`,
  };

  //////////////////////////////////////////////// Date ////////////////////////////////////////

  // state for date to store the value when changed in the calender
  const [openDate, setOpenDate] = useState<boolean>(false);
  // initialzing the date with start date today and end date tomoro
  const today = new Date();
  today.setUTCHours(18);
today.setUTCMinutes(30);
today.setUTCSeconds(0);
today.setUTCMilliseconds(0);
  const [date, setDate] = useState([
    {
      startDate: today,
      endDate: today,
      key: "selection",
    },
  ]);

  // changing the toggling state to false of all other dropdown
  const destinationClick = () => {
    setDestinationOpen(!destinationOpen);
    setOpenDate(false);
    setRoomDetailsOpen(false);
  };

  // changing the toggling state to false of all other dropdown
  const handleDateClick = () => {
    setOpenDate(!openDate);
    setDestinationOpen(false);
    setRoomDetailsOpen(false);
  };

  // changing the toggling state to false of all other dropdown
  const handleRoomDetailsClick = () => {
    setRoomDetailsOpen(!roomDetailsOpen);
    setDestinationOpen(false);
    setOpenDate(false);
  };

  // closing all the dropdowns when submit button is clicked
  const closeAll = () => {
    setDestinationOpen(false);
    setRoomDetailsOpen(false);
    setOpenDate(false);
  };

  // initial value for formik
  const formikInitialValue = {
    destination: {
      name: currentResort?.resortName ? currentResort.resortName : '',
      id: currentResort?.resortId ? currentResort.resortId : '',
    },
    roomDetail: [""],
    date: date[0]
  };

  const userToken = useSelector((state: IStore) => state.userAuth.token)

  // formik submit function
  const formikSubmit = (values: IBookingForm1) => {
    console.log(values);
    setLoading(true)
    setTimeout(() => {
      getAvailableRoomsApi(values, userToken)
      .then(res => 
        navigate('/booking/stay',{
          state: {
            data: res.data.data,
            bookingForm1: values
          }
        })
      )
      .catch(err => {
        if(err.response.status === 401) {
          logout()
          toastMessage("error", err.response.data.message)
        }
        setError(err.response.data.message)
      })
      .finally(() => setLoading(false))
    }, 3000);
  };
  return (
    <>
      <MiniHeader />
      <div
        className="w-full h-screen bg-no-repeat bg-cover  bg-center  saturate-150 flex justify-center "
        style={style}
      >
        <div className={`mt-14 w-full ${loading && "hidden"}`}>
        <div className="px-11 text-white lg:hidden">
          <span className='p-3 flex self-start lg:self-center '>
            <Link
              to={"/"}
              className="tracking-wide text-[12px] lg:text-lg self-start flex items-center gap-2 lg:self-center "
            >
              <IoMdClose />
              CANCEL
            </Link>
            </span>
        </div>
          <BookingProgress number={1} />
          <Formik
            initialValues={formikInitialValue}
            validationSchema={bookingForm1}
            onSubmit={(values, { resetForm }) => formikSubmit(values)}
          >
            {({ errors, touched, setFieldValue, values }) => {
              return (
                <BookingForm1
                  allResorts={allResorts}
                  date={date}
                  destinationClick={destinationClick}
                  destinationOpen={destinationOpen}
                  handleDateClick={handleDateClick}
                  handleRoomDetailsClick={handleRoomDetailsClick}
                  openDate={openDate}
                  roomDetailsOpen={roomDetailsOpen}
                  setDate={setDate}
                  setDestinationOpen={setDestinationOpen}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                  values={values}
                  closeAll={closeAll}
                  error={error}
                />
              );
            }}
          </Formik>
        </div> 
          <div className={`w-screen h-screen flex justify-center items-center flex-col ${!loading && "hidden"}`}>
            <img width={"70px"} height={"70px"} src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1682346232/Eclipse-0.9s-210px_lwbe3z.gif" alt="" />
            <div className="text-white md:text-4xl text-2xl px-10 py-5 text-center">An unforgettable stay awaits...</div>
            <div className="text-white text-[12px] md:text-lg px-10 text-center">One moment while we find the best publicly available rate for your booking.</div>
          </div>
        
        <div className="bg-gradient-to-b from-transparent to-black absolute w-full bottom-0 h-24"></div>
      </div>
    </>
  );
}

export default BookingForm1Page;
