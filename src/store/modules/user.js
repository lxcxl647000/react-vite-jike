// 用户相关的状态管理//
import { requestLogin } from "@/apis/user";
import { createSlice } from "@reduxjs/toolkit";

let store = createSlice({
    name: 'user',
    initialState: {
        token: ''
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
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