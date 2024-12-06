// 用户相关的状态管理//
import { requestLogin } from "@/apis/user";
import { GET_TOKEN, SET_TOKEN } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

let store = createSlice({
    name: 'user',
    initialState: {
        token: GET_TOKEN() || ''
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            // 本地持久化token//
            SET_TOKEN(action.payload);
        }
    }
});

const { setToken } = store.actions;
const userReducer = store.reducer;

// 登录并获取token//
const login = (data) => {
    return async (dispatch) => {
        // 发送异步请求//
        const res = await requestLogin(data);
        // 设置token//
        dispatch(setToken(res.data.token));
    };
};

export { setToken, login };
export default userReducer;