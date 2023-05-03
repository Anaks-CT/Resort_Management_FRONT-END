import { createSlice } from "@reduxjs/toolkit";

const adminToken = createSlice({
  name: "token",
  initialState: {token: ''},
  reducers: {
    addAdminToken(state, action) {
        state.token = action.payload
    },
    removeAdminToken(state){
        state.token = ''
    }
  },
});



export const { addAdminToken, removeAdminToken } = adminToken.actions;
export default adminToken;
