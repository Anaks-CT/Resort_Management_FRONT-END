import { axiosCompany } from "../config/api";


export const getCompanyDetailsApi = () =>
  axiosCompany.get("/companyDetails") 

