import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 0,
    username: 'default',
    firstName: "",
    phone: "",
    isLogined: false,
    lastOrder: {},
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserame: (state, action) => {
            state.username = action.payload;
            localStorage.setItem("username", JSON.stringify(state.username));
        },
        setFirstName: (state, action) => {
            state.firstName = action.payload;
            localStorage.setItem("firstName", JSON.stringify(state.firstName));
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
            localStorage.setItem("phone", JSON.stringify(state.phone));
        },
        setLogined: (state, action) => {
          state.isLogined = action.payload;
          localStorage.setItem("isLogined", JSON.stringify(state.isLogined));
        },
        clearUser: (state) => {
            localStorage.setItem("username", JSON.stringify('default'));
          localStorage.setItem("firstName", JSON.stringify(''));
          localStorage.setItem("phone", JSON.stringify(''));
          localStorage.setItem("isLogined", JSON.stringify(false));
            return initialState;
            
        },
    },
});

export const { setFirstName, setUsername, setPhone, setLogined, clearUser } = userSlice.actions;

export default userSlice.reducer;
