import { axiosResort } from "../config/api";


export const getAllResortDetailsApi = () =>
  axiosResort.get("/getAllResortDetails") 

