import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MiniHeader from '../../components/User/Header/MiniHeader'
import BookingProgress from '../../components/User/BookingProgress'
import BookingSummary from '../../components/User/booking/BookingSummary'

function BookingConfirmPage() {
  useEffect(() => {
    if(!availableRoomTypes || !bookingOverViewRoomDetails){
      navigate('/booking/explore')
    }
  })

  const navigate = useNavigate()
  const location = useLocation()
  const form1 = location?.state?.form1
  const availableRoomTypes = location?.state?.data
  const bookingOverViewRoomDetails = location?.state?.bookingOverViewRoomDetails
    // style for background image
    const style = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.3)), url(https://res.cloudinary.com/dhcvbjebj/image/upload/v1682333333/pexels-asad-photo-maldives-1268871_crcnzg.jpg)`,
    };
  return (<>
    <MiniHeader />
    <div
      className={`w-full h-full min-h-screen bg-no-repeat bg-cover bg-center bg-fixed saturate-150 flex lg:pl-9 flex-col `}
      style={style}
    >
      <div className={`lg:w-3/4 `}>
          <div className="mt-12 lg:max-w-[250px]">
            <BookingProgress number={3} bookingForm1Detais={form1} availableRoomTypes={availableRoomTypes}/>
          </div>
          
        </div>
    <BookingSummary bookingOverViewRoomDetails={bookingOverViewRoomDetails} form1Values={form1} />


    </div>
  </>
  )
}

export default BookingConfirmPage