import {axiosGallary} from "../config/api";

export const getAllGallaryDetailsApi = () => 
  axiosGallary.get('/getAllGallaryDetails')

export const getGallaryDetailsbyResortIdApi = (resortId: string) => 
  axiosGallary.get(`/getGallaryByResortId/${resortId}`)