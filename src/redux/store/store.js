import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../slice/authSlice";
import userReducer from "../slice/userSlice";
import apiReducer from "../slice/apiSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        api: apiReducer
    },
});



export default store;