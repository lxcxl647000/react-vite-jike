// 本地持久化token//
const TOKEN = 'TOKEN';

export const SET_TOKEN = (token) => {
    localStorage.setItem(TOKEN, token);
};

export const GET_TOKEN = () => {
    return localStorage.getItem(TOKEN);
};

export const REMOVE_TOKEN = () => {
    localStorage.removeItem(TOKEN);
};