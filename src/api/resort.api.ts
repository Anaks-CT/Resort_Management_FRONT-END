import { axiosResort } from "../config/api";
import { setApiHeader } from "../helpers/apiHeader";
import { IAddResort } from "../interface/resort.interface";

export const getAllResortDetailsApi = () => axiosResort.get("/resort");

export const getResortByIdApi = (resortId: string) =>
  axiosResort.post(`/getResortById/${resortId}`);

export const createResortApi = (resortDetails: IAddResort, image: string, token: string) => 
  axiosResort.post("/resort", {...resortDetails, image}, setApiHeader(token));

export const editResortApi = (resortDetails: IAddResort, image: string | null, resortId: string | undefined, token: string) =>
  axiosResort.put(`/resort/${resortId}`, {resortDetails, image}, setApiHeader(token))

export const changeResortStatusApi = (resortId: string, token: string) =>
  axiosResort.delete(`/resort/${resortId}`, setApiHeader(token))

export const sortSearchResortDetailsApi = (searchValue: string | null, sortOrder: string | null) => 
  axiosResort.get(`/resortDetailService/?searchValue=${searchValue}&sortOrder=${sortOrder}`)


  