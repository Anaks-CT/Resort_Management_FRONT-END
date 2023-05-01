import React from 'react'
import Button from '../../UI/Button'
import { IBookingForm1 } from '../../../interface/booking.interface';
import { bookingForm1APi } from '../../../api/booking.api';
import { useSelector } from 'react-redux';
import { IStore } from '../../../interface/slice.interface';

type props = {
    form1Values: IBookingForm1;
    bookingOverViewRoomDetails: any[];
  };

function BookingDetails({form1Values, bookingOverViewRoomDetails}: props) {

  const userToken = useSelector((state: IStore) => state.userAuth.token)
    const totalGuests = form1Values?.roomDetail.reduce(
        (acc, cur) => (acc += +cur),
        0
      );

    const handleSubmitBooking = () => {
        bookingForm1APi(form1Values, bookingOverViewRoomDetails, userToken)
        .then(res => console.log(res))
        .catch(err => console.log(err))

    }

    const totalRoomCost = bookingOverViewRoomDetails?.reduce((acc,cur) => (acc+=cur.packageCost),0)
    const taxCost = Math.floor(totalRoomCost*22/100)
    const payableAmount = totalRoomCost+taxCost

  return (
    <div className=" px-7 self-center  w-full  my-5">
            <div className="bg-white p-5 lg:p-10 font-sans text-sm rounded shadow divide-y lg:justify-between lg:divide-x lg:divide-y-0 flex flex-col gap-3 lg:flex-row">
                <div className='lg:w-2/5'>
                  <h2 className="text-center text-2xl mb-10 font-sans tracking-wide font-semibold uppercase ">Booking Details</h2>
                  <div className="flex justify-between">
                    <span>Resort Name :</span>
                    <span className="w-1/2">{form1Values?.destination.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>No. of Rooms :</span>
                    <span className="w-1/2">{form1Values?.roomDetail.length} Room(s)</span>
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
                  bookingOverViewRoomDetails?.map((item, i) => (
                    <div key={item} className='flex flex-col gap-2'>
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
              </div>
              <div className='divide-y flex flex-col gap-3 lg:w-1/2 justify-center'>
                <div>
                  <div className='text-center my-4 font-sans tracking-wide text-premium'>TOTAL ROOM COST EXCLUDING TAXES AND FEES.</div>
                  <div className='text-2xl font-bold text-center'><span className='text-lg font-normal'>INR</span> {totalRoomCost?.toLocaleString('en-IN')}</div>
                </div>
                <div >
                  <div className='text-center my-4 font-sans tracking-wide text-premium'>APPLICABLE TAXES & FEES.</div>
                  <div className='text-2xl font-bold text-center mb-2'><span className='text-lg font-normal'>INR</span> {taxCost.toLocaleString('en-IN')}</div>
                  <div className='text-[10px] px-8'>*Room rate is subject to 10% Service Charge, 7% Municipality Fee, and 5% VAT. A Tourism Dirham Fee of AED20 per bedroom, per night, is not included in the total room cost and will be charged at the hotel at time of check-out.</div>
                </div>
                <div >
                  <div className='text-center my-4 font-sans tracking-wide text-premium'>TOTAL PAYABLE AMOUNT.</div>
                  <div className='text-4xl font-bold text-center mb-2'><span className='text-lg font-normal'>INR</span> {payableAmount.toLocaleString('en-IN')}</div>
                </div>
                <div className="mx-auto w-1/2 mt-5">
                  <Button onClick={handleSubmitBooking} class="w-full" outline color="premium" >BOOK NOW</Button>
                  <div className='text-[9px]'>*I will present a valid ID during CHECK-IN. I also agree to the terms & conditions.</div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default BookingDetails