import React, { useState, useEffect } from "react";
import BookingDetailsProfile from "../../../components/User/profile/BookingDetailsProfile";
import Button from "../../../components/UI/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserBookingDetailsApi } from "../../../api/booking.api";
import { useSelector } from "react-redux";
import { IStore } from "../../../interface/slice.interface";
import { IBookingDetail } from "../../../interface/booking.interface";

function BookingDetailsPage() {
  const [bookingDetails, setBookingDetails] = useState<IBookingDetail[]>();
  const userToken = useSelector((state: IStore) => state.userAuth.token);

  const bookings = bookingDetails?.map((item) => (
    <BookingDetailsProfile bookingDetail={item} />
  ));

  const location = useLocation()
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getUserBookingDetailsApi(userToken)
      .then((res) => setBookingDetails(res.data.data))
      .finally(() => setLoading(false));


      // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.onpopstate = e => {
      if(location?.state?.prevPath === "booking"){
        navigate('/booking/explore')
      }
    };
  });

  const navigate = useNavigate();
  return (
    <>
      <div className="text-white text-center absolute right-0 top-3 w-full tracking-wide">
        YOUR BOOKINGS
      </div>
      <div className="text-white grid gap-6 mt-10 p-2 max-h-[440px] overflow-y-auto scroll-0 rounded">
        {bookingDetails?.length === 0 && (
          <>
            <div className="text-center text-sm">
              You don't have any bookings !!
            </div>
            <div className="text-center">
              <Button
                class="text-sm md:w-44 w-full"
                onClick={navigate}
                OnClickItem={"/booking/explore"}
                color="premium"
              >
                BOOK ROOMS
              </Button>
            </div>
          </>
        )}
        {loading ? (
          <div className="flex justify-center">
            <img
              width={50}
              src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1680669482/Spinner-1s-200px_4_ontbds.gif"
              alt=""
            />
          </div>
        ) : (
          bookings
        )}
      </div>
    </>
  );
}

export default BookingDetailsPage;
