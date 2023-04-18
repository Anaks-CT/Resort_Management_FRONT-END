import { axiosRoom } from "../config/api";
import { setApiHeader } from "../helpers/apiHeader";
const config = {
  headres: {
    "Content-Type": "multipart/form-data",
  },
};

export const getRoomsByResortIdApi = (resortId: string) =>
  axiosRoom.get(`/${resortId}`);

export const createRoomApi = (resortId: string, roomData: any, token: string) => 
  axiosRoom.post(`/${resortId}`,{roomData}, setApiHeader(token))

export const updateRoomApi = (resortId: string, formValues: any , token: string, roomId?: string) => 
  axiosRoom.put(`/${resortId}`,{roomId, formValues}, setApiHeader(token))  