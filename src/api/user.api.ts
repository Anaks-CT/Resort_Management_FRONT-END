import axios from "../config/api";
import { Iuser, ILoginInterface } from "../interface/user.interface";



export const signupApi = ({ name, phone, email, password, cPassword }: Iuser) =>
  axios.post("/signup", { name, phone, email, password, cPassword }); 

  export const loginApi = ({ email, password }:ILoginInterface) =>
  axios.post("/login", { email, password }); 