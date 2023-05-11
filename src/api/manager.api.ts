import { axiosManager } from "../config/api";
import { setApiHeader } from "../helpers/apiHeader";
import { IManager } from "../interface/manager.interface";
import { ILoginInterface } from "../interface/user.interface";



export const addManager = ({ name, phone, email, password, cPassword, resortId }: IManager, token: string) =>
  axiosManager.post("/signup", { name, phone, email, password, cPassword, resortId }, setApiHeader(token)); 

export const managerLoginApi = ({ email, password }:ILoginInterface) =>
    axiosManager.post("/login", { email, password }); 
  
export const getAllManagerDetailsApi = (searchInput: string, sortOrder: string | null, sortBy: string | null, adminToken: string) =>
  axiosManager.get(`/?searchInput=${searchInput}&sortOrder=${sortOrder}&sortBy=${sortBy}`, setApiHeader(adminToken))

export const ChangeManagerStatusApi = (managerId: string, token: string) => 
  axiosManager.delete(`/${managerId}`, setApiHeader(token))

export const getMangersByResortApi = (resortId: string) =>
  axiosManager.get(`/resortMangers:${resortId}`); 

export const getManagerdashboardDetailsAPi = (managerToken: string) => 
  axiosManager.get('/dashboardDetails', setApiHeader(managerToken))