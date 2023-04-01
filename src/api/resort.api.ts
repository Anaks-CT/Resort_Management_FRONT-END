import { axiosResort } from "../config/api";


export const getAllResortDetailsApi = () =>
  axiosResort.get("/getAllResortDetails") 

export const getResortByIdApi = (resortId: string) => 
  axiosResort.post(`/getResortById/${resortId}`)