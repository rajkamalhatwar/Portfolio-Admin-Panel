import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userId : null,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userId = action.payload.userId;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userId = null;
            state.userData = null;
        }
     }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;