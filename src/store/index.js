import allResortSlice from "./slices/allResortSlice";
import gallarySlice from "./slices/gallarySlice";
import resortSlice from "./slices/resortSlice";

const { configureStore } = require("@reduxjs/toolkit");


const store = configureStore({
    reducer : {
        resort : resortSlice.reducer,
        gallary: gallarySlice.reducer,
        allResort: allResortSlice.reducer
    }
})

export  {store}