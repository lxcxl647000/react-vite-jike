// 用户相关的状态管理//
import { requestLogin, requestUserInfo } from "@/apis/user";
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

let store = createSlice({
    name: 'user',
    initialState: {
        token: GET_TOKEN() || '',
        userInfo: {}
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            // 本地持久化token//
            SET_TOKEN(action.payload);
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        clearUserInfo(state, action) {
            state.token = '';
            state.userInfo = {};
            REMOVE_TOKEN();
        }
    }
});

const { setToken, setUserInfo, clearUserInfo } = store.actions;
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

// 获取用户个人信息//
const getUserInfo = () => {
    return async (dispatch) => {
        const res = await requestUserInfo();
        dispatch(setUserInfo(res.data));
    }
};

export { setToken, login, getUserInfo, clearUserInfo };
export default userReducer;