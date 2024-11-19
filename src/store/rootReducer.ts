import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./authSlice/slice";
import { postsReducer } from "./postsSlice/slice";

const rootReducer = combineReducers({ user: userReducer, posts: postsReducer });

export default rootReducer;
