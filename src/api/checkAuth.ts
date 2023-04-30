import { axiosAuth } from "../config/api";
import { setApiHeader } from "../helpers/apiHeader";



export const checkAdminCredentialApi = (token: string) =>
    axiosAuth.get("/admin", setApiHeader(token)) 

export const checkUserCredentialApi = (token: string) =>
    axiosAuth.get("/user", setApiHeader(token)) 
