import { request } from "@/utils";

/**
 * 
 * @returns 获取频道列表
 */
export const getChannels = () => {
    return request.get('/channels');
};