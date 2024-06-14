import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: false
}

const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers: {
        load: (state) => {
            state.isLoading = true;
        },
        finish: (state, action) => {
            console.log("finish")
        state.isLoading = false;
        },
        onError: (state, action) => {
            state.error = true;
        },
        onSuccess: (state, action) => {
            state.error = false;
        },
    }
});

export const { load, finish, onError, onSuccess } = apiSlice.actions;
export default apiSlice.reducer;