import {axiosGallary} from "../config/api";

export const getAllGallaryDetailsApi = () => {
  console.log('sfd');
  
  return axiosGallary.get('/getAllGallaryDetails')
  // return fetch('/getAllGallaryDetails')
}
  

  
export const getGallaryDetailsbyResortIdApi = (resortId: string) => 
  axiosGallary.get(`/getGallaryByResortId/${resortId}`)

  
export const addLargeBannerApi = (resortId: string, image: string, description1: string, description2: string) => 
  axiosGallary.post(`/largeBanner/${resortId}`,{resortId, image, description1, description2, banner: "largeBanner"})

  
export const deleteLargeBannerApi = (resortId: string,largeBannerId: string) => 
  axiosGallary.delete(`/largeBanner/${resortId}/${largeBannerId}/${"largeBanner"}`)

  
export const editLargeBannerDetailsApi = (resortId: string,largeBannerId: string, description1: string, description2: string) => 
  axiosGallary.patch(`/largeBanner/${resortId}/${largeBannerId}`,{description1, description2, banner: "largeBanner"})

  
export const editLargeBannerImageApi = (resortId: string, largeBannerId: string, image: string) =>
  axiosGallary.put(`/largeBanner/${resortId}/${largeBannerId}`, {image, banner: "largeBanner"})

export const addSmallBannerApi = (resortId: string, image: string, description1: string, description2: string) => 
  axiosGallary.post(`/smallBanner/${resortId}`,{resortId, image, description1, description2, banner: "smallBanner"})

  
export const deleteSmallBannerApi = (resortId: string,smallBannerId: string) => 
  axiosGallary.delete(`/smallBanner/${resortId}/${smallBannerId}/${"smallBanner"}`)

  
export const editSmallBannerDetailsApi = (resortId: string,smallBannerId: string, description1: string, description2: string) => 
  axiosGallary.patch(`/smallBanner/${resortId}/${smallBannerId}`,{description1, description2, banner: "smallBanner"})

  
export const editSmallBannerImageApi = (resortId: string, smallBannerId: string, image: string) =>
  axiosGallary.put(`/smallBanner/${resortId}/${smallBannerId}`, {image, banner: "smallBanner"})

export const addCommunityBannerApi = (resortId: string, image: string) => 
  axiosGallary.post(`/communityBanner/?resortId=${resortId}`, {image})

  
export const editCommunityBannerApi = (resortId: string, image: string, prevImageUrl: string) => 
  axiosGallary.put(`/communityBanner/?resortId=${resortId}&prevImage=${encodeURIComponent(prevImageUrl)}`, {image})

  
export const deleteCommunityBannerApi = (resortId: string, image: string) =>
  axiosGallary.delete(`/communityBanner/?resortId=${resortId}&image=${encodeURIComponent(image)}`)
 

