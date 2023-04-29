import React from 'react'
import Button from '../../UI/Button'
import { IBookingForm1 } from '../../../interface/booking.interface';
import { bookingForm1APi } from '../../../api/booking.api';

type props = {
    form1Values: IBookingForm1;
    bookingOverViewRoomDetails: any[];
  };

function BookingDetails({form1Values, bookingOverViewRoomDetails}: props) {

    const totalGuests = form1Values.roomDetail.reduce(
        (acc, cur) => (acc += +cur),
        0
      );

    const handleSubmitBooking = () => {
        bookingForm1APi(form1Values, bookingOverViewRoomDetails)
        .then(res => console.log(res))
        .catch(err => console.log(err))

        // navigate("/booking/confirm");
    }

  return (
    <div className=" px-7 self-center lg:self-start w-full md:w-2/3">
            <div className="bg-white p-5 font-sans text-sm rounded shadow">
              <h2 className="text-center text-xl mb-5 font-sans tracking-wide font-black">Booking Details</h2>
              <div className="flex justify-between">
                <span>Resort Name :</span>
                <span className="w-1/2">{form1Values.destination.name}</span>
              </div>
              <div className="flex justify-between">
                <span>No. of Rooms :</span>
                <span className="w-1/2">{form1Values.roomDetail.length} Room(s)</span>
              </div>
              <div className="flex justify-between">
                <span>No. of Guests :</span>
                <span className="w-1/2">{totalGuests} Guest(s)</span>
              </div>
              <div className="flex justify-between">
                <span>Dates :</span>
                <span className="w-1/2">{form1Values?.date.startDate.toLocaleDateString()} -{" "}
                {form1Values?.date.endDate.toLocaleDateString()}</span>
              </div>
              {
                bookingOverViewRoomDetails.map((item, i) => (
                  <div key={item}>
                    <div className="my-2 font-black px-2">Room {i+1}</div>
                    <div className="flex justify-between">
                      <span>Room Name :</span>
                      <span className="w-1/2">{item.roomName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Package Name :</span>
                      <span className="w-1/2">{item.packageName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Package Cost :</span>
                      <span className="w-1/2">₹ {item.packageCost.toLocaleString('en-IN')} <span className="text-[11px]">(exc. taxes and fees)</span></span>
                    </div>
                  </div>
                ))
              }
              <div className="mx-auto w-1/2 mt-8">
                <Button onClick={handleSubmitBooking} class="w-full" outline color="premium" >BOOK NOW</Button>
              </div>
            </div>
          </div>
  )
}

export default BookingDetails