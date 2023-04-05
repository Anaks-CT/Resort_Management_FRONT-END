import { axiosResort } from "../config/api";
import { IAddResort } from "../interface/resort.interface";

export const getAllResortDetailsApi = () => axiosResort.get("/resort");

export const getResortByIdApi = (resortId: string) =>
  axiosResort.post(`/getResortById/${resortId}`);

export const createResortApi = (resortDetails: IAddResort, image: string) => {
  
  const {
    name,
    heading,
    description,
    features,
    location,
    email,
    customerCareNo,
  } = resortDetails;
  

  return axiosResort.post("/resort", {
    image,
    name,
    heading,
    description,
    features,
    location,
    email,
    customerCareNo,
  });
};
