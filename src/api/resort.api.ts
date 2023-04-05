import { axiosResort } from "../config/api";
import { IAddResort } from "../interface/resort.interface";

export const getAllResortDetailsApi = () => axiosResort.get("/resort");

export const getResortByIdApi = (resortId: string) =>
  axiosResort.post(`/getResortById/${resortId}`);

export const createResortApi = (resortDetails: IAddResort, image: string) => 
  axiosResort.post("/resort", {...resortDetails, image});

export const editResortApi = (resortDetails: IAddResort, image: string | null, resortId: string | undefined) =>
  axiosResort.put(`/resort/${resortId}`, {resortDetails, image},)

export const changeResortStatusApi = (resortId: string) =>
  axiosResort.delete(`/resort/${resortId}`)