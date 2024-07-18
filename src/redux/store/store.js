import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../slice/authSlice";
import userReducer from "../slice/userSlice";
import apiReducer from "../slice/apiSlice";
import memoReducer from "../slice/memoSlice";
import openReducer from "../slice/openerSlice";

export const store = configureStore({
    reducer: {
        opener: openReducer,
        memo: memoReducer,
        auth: authReducer,
        user: userReducer,
        api: apiReducer
    },
});



export default store;