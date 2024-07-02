import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../slice/authSlice";
import userReducer from "../slice/userSlice";
import apiReducer from "../slice/apiSlice";
import memoReducer from "../slice/memoSlice";

export const store = configureStore({
    reducer: {
        memo: memoReducer,
        auth: authReducer,
        user: userReducer,
        api: apiReducer
    },
});



export default store;