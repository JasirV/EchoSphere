import { createSlice } from "@reduxjs/toolkit";

const themeslice = createSlice({
    name: "theme",
    initialState: {
        theme: JSON.parse(window?.localStorage.getItem('theme')) ?? ""
    },
    reducers: {
        setTheme(state, action) {
            state.theme = action.payload;
            localStorage.setItem('theme', JSON.stringify(action.payload));
        }
    }
});

export default themeslice.reducer;

export function setTheme(value) {
    return (dispatch) => {
        dispatch(themeslice.actions.setTheme(value));
    };
}
