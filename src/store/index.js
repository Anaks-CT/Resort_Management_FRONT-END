import gallarySlice from "./slices/gallarySlice";
import currentResortSlice from "./slices/resortSlice";

const { configureStore } = require("@reduxjs/toolkit");


const store = configureStore({
    reducer : {
        resort : currentResortSlice.reducer,
        gallary: gallarySlice.reducer
    }
})

export  {store}