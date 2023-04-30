import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { IBookingForm1 } from '../../interface/booking.interface'
import { HiArrowLongLeft } from 'react-icons/hi2'

type props = {
  number : 1 | 2 | 3
  bookingForm1Detais?: IBookingForm1
}

function BookingProgress({number, bookingForm1Detais}:props) {
  const navigate = useNavigate()
  const handleProgressCancel = () => {
    if(number === 1){
      navigate('/')
    }else if(number === 2){
      navigate('/booking/explore')
    }else if(number === 3){
      navigate('/booking/stay',{state:bookingForm1Detais})
    }
  }
  return (
    <div className="text-white py-5 flex flex-col items-center lg:flex-row lg:items-center lg:gap-44 lg:p-11">
            <span className='p-3 flex self-start lg:self-center hidden lg:block'>
            <span
              onClick={handleProgressCancel}
              className="tracking-wide text-[12px] lg:text-lg self-start flex items-center gap-2 lg:self-center cursor-pointer"
            >
              {number === 1 ? <IoMdClose /> : <HiArrowLongLeft className=" text-3xl" />}
              {number === 1 ? "CANCEL" : "BACK"}
            </span>
            </span>
            <div className="flex mt-7 gap-9 lg:gap-36 lg:mt-0">
              <div className="flex items-center gap-1 lg:gap-3">
                <span className={`p-1 lg:p-4 w-7 lg:w-12 opacity-50 text-[12px] rounded-full ${(number === 1 || number === 2 || number === 3) && "bg-white"} text-center text-black`}>
                  1
                </span>
                <span className="text-sm lg:text-lg">Explore</span>
              </div>
              <div className="flex items-center gap-1 lg:gap-3">
                <span className={`p-1 lg:p-4 w-7 lg:w-12 opacity-50 text-[12px] rounded-full  ${(number === 2 || number === 3) && "bg-white text-black"}  bg-black  text-center`}>
                  2
                </span>
                <span className="text-sm lg:text-lg">Stay</span>
              </div>
              <div className="flex items-center gap-1 lg:gap-3">
                <span className={`p-1 lg:p-4 w-7 lg:w-12 opacity-50 text-[12px] rounded-full  ${(number === 3) && "bg-white text-black"}  bg-black text-center`}>
                  3
                </span>
                <span className="text-sm lg:text-lg">Confirm</span>
              </div>
            </div>
          </div>
  )
}

export default BookingProgress