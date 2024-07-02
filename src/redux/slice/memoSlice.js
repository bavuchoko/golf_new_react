import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    data:[]
}

const memoSlice = createSlice({
    name: "api",
    initialState,
    reducers: {
        set: (state, action) => {
            state.data = action.payload;
        },
        flush: (state) => {
            state.data = [];
        },
    }
});

export const { set, flush} = memoSlice.actions;
export default memoSlice.reducer;