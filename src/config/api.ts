import axios from "axios";

const USER_BASE_URL = `https://trinity-api.anaksct.tech/api/user`;
const COMPANY_BASE_URL = `https://trinity-api.anaksct.tech/api/company`;
const RESORT_BASE_URL = `https://trinity-api.anaksct.tech/api/resort`;
const GALLARY_BASE_URL = `https://trinity-api.anaksct.tech/api/gallary`;
const ROOM_BASE_URL = `https://trinity-api.anaksct.tech/api/room`;
const MANAGER_BASE_URL = `https://trinity-api.anaksct.tech/api/manager`;
const CHECKAUTH = `https://trinity-api.anaksct.tech/api/checkCredential`;
const BOOKING_BASE_URL = `https://trinity-api.anaksct.tech/api/booking`;

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


export default axiosUser;
