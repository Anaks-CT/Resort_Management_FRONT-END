import axios from "../../config/api";
import { Iuser, LoginInterface } from "../../interface/user.interface";



export const signupApi = ({ name, phone, email, password, cPassword }: Iuser) =>
  axios.post("/signup", { name, phone, email, password }); 

  export const loginApi = ({ email, password }:LoginInterface) =>
  axios.post("/login", { email, password }); 