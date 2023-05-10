import { createSlice } from "@reduxjs/toolkit";

const managerToken = createSlice({
  name: "token",
  initialState: {token: ''},
  reducers: {
    addManagerToken(state, action) {
        state.token = action.payload
    },
    removeManagerToken(state){
        state.token = ''
    }
  },
});



export const { addManagerToken, removeManagerToken } = managerToken.actions;
export default managerToken;
