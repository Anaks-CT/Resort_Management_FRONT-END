import { axiosManager } from "../config/api";
import { setApiHeader } from "../helpers/apiHeader";
import { IManager } from "../interface/manager.interface";
import { ILoginInterface } from "../interface/user.interface";



export const addManager = ({ name, phone, email, password, cPassword, resortId }: IManager, token: string) =>
  axiosManager.post("/signup", { name, phone, email, password, cPassword, resortId }, setApiHeader(token)); 

export const managerLoginApi = ({ email, password }:ILoginInterface) =>
    axiosManager.post("/login", { email, password }); 
  
export const getAllManagerDetails = (searchInput: string, sortOrder: string | null, sortBy: string | null) =>
  axiosManager.get(`/?searchInput=${searchInput}&sortOrder=${sortOrder}&sortBy=${sortBy}`)

export const ChangeManagerStatusApi = (managerId: string, token: string) => 
  axiosManager.delete(`/${managerId}`, setApiHeader(token))

export const getMangersByResortApi = (resortId: string) =>
  axiosManager.get(`/resortMangers:${resortId}`); 