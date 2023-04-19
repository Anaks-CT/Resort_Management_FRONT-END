import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { IResort } from "../../interface/resort.interface";
import { getAllResortDetailsApi } from "../../api/resort.api";
import {
  Formik,
} from "formik";
import { bookingForm1 } from "../../schema/user/bookingForm1";
import MiniHeader from "../../components/User/Header/MiniHeader";
import BookingProgress from "../../components/User/BookingProgress";
import BookingForm1 from "../../components/User/formikForms/BookingForm1";

function BookingForm1Page() {
  // state for storing all resort details to show in the destination dropdown
  const [allResorts, setAllResorts] = useState<IResort[] | null>(null);

  // state for error if any error occured from the backed 
  const [error, setError] = useState<string>("");

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
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [date, setDate] = useState([
    {
      startDate: today,
      endDate: tomorrow,
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
  }

  // initial value for formik
  const formikInitialValue = {
    destination: {
      name: "",
      id: "",
    },
    roomDetail: [""],
    date: {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  }

  // formik submit function
  const formikSubmit = () => {
    console.log('hi')
  }
  return (
    <>
      <MiniHeader />
      <div
        className="w-full h-screen bg-no-repeat bg-cover  bg-center  saturate-150 flex justify-center "
        style={style}
      >
        <div className="mt-14 w-full">
          <BookingProgress />
          <Formik
            initialValues={formikInitialValue}
            validationSchema={bookingForm1}
            onSubmit={(values, { resetForm }) => formikSubmit()}
          >
            {({ errors, touched, setFieldValue, values }) => {
              console.log(values);
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
                />
              );
            }}
          </Formik>
        </div>
        <div className="bg-gradient-to-b from-transparent to-black absolute w-full bottom-0 h-24"></div>
      </div>
    </>
  );
}

export default BookingForm1Page;
