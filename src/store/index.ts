import allResortSlice from "./slices/allResortSlice";
import gallarySlice from "./slices/gallarySlice";
import resortSlice from "./slices/resortSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import adminToken from "./slices/adminToken.slice";


const { configureStore } = require("@reduxjs/toolkit");

const persistConfig = {
    key: 'root',
    storage,
  }


  const persistedResort = persistReducer(persistConfig, resortSlice.reducer)
  const persistedAdminAuth = persistReducer(persistConfig, adminToken.reducer)

export const store = configureStore({
    reducer : {
        resort : persistedResort,
        gallary: gallarySlice.reducer,
        allResort: allResortSlice.reducer,
        adminAuth: persistedAdminAuth
    }
})

export const persistor = persistStore(store)