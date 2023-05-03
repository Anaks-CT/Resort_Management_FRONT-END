import allResortSlice from "./slices/allResortSlice";
import gallarySlice from "./slices/gallarySlice";
import resortSlice from "./slices/resortSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import adminToken from "./slices/adminTokenSlice";
import userToken from "./slices/userTokenSlice";
import currentResortUser from "./slices/currentResortUserSlice";

const persistConfig={
    key:'root',
    version:1,
    storage
}

const reducer= combineReducers({
    gallary: gallarySlice.reducer,
    allResort: allResortSlice.reducer,
    resort:resortSlice.reducer,
    adminAuth:adminToken.reducer,
    userAuth: userToken.reducer,
    currentResort: currentResortUser.reducer
})


//   const persistedResort = persistReducer(persistConfig, resortSlice.reducer)
//   const persistedAdminAuth = persistReducer(persistConfig, adminToken.reducer)
  const persistedReducer= persistReducer(persistConfig,reducer)

export const store = configureStore({
    reducer : persistedReducer
})

export const persistor = persistStore(store)