import { axiosBooking } from "../config/api";
import { setApiHeader } from "../helpers/apiHeader";
import { IBookingForm1 } from "../interface/booking.interface";


export const bookingForm1APi = (bookingForm1Details: IBookingForm1, stayDetails: any[], token: string) =>
axiosBooking.post("/confirmPart1",{bookingForm1Details,stayDetails}, setApiHeader(token)) 

