import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 0,
    userName: 'default',
    firstName: "",
    phone: "",
    isLogined: false,
    lastOrder: {},
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLastOrder: (state, action) => {
            state.lastOrder = action.payload;
            localStorage.setItem("lastOrder", JSON.stringify(state.lastOrder));
        },
        setUsername: (state, action) => {
            state.userName = action.payload;
            localStorage.setItem("userName", JSON.stringify(state.userName));
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
            localStorage.setItem("userName", JSON.stringify('default'));
          localStorage.setItem("firstName", JSON.stringify(''));
          localStorage.setItem("phone", JSON.stringify(''));
          localStorage.setItem("isLogined", JSON.stringify(false));
          localStorage.setItem("lastOrder", JSON.stringify({}));
            return initialState;
            
        },
    },
});

export const { setFirstName, setUsername, setPhone, setLogined, clearUser } = userSlice.actions;

export default userSlice.reducer;
