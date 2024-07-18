import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    MemoOnGame: false,
}

const openSlice = createSlice({
    name: "opener",
    initialState,
    reducers: {
        opener(state, action) {
            const { key } = action.payload;
            if (state.hasOwnProperty(key)) {
                state[key] = true;
            }
        },
        closer(state, action) {
            const { key } = action.payload;
            if (state.hasOwnProperty(key)) {
                state[key] = false;
            }
        },
        toggleModal(state, action) {
            const { key } = action.payload;
            if (state.hasOwnProperty(key)) {
                state[key] = !state[key];
            }
        },
    }
});

export const { opener, closer, toggleModal} = openSlice.actions;
export default openSlice.reducer;