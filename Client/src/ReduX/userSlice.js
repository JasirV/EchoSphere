import { createSlice } from "@reduxjs/toolkit";
import { user } from "../components/data";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(window?.localStorage.getItem('user_id')) ?? user,
        edit: false
    },
    reducers: {
        login(state, action) {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout(state) {
            state.user = null;
            localStorage?.removeItem('user');
        },
        updateProfile(state, action) {
            state.edit = action.payload;
        }
    }
});

export default userSlice.reducer;

export function UserLogin(user) {
    return (dispatch, getState) => {
        dispatch(userSlice.actions.login(user));
    };
}

export function Logout() {
    return (dispatch, getState) => {
        dispatch(userSlice.actions.logout());
    };
}

export function updateProfile(value) {
    return (dispatch, getState) => {
        dispatch(userSlice.actions.updateProfile(value));
    };
}