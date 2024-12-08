import { request } from "@/utils";

/**
 * 
 * @returns 获取频道列表
 */
export const getChannels = () => {
    return request.get('/channels');
};

/**
 * 发布文章
 * @param {*} data 
 */
export const publishArticle = (data) => {
    request.post('/mp/articles', data);
};