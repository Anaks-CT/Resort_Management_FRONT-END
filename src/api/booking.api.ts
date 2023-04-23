import { axiosCompany } from "../config/api";
import { setApiHeader } from "../helpers/apiHeader";
import { IBookingForm1 } from "../interface/booking.interface";
import { ILoginInterface } from "../interface/user.interface";


export const bookingForm1APi = (bookingForm1Details: IBookingForm1) =>
  axiosCompany.get("/") 

