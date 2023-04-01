import { axiosCompany } from "../config/api";
import { ILoginInterface } from "../interface/user.interface";


export const getCompanyDetailsApi = () =>
  axiosCompany.get("/companyDetails") 

export const adminLoginApi = ({email, password}: ILoginInterface) => 
  axiosCompany.post("/adminLogin",{email, password})