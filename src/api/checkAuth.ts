import { axiosAuth } from "../config/api";
import { setApiHeader } from "../helpers/apiHeader";



export const checkCredentialApi = (token: string) =>

axiosAuth.get("/checkCredential", setApiHeader(token)) 