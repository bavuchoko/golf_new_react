import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
        },
        logout(state) {
            localStorage.removeItem("accessToken");
            state.isLoggedIn = false;

        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
