import { createSlice } from "@reduxjs/toolkit";

const userToken = createSlice({
  name: "token",
  initialState: {token: ''},
  reducers: {
    addUserToken(state, action) {
        console.log(typeof action.payload);
        state.token = action.payload
    },
    removeUserToken(state){
      
        // state.token = ''
    }
  },
});



export const { addUserToken, removeUserToken } = userToken.actions;
export default userToken;
