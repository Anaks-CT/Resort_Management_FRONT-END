import { axiosRoom } from "../config/api";
const config = {
  headres: {
    "Content-Type": "multipart/form-data",
  },
};

export const getRoomsByResortIdApi = (resortId: string) =>
  axiosRoom.get(`/${resortId}`);

export const createRoomApi = (resortId: string, roomData: any) => 
  axiosRoom.post(`/${resortId}`,{roomData})

export const updateRoomApi = (resortId: string, formValues: any, roomId?: string ) => 
  axiosRoom.put(`/${resortId}`,{roomId, formValues})  