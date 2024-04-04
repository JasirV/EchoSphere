import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: {},
    },
    reducers: {
        getPost(state, action) {
            state.posts = action.payload;
        }
    }
});

export default postSlice.reducer;

export function setPosts(post) {
    return (dispatch, getState) => {
        dispatch(postSlice.actions.getPost(post));
    };
}