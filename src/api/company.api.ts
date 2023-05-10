import { axiosCompany } from "../config/api";
import { setApiHeader } from "../helpers/apiHeader";
import { ILoginInterface } from "../interface/user.interface";


export const getCompanyDetailsApi = () =>
  axiosCompany.get("/companyDetails") 

export const adminLoginApi = ({email, password}: ILoginInterface) => 
  axiosCompany.post("/adminLogin",{email, password})

export const getFaqApi = () => 
  axiosCompany.get('/faq')

export const addFaqApi = (question: string, answer: string, token: string) =>
  axiosCompany.post('/faq',{question, answer},setApiHeader(token))

export const deleteFaqApi = (id: string, token: string) =>
  axiosCompany.delete(`/faq/${id}`, setApiHeader(token))

export const editApi = (id: string, question: string, answer: string, token: string) => 
  axiosCompany.put(`/faq/${id}`,{question, answer}, setApiHeader(token))

export const getAdminDashboardDetailsApi = (adminToken: string) => 
  axiosCompany.get('/adminDashboardDetails', setApiHeader(adminToken))

export const getResortDashoboardDetailsApi = (adminToken: string, resortId: string) => 
  axiosCompany.get(`resortDashboard/${resortId}`, setApiHeader(adminToken))