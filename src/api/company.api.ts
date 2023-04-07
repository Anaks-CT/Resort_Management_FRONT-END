import { axiosCompany } from "../config/api";
import { ILoginInterface } from "../interface/user.interface";


export const getCompanyDetailsApi = () =>
  axiosCompany.get("/companyDetails") 

export const adminLoginApi = ({email, password}: ILoginInterface) => 
  axiosCompany.post("/adminLogin",{email, password})

export const getFaqApi = () => 
  axiosCompany.get('/faq')

export const addFaqApi = (question: string, answer: string) =>
  axiosCompany.post('/faq',{question, answer})

export const deleteFaqApi = (id: string) =>
  axiosCompany.delete(`/faq/${id}`)

export const editApi = (id: string, question: string, answer: string) => 
  axiosCompany.put(`/faq/${id}`,{question, answer})