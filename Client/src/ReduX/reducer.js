import { combineReducers } from "@reduxjs/toolkit";
import userSlice from './userSlice';
import themeslice from './theme';
import postSlice from './postSlice';

const rootReducer = combineReducers({
    user: userSlice,
    theme: themeslice,
    post: postSlice
});

export default rootReducer;