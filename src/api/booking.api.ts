import { axiosBooking } from "../config/api";
import { IBookingForm1 } from "../interface/booking.interface";


export const bookingForm1APi = (bookingForm1Details: IBookingForm1, stayDetails: any[]) =>
axiosBooking.post("/confirmPart1",{bookingForm1Details,stayDetails}) 

