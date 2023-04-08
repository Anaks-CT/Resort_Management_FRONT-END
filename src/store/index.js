import allResortSlice from "./slices/allResortSlice";
import gallarySlice from "./slices/gallarySlice";
import resortSlice from "./slices/resortSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const { configureStore } = require("@reduxjs/toolkit");

const persistConfig = {
    key: 'root',
    storage,
  }


  const persistedReducer = persistReducer(persistConfig, resortSlice.reducer)

export const store = configureStore({
    reducer : {
        resort : persistedReducer,
        gallary: gallarySlice.reducer,
        allResort: allResortSlice.reducer
    }
})

export const persistor = persistStore(store)