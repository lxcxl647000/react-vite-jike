// 组合redux子模块 导出store//
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";

let store = configureStore({
    reducer: {
        user: userReducer
    }
});

export default store;