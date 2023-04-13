import axios, { axiosManager } from "../config/api";
import { IManager } from "../interface/manager.interface";
import { Iuser, ILoginInterface } from "../interface/user.interface";



export const signupApi = ({ name, phone, email, password, cPassword, resortId }: IManager) =>
  axiosManager.post("/signup", { name, phone, email, password, cPassword, resortId }); 

export const loginApi = ({ email, password }:ILoginInterface) =>
    axiosManager.post("/login", { email, password }); 

// export const getAllManagerDetails = () => 
//     axiosManager.get(`/`)
  
export const getAllManagerDetails = (searchInput: string, sortOrder: string | null, sortBy: string | null) =>
  axiosManager.get(`/?searchInput=${searchInput}&sortOrder=${sortOrder}&sortBy=${sortBy}`)