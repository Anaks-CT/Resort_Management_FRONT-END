import { axiosBooking } from "../config/api";
import { setApiHeader } from "../helpers/apiHeader";
import { IBookingForm1 } from "../interface/booking.interface";

interface points{
    applyPoints: boolean
}

export const bookingForm1APi = (bookingForm1Details: IBookingForm1 & points, stayDetails: any[], token: string) =>
    axiosBooking.post("/",{bookingForm1Details,stayDetails}, setApiHeader(token)) 

export const verifyBookingAPi = (paymentData: any) => 
    axiosBooking.patch("/",{...paymentData})

export const getUserBookingDetailsApi = (token: string) => 
    axiosBooking.get("/", setApiHeader(token)) 
    
export const cancelBookingApi = (token: string, bookingId: string) => 
    axiosBooking.delete(`/${bookingId}`,setApiHeader(token))
