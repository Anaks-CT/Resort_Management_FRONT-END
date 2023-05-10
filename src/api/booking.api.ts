import { axiosBooking } from "../config/api";
import { setApiHeader } from "../helpers/apiHeader";
import { IBookingForm1 } from "../interface/booking.interface";

interface points{
    applyPoints: boolean
}

export const bookingForm1APi = (bookingForm1Details: IBookingForm1 & points, stayDetails: any[], userToken: string) =>
    axiosBooking.post("/",{bookingForm1Details,stayDetails}, setApiHeader(userToken)) 

export const verifyBookingAPi = (paymentData: any) => 
    axiosBooking.patch("/",{...paymentData})

export const getUserBookingDetailsApi = (userToken: string) => 
    axiosBooking.get("/", setApiHeader(userToken)) 
    
export const cancelBookingApi = (userToken: string, bookingId: string) => 
    axiosBooking.delete(`/${bookingId}`,setApiHeader(userToken))

export const getResortBookingDetailsApi = (resortId: string, adminToken: string) => 
    axiosBooking.get(`/resortBookingDetails/${resortId}`,setApiHeader(adminToken))

export const searchSortBookingResultApi = (resortId: string, adminToken: string, searchInput: string, sortOrder: string | null, sortBy: string | null) => 
    axiosBooking.post(`/resortBookingDetails/${resortId}`,{sortBy, searchInput, sortOrder}, setApiHeader(adminToken))

export const getAdminDashboardDetailsApi = (adminToken: string) => 
    axiosBooking.get('/dashboardDetails', setApiHeader(adminToken))

