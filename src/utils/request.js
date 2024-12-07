import axios from "axios";
import { GET_TOKEN, REMOVE_TOKEN } from "./token";
import router from "@/router";

let request = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
    timeout: 5000
});

// 添加请求拦截器
request.interceptors.request.use((config) => {
    // 注入token//
    let token = GET_TOKEN();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
}, (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response.status === 401) {// token失效//
        REMOVE_TOKEN();
        router.navigate('/login');
    }
    return Promise.reject(error)
})


export default request;