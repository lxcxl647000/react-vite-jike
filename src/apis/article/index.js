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
    return request.post('/mp/articles', data);
};

/**
 * 
 * @returns 获取文章列表
 */
export const getArticles = (data) => {
    let { status, channel_id, begin_pubdate, end_pubdate, per_page, page } = data;
    let url = `/mp/articles?status=${status || ''}&channel_id=${channel_id || ''}&begin_pubdate=${begin_pubdate || ''}&end_pubdate=${end_pubdate || ''}&per_page=${per_page}&page=${page}`;
    return request.get(url);
};

/**
 * 删除文章
 * @param {*} id 
 */
export const deleteArticle = (id) => {
    return request.delete(`/mp/articles/${id}`);
}

/**
 * 获取文章
 * @param {*} id 
 * @returns 
 */
export const getArticle = (id) => {
    return request.get(`/mp/articles/${id}`);
};

/**
 * 修改文章
 * @param {*} id 
 * @param {*} data 
 * @returns 
 */
export const editArticle = (id, data) => {
    return request.put(`/mp/articles/${id}?draft=false`, data);
};