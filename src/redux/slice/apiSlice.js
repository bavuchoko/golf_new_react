import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false
}

const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers: {
        load: (state) => {
            state.isLoading = true;
        },
        finish: (state, action) => {
        state.isLoading = false;
        },
    }
});

export const { load, finish } = apiSlice.actions;
export default apiSlice.reducer;