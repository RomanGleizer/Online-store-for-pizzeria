import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 0,
    firstName: "",
    phone: "",
    isLogined: false,
    lastOrder: {},
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.firstName = action.payload;
            localStorage.setItem("firstname", JSON.stringify(state.username));
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
          localStorage.setItem("firstname", JSON.stringify(''));
          localStorage.setItem("phone", JSON.stringify(''));
          localStorage.setItem("isLogined", JSON.stringify(false));
            return initialState;
            
        },
    },
});

export const { setUsername, setPhone, setLogined, clearUser } = userSlice.actions;

export default userSlice.reducer;
