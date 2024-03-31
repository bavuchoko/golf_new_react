import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    accessToken:null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.accessToken = action.payload;
        },
        logout(state) {
            localStorage.removeItem("accessToken");
            state.isLoggedIn = false;

        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
