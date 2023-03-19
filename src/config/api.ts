import axios from "axios";

const USER_BASE_URL = `http://localhost:${process.env.REACT_APP_BACKENDPORT}/user`;
const COMPANY_BASE_URL = `http://localhost:${process.env.REACT_APP_BACKENDPORT}/company`;
const RESORT_BASE_URL = `http://localhost:${process.env.REACT_APP_BACKENDPORT}/resort`;

const axiosUser = axios.create({
  baseURL: USER_BASE_URL,
});

export const axiosCompany = axios.create({
  baseURL: COMPANY_BASE_URL,
});

export const axiosResort = axios.create({
  baseURL: RESORT_BASE_URL,
});


// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

export default axiosUser;
