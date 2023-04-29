import axios from "axios";

const USER_BASE_URL = `http://localhost:${process.env.REACT_APP_BACKENDPORT}/user`;
const COMPANY_BASE_URL = `http://localhost:${process.env.REACT_APP_BACKENDPORT}/company`;
const RESORT_BASE_URL = `http://localhost:${process.env.REACT_APP_BACKENDPORT}/resort`;
const GALLARY_BASE_URL = `http://localhost:${process.env.REACT_APP_BACKENDPORT}/gallary`;
const ROOM_BASE_URL = `http://localhost:${process.env.REACT_APP_BACKENDPORT}/room`;
const MANAGER_BASE_URL = `http://localhost:${process.env.REACT_APP_BACKENDPORT}/manager`;
const CHECKAUTH = `http://localhost:${process.env.REACT_APP_BACKENDPORT}/checkCredential`;
const BOOKING_BASE_URL = `http://localhost:${process.env.REACT_APP_BACKENDPORT}/booking`;

export const axiosUser = axios.create({
  baseURL: USER_BASE_URL,
});

export const axiosCompany = axios.create({
  baseURL: COMPANY_BASE_URL,
});

export const axiosResort = axios.create({
  baseURL: RESORT_BASE_URL,
});

export const axiosGallary = axios.create({
  baseURL: GALLARY_BASE_URL,
});

export const axiosRoom = axios.create({
  baseURL: ROOM_BASE_URL,
});

export const axiosManager = axios.create({
  baseURL: MANAGER_BASE_URL
})

export const axiosAuth = axios.create({
  baseURL: CHECKAUTH
})

export const axiosBooking = axios.create({
  baseURL: BOOKING_BASE_URL
})

// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

export default axiosUser;
