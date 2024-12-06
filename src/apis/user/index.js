import { request } from "@/utils"

/**
 * 请求登录
 * @param {*} data 
 * @returns 
 */
export const requestLogin = (data) => {
    return request.post('/authorizations', data);
}