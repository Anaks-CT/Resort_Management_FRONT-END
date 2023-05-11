import {axiosGallary} from "../config/api";
import { setApiHeader } from "../helpers/apiHeader";

export const getAllGallaryDetailsApi = () => 
   axiosGallary.get('/getAllGallaryDetails')

  

  
export const getGallaryDetailsbyResortIdApi = (resortId: string) => 
  axiosGallary.get(`/getGallaryByResortId/${resortId}`)

export const getGallaryByManagerIdApi = (managerToken: string) => 
  axiosGallary.get('/getGallaryDetailsByManager', setApiHeader(managerToken))

  
export const addLargeBannerApi = (resortId: string, image: string, description1: string, description2: string, token: string) => 
  axiosGallary.post(`/largeBanner/${resortId}`,{resortId, image, description1, description2, banner: "largeBanner"}, setApiHeader(token))

  
export const deleteLargeBannerApi = (resortId: string,largeBannerId: string, token: string) => 
  axiosGallary.delete(`/largeBanner/${resortId}/${largeBannerId}/${"largeBanner"}`, setApiHeader(token))

  
export const editLargeBannerDetailsApi = (resortId: string,largeBannerId: string, description1: string, description2: string, token: string) => 
  axiosGallary.patch(`/largeBanner/${resortId}/${largeBannerId}`,{description1, description2, banner: "largeBanner"}, setApiHeader(token))

  
export const editLargeBannerImageApi = (resortId: string, largeBannerId: string, image: string, token: string) =>
  axiosGallary.put(`/largeBanner/${resortId}/${largeBannerId}`, {image, banner: "largeBanner"}, setApiHeader(token))

export const addSmallBannerApi = (resortId: string, image: string, description1: string, description2: string, token: string) => 
  axiosGallary.post(`/smallBanner/${resortId}`,{resortId, image, description1, description2, banner: "smallBanner"}, setApiHeader(token))

  
export const deleteSmallBannerApi = (resortId: string,smallBannerId: string, token: string) => 
  axiosGallary.delete(`/smallBanner/${resortId}/${smallBannerId}/${"smallBanner"}`, setApiHeader(token))

  
export const editSmallBannerDetailsApi = (resortId: string,smallBannerId: string, description1: string, description2: string, token: string) => 
  axiosGallary.patch(`/smallBanner/${resortId}/${smallBannerId}`,{description1, description2, banner: "smallBanner"}, setApiHeader(token))

  
export const editSmallBannerImageApi = (resortId: string, smallBannerId: string, image: string, token: string) =>
  axiosGallary.put(`/smallBanner/${resortId}/${smallBannerId}`, {image, banner: "smallBanner"}, setApiHeader(token))

export const addCommunityBannerApi = (resortId: string, image: string, token: string) => 
  axiosGallary.post(`/communityBanner/?resortId=${resortId}`, {image}, setApiHeader(token))

  
export const editCommunityBannerApi = (resortId: string, image: string, prevImageUrl: string, token: string) => 
  axiosGallary.put(`/communityBanner/?resortId=${resortId}&prevImage=${encodeURIComponent(prevImageUrl)}`, {image}, setApiHeader(token))

  
export const deleteCommunityBannerApi = (resortId: string, image: string, token: string) =>
  axiosGallary.delete(`/communityBanner/?resortId=${resortId}&image=${encodeURIComponent(image)}`, setApiHeader(token),)
 

