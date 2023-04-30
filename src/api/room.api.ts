import { axiosRoom } from "../config/api";
import { setApiHeader } from "../helpers/apiHeader";
import { IBookingForm1 } from "../interface/booking.interface";


export const getRoomsByResortIdApi = (resortId: string) =>
  axiosRoom.get(`/${resortId}`);

export const createRoomApi = (resortId: string, roomData: any, token: string) => 
  axiosRoom.post(`/${resortId}`,{roomData}, setApiHeader(token))

export const updateRoomApi = (resortId: string, formValues: any , token: string, roomId?: string) => 
  axiosRoom.put(`/${resortId}`,{roomId, formValues}, setApiHeader(token))  

export const getAvailableRoomsApi = (formValues: IBookingForm1, token: string) => 
  axiosRoom.post('/availableRooms',{formValues}, setApiHeader(token))