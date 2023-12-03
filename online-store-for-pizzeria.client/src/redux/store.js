import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import addItem from "./reducers/addItem.js";



const reducer = combineReducers({
  addItem
})
const store = configureStore({
  reducer,
})
export default store;