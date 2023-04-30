import { createSlice } from "@reduxjs/toolkit";

const adminToken = createSlice({
  name: "token",
  initialState: {token: ''},
  reducers: {
    addAdminToken(state, action) {
        console.log(typeof action.payload);
        state.token = action.payload
    },
    removeAdminToken(state){
      console.log('token removed')
        // state.token = ''
    }
  },
});



export const { addAdminToken, removeAdminToken } = adminToken.actions;
export default adminToken;
