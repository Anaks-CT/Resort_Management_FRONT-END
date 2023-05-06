import axios from "../config/api";
import { setApiHeader } from "../helpers/apiHeader";
import { IBookingForm1 } from "../interface/booking.interface";
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

export const addToWishlistApi = (token: string, wishlistDetails: IBookingForm1) => 
  axios.post(`/wishlist`,{wishlistDetails: wishlistDetails}, setApiHeader(token))

export const getWishlistOfUserApi = (token: string) => 
  axios.get(`/wishlist`, setApiHeader(token))

export const deleteWishlistApi = (token: string, wishlistId: string) => 
  axios.delete(`/wishlist/${wishlistId}`, setApiHeader(token))

export const getUserDetailsApi = (token: string) =>
  axios.get('/',setApiHeader(token))

export const updateUserDetailsApi = (token: string,  name: string, image?: string,) => 
  axios.patch('/',{updateDetails: {image, name}},setApiHeader(token))