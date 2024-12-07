import { request } from "@/utils"

/**
 * 请求登录
 * @param {*} data 
 * @returns 
 */
export const requestLogin = (data) => {
    return request.post('/authorizations', data);
}

/**
 * 获取用户个人信息
 * @returns 
 */
export const requestUserInfo = () => {
    return request.get('/user/profile');
};