import currentResortSlice from "./slices/resortSlice";

const { configureStore } = require("@reduxjs/toolkit");


const store = configureStore({
    reducer : {
        currentUser : currentResortSlice.reducer
    }
})

export  {store}