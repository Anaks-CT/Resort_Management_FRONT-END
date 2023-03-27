import {axiosGallary} from "../config/api";

export const getAllGallaryDetailsApi = () => 
  axiosGallary.get('/getAllGallaryDetails')

export const getGallaryDetailsbyResortIdApi = (resortId: string) => 
  axiosGallary.get(`/getGallaryByResortId/${resortId}`)

export const addLargeBannerApi = (resortId: string, image: string, description1: string, description2: string) => 
  axiosGallary.post(`/largeBanner/${resortId}`,{resortId, image, description1, description2})

export const deleteLargeBannerApi = (resortId: string,largeBannerId: string) => 
  axiosGallary.delete(`/largeBanner/${resortId}/${largeBannerId}`)

export const editLargeBannerDetailsApi = (resortId: string,largeBannerId: string, description1: string, description2: string) => 
  axiosGallary.patch(`/largeBanner/${resortId}/${largeBannerId}`,{description1, description2})
