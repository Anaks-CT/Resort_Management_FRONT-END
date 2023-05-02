import axios from "../config/api";
import { Iuser, ILoginInterface } from "../interface/user.interface";



export const signupApi = ({ name, phone, email, password, cPassword }: Iuser) =>
  axios.post("/signup", { name, phone, email, password, cPassword }); 

export const loginApi = ({ email, password }:ILoginInterface) =>
  axios.post("/login", { email, password }); 

export const verifyPhoneApi = (phoneNumber: string, email: string) => 
  axios.get(`/verifyPhone?phone=${phoneNumber}&email=${email}`)

export const verifyOTPapi = (otp: string, phoneNumber: string) => 
  axios.post(`/verifyPhone?otp=${otp}&phone=${phoneNumber}`)

export const forgotPasswordVerifyEmailApi = (email: string) => 
  axios.get(`/forgotPassword?email=${email}`)

export const forgotPasswordVerifyOtpApi = (otp: string, phoneNumber: string) =>
  axios.post(`/forgotPassword?otp=${otp}&phone=${phoneNumber}`)

export const setNewPasswordApi = (email: string, passwordDetails: {password: string, cPassword: string}) => 
  axios.put(`/forgotPassword?email=${email}`,passwordDetails)