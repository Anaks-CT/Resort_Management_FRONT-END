import { createSlice } from "@reduxjs/toolkit";

const adminToken = createSlice({
  name: "adminToken",
  initialState: {token: ''},
  reducers: {
    addAdminToken(state, action) {
        console.log(typeof action.payload);
        state.token = action.payload
    },
    removeToken(state){
      console.log('token removed')
        // state.token = ''
    }
  },
});



export const { addAdminToken, removeToken } = adminToken.actions;
export default adminToken;
