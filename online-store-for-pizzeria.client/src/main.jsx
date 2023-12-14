import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { getTotals } from "./slices/cartSlice";
import userReducer from './slices/userSlice.js'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

store.dispatch(getTotals());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
